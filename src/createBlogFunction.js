exports.handler = async (event) => {
  // Process the blog content from the event
  const blogContent = event.body;

  // Store the blog content in S3
  // Implementation details depend on how you want to store the blog content

  // Update the DynamoDB table with blog metadata
  // Implementation details depend on your DynamoDB table structure

  return {
    statusCode: 200,
    body: "Blog created successfully",
  };
};


const AWS = require('aws-sdk');

exports.handler = async (event) => {
  try {
    // Initialize the AWS SDK
    const s3 = new AWS.S3();
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    // Process the blog content from the event
    const blogContent = event.body;

    // Store the blog content in S3
    await s3.putObject({
      Bucket: 'your-s3-bucket-name',
      Key: 'path/to/blog/file.txt',
      Body: blogContent,
    }).promise();

    // Update the DynamoDB table with blog metadata
    await dynamodb.put({
      TableName: 'your-dynamodb-table-name',
      Item: {
        blogId: 'your-blog-id',
        title: 'Your Blog Title',
        // Other metadata properties
      },
    }).promise();

    return {
      statusCode: 200,
      body: "Blog created successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error: " + error.message,
    };
  }
};
