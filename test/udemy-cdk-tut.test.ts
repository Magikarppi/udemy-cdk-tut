import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
  haveResource,
} from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import * as UdemyCdkTut from '../lib/udemy-cdk-tut-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new UdemyCdkTut.UdemyCdkTutStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          UdemyCdkTutBucketA46CACD5: {
            Type: 'AWS::S3::Bucket',
            Properties: {
              BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                  {
                    ServerSideEncryptionByDefault: {
                      SSEAlgorithm: 'AES256',
                    },
                  },
                ],
              },
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain',
          },
        },
        Outputs: {
          UdemyCdkTutBucketNameExport: {
            Value: {
              Ref: 'UdemyCdkTutBucketA46CACD5',
            },
            Export: {
              Name: 'UdemyCdkTutBucketName',
            },
          },
        },
      },
      MatchStyle.EXACT
    )
  );
});

test.only('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new UdemyCdkTut.UdemyCdkTutStack(app, 'MyTestStack');
  // THEN
  expect(stack).toHaveResource('AWS::S3::Bucket');
});
