// this is a names query
// it expects to get a query variable called id, of type ID
// it will pass that id to the SongQuery and return the id and title
import gql from 'graphql-tag';

export default gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;