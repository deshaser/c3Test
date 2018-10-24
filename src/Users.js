import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Users = () => (
  <Query
    query={gql`
      query {
        Users {
          ID
          Login
          AvatarURL
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <ul key='Users'>
          {data.Users.map(({ ID:id, Login:name }) => (
            <li key={id}><Link  to={`/user/${id}`}>{name ? name : 'Incognoito'}</Link></li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default Users;