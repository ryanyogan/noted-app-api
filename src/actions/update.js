import * as dynamoDB from '../lib/dynamodb-lib';
import { success, failure } from '../lib/response-lib';

export const main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment ? data.attachment : null,
      ':content': data.content ? data.content : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDB.call('update', params);

    callback(null, success({ status: true }));
  } catch (error) {
    callback(null, failure({ status: false }));
  }
};
