import express from 'express';
import { schema } from './src/schema';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = 8081;

const server = express();

server.use('*', cors({ origin: 'http://reactql-boshes.c9users.io:8080' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://reactql-boshes.c9users.io:${PORT}`));

