provider "aws" {
  region = var.region
}

resource "aws_ecs_cluster" "matching_engine_cluster" {
  name = "matching-engine-cluster"
}

resource "aws_ecs_task_definition" "matching_engine_task" {
  family                   = "matching-engine-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "matching-engine-container"
      image     = var.matching_engine_image
      essential = true
      portMappings = [
        {
          containerPort = 8001
          hostPort      = 8001
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "matching_engine_service" {
  name            = "matching-engine-service"
  cluster         = aws_ecs_cluster.matching_engine_cluster.id
  task_definition = aws_ecs_task_definition.matching_engine_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnets
    security_groups = [aws_security_group.matching_engine_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.matching_engine_tg.arn
    container_name   = "matching-engine-container"
    container_port   = 8001
  }
}

resource "aws_lb" "matching_engine_lb" {
  name               = "matching-engine-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.matching_engine_sg.id]
  subnets            = var.subnets
}

resource "aws_lb_target_group" "matching_engine_tg" {
  name     = "matching-engine-tg"
  port     = 8001
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_listener" "matching_engine_listener" {
  load_balancer_arn = aws_lb.matching_engine_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.matching_engine_tg.arn
  }
}

resource "aws_security_group" "matching_engine_sg" {
  name        = "matching-engine-sg"
  description = "Security group for matching engine service"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 8001
    to_port     = 8001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "matching_engine_db" {
  identifier        = "matching-engine-db"
  engine            = "mysql"
  instance_class    = "db.t2.micro"
  allocated_storage = 20
  name              = var.db_name
  username          = var.db_username
  password          = var.db_password
  parameter_group_name = "default.mysql5.7"
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.matching_engine_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.matching_engine_db_subnet_group.name
}

resource "aws_db_subnet_group" "matching_engine_db_subnet_group" {
  name       = "matching-engine-db-subnet-group"
  subnet_ids = var.subnets
  description = "Subnet group for matching engine RDS instance"
}
