import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import './style/style.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import app from './components/app';
import SongList from './components/songList';
import SongCreate from './components/songCreate';
import SongDetail from './components/songDetail';

// apolloclient assumes graphql server is available on the graphql route
var client = new ApolloClient({
  // this takes every data fetched by apollo client and runs it here
  // this identifies every piece of data inside the piece of data
  // apollo can use this id to track the data for updates and propogate those updates to react
  // but we need to make sure we ask for the id of every data that comes back
  dataIdFromObject: o => o.id
  /**
   * for new apollo cache updates use this link
   * https://www.apollographql.com/docs/react/advanced/caching
   */

   /**
    * we could also refresh queries
    */
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={app}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate}/>
          <Route path="songs/:id" component={SongDetail}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
