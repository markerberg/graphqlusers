import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from '../components/lyricCreate';
import LyricList from '../components/lyricList';

class SongDetail extends Component {
  render() {
    // our component renders with the mutation, using the correct id. So we destructure data from that response
    const {song} = this.props.data;

    if(!song) { return <div>Loading...</div>; }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id}/>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  // we take the props that were to be passed to the SongDetail function
  // and the object that we return will be provided to the query when its made
  // so we need to define queryvariables for fetchSong query; we return an object with the key of variables
  // and the arg which fetchSong expects, id:, and pass along the id pulled from props(which comes from router -- see index.js)
  // in this case we're able to transfer data from the song to our query, via props
  // props is the same as this.props in component
  // this pattern lets us make a query using info from the url
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);