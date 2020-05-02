import React, { Component } from 'react';
import gql from 'graphql-tag'; // helper for defining queries in our component
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate( // how we run a mutation inside a component
      { variables: { id } } // this is the es6 way, es5 way is {id:id}
    ).then(() => this.props.data.refetch()); // another way to refetch
  }

  renderSongs() {
    //   the result from our query is stored in params obj
      return this.props.data.songs.map(({ id, title }) => {
        return (
          <li key={id} className='collection-item'>
           <Link to={`/songs/${id}`}>
            {title}
           </Link>
           <i className="material-icons"
            onClick={() => this.onSongDelete(id)}
           >
             delete
           </i>
          </li>
        );
      });
  }
  
  render() {
    // if we try to render the data out instantaneously, we get an err bc its empty at first
    if(this.props.data.loading) { return <div>Loading...</div>}

    return(
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>    
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// use the graphql method to bond the query with the component.
// when we render our component, the query is sent to the backend server
// we're attaching the query and mutation to the component-> we cant add another param so we'll use multiple instances of the graphql
export default graphql(mutation)( //make a helper with the mutation
  graphql(query)(SongList) // invoke it with the result of this query & component
);