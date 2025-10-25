import { defineFunction } from '@aws-amplify/backend';

export const chatHandler = defineFunction({
  name: 'chat-handler',
  entry: './handler.ts',
  environment: {
    KNOWLEDGE_BASE_ID: 'your-knowledge-base-id',
    BEDROCK_REGION: 'us-east-1',
  },
  timeoutSeconds: 30,
});
