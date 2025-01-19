import { APIGatewayEvent, Context } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME!;

export const handler = async (event: APIGatewayEvent, context: Context) => {
    const city = event.pathParameters?.city;


    if (!city) {
        console.log("City parameter is missing");
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "City parameter is required" }),
        };
    }

    try {
        const params = {
            TableName: tableName,
            KeyConditionExpression: "city = :city",
            ExpressionAttributeValues: {
                ":city": city,
            },
        };

        console.log("DynamoDB Query Params:", JSON.stringify(params, null, 2));

        const result = await dynamoDB.query(params).promise();
        console.log("DynamoDB Query Result:", JSON.stringify(result, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        console.error("Error querying DynamoDB:", JSON.stringify(error, null, 2));
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch analytics data" }),
        };
    }
};