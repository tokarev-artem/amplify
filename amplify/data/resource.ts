import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ChatMessage: a
    .model({
      content: a.string().required(),
      role: a.enum(['user', 'assistant']),
      timestamp: a.datetime(),
      sessionId: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
