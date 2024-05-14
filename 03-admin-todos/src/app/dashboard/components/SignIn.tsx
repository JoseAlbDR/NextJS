import React from 'react';
import { signIn } from '../../../../auth';

const SignIn = () => {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </>
  );
};

export default SignIn;
