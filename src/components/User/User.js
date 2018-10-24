import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import placeholderUser from '../../images/placeholder-user.png';

import './User.css';

const DELETE_USER = gql`
  mutation deleteUser($id: ID!){
    DeleteUser(id: $id) {
      ID
    }
  }
`;

const User = (props) => (
  <Query
    query={gql`
      query {
        User(id: "${props.match.params.userId}") {
          ID
          Login
          AvatarURL
        }
      }
   `}
    fetchPolicy='network-only'
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      let imageSrc = data.User.AvatarURL;
      if (!imageSrc) {
        imageSrc = placeholderUser;
      }

      return (
        <div className="user">
          <img className="user__avatar" src={imageSrc} alt="Avatar" />
          <div className="user__login">{data.User.Login}</div>
          <br />
          <Mutation mutation={DELETE_USER}>
            {(deleteUser, { loading, error, data:success }) => {
              if (success && success.DeleteUser && success.DeleteUser.ID) {
                return <Redirect to="/" />
              }
              return (
                <button
                  className="user__delete-button"
                  onClick={() => deleteUser({ variables: { id: data.User.ID } })}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete' }
                </button>
              )
            }}
          </Mutation>
        </div>
      );
    }}
  </Query>
);

export default User;