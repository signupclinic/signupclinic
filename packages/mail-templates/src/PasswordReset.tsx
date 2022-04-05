import React from 'react';
import { Button } from '@mui/material';
import Layout from './Layout';
import { BaseEmailProps } from './utils';

export default function PasswordReset({
  firstName,
  href,
  email,
}: BaseEmailProps & { email: string }) {
  return (
    <Layout firstName={firstName}>
      <h2>Click the Button Below to Reset Your Password</h2>

      <a href={`${href}`}>Reset Password</a>
      <br />
      <br />
      <p>
        You are receiving this email because a password reset was requested for{' '}
        {email}. If you did not request a password reset, please ignore this
        email.
      </p>
      <Button />
    </Layout>
  );
}
