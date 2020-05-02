import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: {id}, // when a key and value are the same, es6 lets us use the same name. this is really {id:id}
            // were making an optimistic response
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1 // we take the like var from component, and assume it gets incremented by 1
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({id, content, likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i 
                        className="material-icons"
                        onClick={() => this.onLike(id, likes)} // we pass args to onLike func
                        >
                        thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            );
        });
    }

    render() {
        return(
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
  mutation LikeLyric($id: ID){
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);