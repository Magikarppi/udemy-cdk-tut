import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { CfnOutput } from '@aws-cdk/core';
import * as path from 'path';

export class UdemyCdkTutStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'UdemyCdkTutBucket', {
      encryption: BucketEncryption.S3_MANAGED,
    });

    const getPhotos = new NodejsFunction(this, 'GetPhotosLambda', {
      handler: 'getPhotos',
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
    });

    new CfnOutput(this, 'UdemyCdkTutBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'UdemyCdkTutBucketName',
    });
  }
}
