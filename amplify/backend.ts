import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { chatHandler } from './functions/chat-handler/resource.js';

export const backend = defineBackend({
  auth,
  data,
  chatHandler,
});

// Add Bedrock permissions to Lambda
backend.chatHandler.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: [
      'bedrock:InvokeAgent',
      'bedrock:RetrieveAndGenerate',
      'bedrock:Retrieve',
      'bedrock:InvokeModel'
    ],
    resources: ['*'],
  })
);

// Add Function URL for direct HTTP access
backend.chatHandler.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowCredentials: false,
    allowedHeaders: ['*'],
    allowedMethods: ['POST'],
    allowedOrigins: ['*'],
  },
});
