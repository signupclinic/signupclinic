import React from 'react';
import Layout from './Layout';
import { BaseEmailProps } from './utils';

export default function PasswordReset({ firstName, href }: BaseEmailProps) {
  const recoverUrl = href;
  return (
    <Layout firstName={firstName}>
      <p>
        A new account has been created for you at{' '}
        <a href={href}>SignupClinic</a>.
      </p>
      <p>
        Please visit <a href={recoverUrl}>{recoverUrl}</a> to set up your
        account.
      </p>
      <a href={recoverUrl}>Set up your account.</a>
    </Layout>
  );
}
