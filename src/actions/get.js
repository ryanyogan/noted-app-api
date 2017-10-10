import * as dynamoDB from '../lib/dynamodb-lib';
import { success, failure } from '../lib/response-lib';

export const main = async (event, context, callback) => {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDB.call('get', params);

    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item Not Found' }));
    }
  } catch (error) {
    callback(null, failure({ status: false }));
  }
};
