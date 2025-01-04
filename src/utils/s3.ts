import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

export const myBucket = new AWS.S3({
  params: { Bucket: 'crunchymedia' },
  region: 'ap-southeast-1',
});
