import * as dynamoDB from '../lib/dynamodb-lib';
import { success, failure } from '../lib/response-lib';

export const main = async (event, context, callback) => {
  const params = {
    TableName: 'notes',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const results = await dynamoDB.call('query', params);
    callback(null, success(results.Items));
  } catch (error) {
    callback(null, failure({ status: false }));
  }
};
