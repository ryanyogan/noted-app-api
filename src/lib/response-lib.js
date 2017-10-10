export const success = body => _buildResponse(200, body);

export const failure = body => _buildResponse(500, body);

const _buildResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});
