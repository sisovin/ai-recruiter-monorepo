#!/bin/bash

# Deployment script for resume-parser service

# Exit immediately if a command exits with a non-zero status
set -e

# Variables
SERVICE_NAME="resume-parser"
CLUSTER_NAME="resume-parser-cluster"
TASK_DEFINITION="resume-parser-task"
SERVICE_DEFINITION="resume-parser-service"
REGION="us-east-1"

# Update ECS service with the new task definition
echo "Updating ECS service with the new task definition..."
aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_DEFINITION --force-new-deployment --region $REGION

# Wait for the service to stabilize
echo "Waiting for the service to stabilize..."
aws ecs wait services-stable --cluster $CLUSTER_NAME --services $SERVICE_DEFINITION --region $REGION

echo "Deployment of $SERVICE_NAME service completed successfully."
