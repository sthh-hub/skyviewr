"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME;
const handler = async (event, context) => {
    const city = event.pathParameters?.city;
    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'City parameter is required' }),
        };
    }
    try {
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'city = :city',
            ExpressionAttributeValues: {
                ':city': city,
            },
        };
        const result = await dynamoDB.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch analytics data' }),
        };
    }
};
exports.handler = handler;
