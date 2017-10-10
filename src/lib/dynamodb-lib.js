import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-west-1' });

export const call = (action, params) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  return dynamoDB[action](params).promise();
};
