import dynamoDB from '../utils/dynamoClient';

const tableName = process.env.DYNAMODB_TABLE_NAME!;

// Save interaction
export const saveInteraction = async (city: string, userId: string, interactionType: string) => {
    const params = {
        TableName: tableName,
        Item: {
            city,
            userId,
            interactionType,
        },
    };
    await dynamoDB.put(params).promise();
};

// Retrieve interactions by city
export const getInteractions = async (city: string) => {
    const params = {
        TableName: tableName,
        KeyConditionExpression: 'city = :city',
        ExpressionAttributeValues: {
            ':city': city,
        },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items;
};