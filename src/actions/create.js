import uuid from 'uuid';
import * as dynamoDB from '../lib/dynamodb-lib';
import { success, failure } from '../lib/response-lib';

export const main = async (event, context, callback) => {
  // The request body is passed in as JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
    },
  };

  try {
    await dynamoDB.call('put', params);
    callback(null, success(params.Item));
  } catch (error) {
    callback(null, failure({ status: false }));
  }
};
