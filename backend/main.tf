# Provider configuration
provider "aws" {
  region = "ca-central-1"
}

# DynamoDB Table
resource "aws_dynamodb_table" "user_interactions" {
  name         = "UserInteractions"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "city"
  range_key = "userId"

  attribute {
    name = "city"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  tags = {
    Environment = "Dev"
  }
}

# Lambda Function
resource "aws_lambda_function" "analytics_function" {
  function_name = "SkyViewAnalytics"
  runtime       = "nodejs16.x"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"

  filename         = "lambda_function.zip" # Zip file containing Lambda code
  source_code_hash = filebase64sha256("lambda_function.zip")

  environment {
    variables = {
      DYNAMODB_TABLE_NAME = aws_dynamodb_table.user_interactions.name
    }
  }

  tags = {
    Environment = "Dev"
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "SkyViewLambdaRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Environment = "Dev"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_execution_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# API Gateway
resource "aws_apigatewayv2_api" "api" {
  name          = "SkyViewAPI"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.analytics_function.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /analytics/{city}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  role = aws_iam_role.lambda_role.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:Query",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ],
        Effect   = "Allow",
        Resource = aws_dynamodb_table.user_interactions.arn
      }
    ]
  })
}

output "api_gateway_url" {
  value       = aws_apigatewayv2_stage.default_stage.invoke_url
  description = "The base URL for the API Gateway"
}