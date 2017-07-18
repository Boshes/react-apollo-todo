import express from 'express';
import { schema } from './src/schema';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import cors from 'cors';
const PORT = 8081;

const server = express();

server.use('*', cors({ origin: 'http://reactql-boshes.c9users.io:8080' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://reactql-boshes.c9users.io:${PORT}/subscriptions`
}));

// server.listen(PORT, () => console.log(`GraphQL Server is now running on http://reactql-boshes.c9users.io:${PORT}`));

const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://reactql-boshes.c9users.io:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});

