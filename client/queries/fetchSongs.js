import gql from 'graphql-tag';
// a reusable query for finding songs
export default gql`
    {
        songs {
            id
            title
        }
    }
`;