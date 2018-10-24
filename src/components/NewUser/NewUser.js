import React from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import './NewUser.css';

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
      let login, avatarURL;

      if (data && data.CreateUser && data.CreateUser.ID) {
        return <Redirect to={`/user/${data.CreateUser.ID}`} />
      }

      return (
        <form className="new-user" onSubmit={e => {
          e.preventDefault();
          createUser({ variables: {
              login: login.value ,
              avatarURL: avatarURL.value ,
            }});
        }}>
          <div className="new-user__title">
            New User
          </div>
          <label className="new-user__label">Login:</label>
          <input
            type='text'
            ref={ node => login = node }
          />
          <br/>
          <label className="new-user__label">Avatar URL:</label>
          <input
            type='text'
            ref={ node => avatarURL = node }
          />
          <br/>
          <button
            className="new-user__create-button"
            type='submit'
            disabled={loading}
          >
            { loading ? 'Creating...' : 'Create new User' }
          </button>
          { error ? 'Something is wrong...' : '' }
        </form>
      );
    }}
  </Mutation>
);

export default NewUser;