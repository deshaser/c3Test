import React from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const NewUser = () => (
  <Mutation
    mutation={gql`
      mutation createUser($login: String!, $avatarURL: String){
        CreateUser(input: {Login: $login, AvatarURL: $avatarURL}) {
          ID
        }
      }
    `}
  >
    {(createUser, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let login, avatarURL;

      if (data && data.CreateUser && data.CreateUser.ID) {
        return <Redirect to={`/user/${data.CreateUser.ID}`} />
      }

      return (
        <form onSubmit={e => {
          e.preventDefault();
          createUser({ variables: {
              login: login.value ,
              avatarURL: avatarURL.value ,
            }});
        }}>
          <input
            type='text'
            ref={ node => login = node }
          />
          <br/>
          <input
            type='text'
            ref={ node => avatarURL = node }
          />
          <br/>
          <button type='submit'>
            Create new User
          </button>
        </form>
      );
    }}
  </Mutation>
);

export default NewUser;