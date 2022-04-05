import React from 'react';
import Layout from './Layout';
import { BaseEmailProps } from './utils';

export default function Announcement({
  firstName,
  href,
  senderName,
  message,
}: BaseEmailProps & { senderName: string; message: string }) {
  return (
    <Layout firstName={firstName}>
      <p>
        The following message was sent by {senderName} through SignupClinic:
      </p>
      <p>{message}</p>
      <a href={href}>Go to SignupClinic.</a>
    </Layout>
  );
}
