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
    const result = await dynamoDB.call('delete', params);

    callback(null, success({ status: true }));
  } catch (error) {
    callback(null, failure({ status: false }));
  }
};
