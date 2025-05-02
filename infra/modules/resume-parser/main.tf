provider "aws" {
  region = var.region
}

resource "aws_ecs_cluster" "resume_parser_cluster" {
  name = "resume-parser-cluster"
}

resource "aws_ecs_task_definition" "resume_parser_task" {
  family                   = "resume-parser-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "resume-parser-container"
      image     = var.resume_parser_image
      essential = true
      portMappings = [
        {
          containerPort = 8000
          hostPort      = 8000
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "resume_parser_service" {
  name            = "resume-parser-service"
  cluster         = aws_ecs_cluster.resume_parser_cluster.id
  task_definition = aws_ecs_task_definition.resume_parser_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnets
    security_groups = [aws_security_group.resume_parser_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.resume_parser_tg.arn
    container_name   = "resume-parser-container"
    container_port   = 8000
  }
}

resource "aws_lb" "resume_parser_lb" {
  name               = "resume-parser-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.resume_parser_sg.id]
  subnets            = var.subnets
}

resource "aws_lb_target_group" "resume_parser_tg" {
  name     = "resume-parser-tg"
  port     = 8000
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_listener" "resume_parser_listener" {
  load_balancer_arn = aws_lb.resume_parser_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.resume_parser_tg.arn
  }
}

resource "aws_security_group" "resume_parser_sg" {
  name        = "resume-parser-sg"
  description = "Security group for resume parser service"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 8000
    to_port     = 8000
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

resource "aws_db_instance" "resume_parser_db" {
  identifier        = "resume-parser-db"
  engine            = "mysql"
  instance_class    = "db.t2.micro"
  allocated_storage = 20
  name              = var.db_name
  username          = var.db_username
  password          = var.db_password
  parameter_group_name = "default.mysql5.7"
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.resume_parser_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.resume_parser_db_subnet_group.name
}

resource "aws_db_subnet_group" "resume_parser_db_subnet_group" {
  name       = "resume-parser-db-subnet-group"
  subnet_ids = var.subnets
  description = "Subnet group for resume parser RDS instance"
}
