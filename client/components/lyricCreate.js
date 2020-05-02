import React, { Component } from 'react';
import gql from 'graphql-tag'; // allow us to write graphql queries into js code
import {graphql} from 'react-apollo'; // lets us take query and attach to component

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        // when we associate a mutation, we get access to this.props.mutate to run the mutations!
        this.props.mutate({
            variables: {
                content: this.state.content, 
                songId: this.props.songId
            }
        }).then(() => this.setState({content: ''}));

    }

    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

const mutation = gql`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);