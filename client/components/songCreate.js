import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    // we define our mutation at bottom, then we need to invoke it here
    this.props.mutate({
      variables: {
        // pass in the text input as the title query variable and then pass it to our mutation
        title: this.state.title
      },
      // takes an arr of queries that should re-run after mutation is successefully completed
      // it will refetch this entire query after our mutation is completed...so we have updated data
      refetchQueries: [{ query: query }] // or with es6 it can be [{ query }] bc it has same name
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

// we want to call this mutation from the onSubmit event handler --->we use query variables
// we modify our mutations using query variables so it can take in an arg and pass it to the mutation itself
// we pass data from the component INTO the mutation. note: the mutation is completely seperate from the component.
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

// we sandwhich the mutation and the component together to use this mutation with the component
export default graphql(mutation)(SongCreate);