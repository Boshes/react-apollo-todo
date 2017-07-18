import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
const typeDefs = `
type Channel {
   id: ID!                # "!" denotes a required field
   name: String
   messages: [Message]!
}

input MessageInput{
  channelId: ID!
  text: String
}

type Message {
  id: ID!
  text: String
}
# This type specifies the entry points into our API
type Query {
   channels: [Channel]    # "[]" means this is a list of channels
   channel(id: ID!): Channel
}
type Mutation {
  # A mutation to add a new channel to the list of channels
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}
type Subscription {
  messageAdded(channelId: ID!): Message
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers});
export { schema };