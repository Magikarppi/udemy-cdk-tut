import {
  APIGatewayProxyEventV2,
  Context,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

async function getPhotos(
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  try {
    return {
      statusCode: 200,
      body: 'Hello from lambda',
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: `${error}`,
    };
  }
}

export { getPhotos };
