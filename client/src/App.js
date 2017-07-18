import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface, toIdValue } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';
import ChannelDetails from './components/ChannelDetails';
import NotFound from './components/NotFound';

const networkInterface = createNetworkInterface({ 
  uri: 'http://reactql-boshes.c9users.io:8081/graphql',
});

const wsClient = new SubscriptionClient(`ws://reactql-boshes.c9users.io:8081/subscriptions`, {
  reconnect: true
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  customResolvers: {
    Query: {
      channel: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args['id'] }))
      },
    },
  },
  dataIdFromObject,
});

class App extends Component {
   render() {
     return (
       <ApolloProvider client={client}>
        <BrowserRouter>
         <div className="App">
         <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={ChannelsListWithData}/>
              <Route path="/channel/:channelId" component={ChannelDetails}/>
              <Route component={ NotFound }/>
            </Switch>
         </div>
         </BrowserRouter>
       </ApolloProvider>
     );
   }
 }

export default App;
