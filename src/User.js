import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import placeholderUser from './images/placeholder-user.png';

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
        <div>
          <img src={imageSrc} alt="Avatar" />
          <div>Login: {data.User.Login}</div>
        </div>
      );
    }}
  </Query>
);

export default User;