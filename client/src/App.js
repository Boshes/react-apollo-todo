import React, { Component } from 'react';
import { ApolloClient, gql, graphql, ApolloProvider, createNetworkInterface } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

const networkInterface = createNetworkInterface({ 
  uri: 'http://reactql-boshes.c9users.io:8081/graphql',
});
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);
const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
   render() {
     return (
       <ApolloProvider client={client}>
         <div className="App">
           <div className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <h2>Welcome to Apollo</h2>
           </div>
           <ChannelsListWithData />
         </div>
       </ApolloProvider>
     );
   }
 }

export default App;
