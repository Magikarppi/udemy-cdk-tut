import {
  APIGatewayProxyEventV2,
  Context,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { S3 } from 'aws-sdk';

const bucketName = process.env.PHOTO_BUCKET_NAME;
const s3 = new S3();

async function generateUrl(
  object: S3.Object
): Promise<{ filename: string; url: string }> {
  const url = await s3.getSignedUrlPromise('getObject', {
    bucketName,
    Key: object.Key,
    // Expires: (24 * 60 * 60)
  });
  return {
    filename: object.Key!,
    url,
  };
}

async function getPhotos(
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  console.log('bucketName:', bucketName);
  if (!bucketName) {
    throw new Error('env var PHOTO_BUCKET_NAME invalid');
  }
  try {
    const { Contents: results } = await s3
      .listObjectsV2({ Bucket: bucketName })
      .promise();
    if (results) {
      const photos = await Promise.all(
        results.map((result) => generateUrl(result))
      );
      return {
        statusCode: 200,
        body: JSON.stringify(photos),
      };
    }
    return {
      statusCode: 200,
      body: 'Nothing to list',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `${error}`,
    };
  }
}

export { getPhotos };
