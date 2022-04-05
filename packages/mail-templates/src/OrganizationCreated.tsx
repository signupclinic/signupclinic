import React from 'react';
import dayjs from 'dayjs';
import Layout from './Layout';
import { BaseEmailProps } from './utils';

const utc = require('dayjs/plugin/utc');
const timezonePlugin = require('dayjs/plugin/timezone');
const advanced = require('dayjs/plugin/advancedFormat');

// dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezonePlugin);
dayjs.extend(advanced);

export default function Announcement({
  href,
  name,
  displayName,
  ownerEmail,
  firstName,
}: BaseEmailProps & {
  name: string;
  displayName: string;
  ownerEmail: string;
}) {
  return (
    <Layout firstName={firstName}>
      <h2>New Organization Created.</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <h4>Name:</h4>
            </td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Display Name:</td>
            <td>{displayName}</td>
          </tr>
          <tr>
            <td>Link:</td>
            <td>
              <a href={href}>{href}</a>
            </td>
          </tr>
          <tr>
            <td>Owner Email:</td>
            <td>{ownerEmail}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <a href={href}>Set up your account</a>
    </Layout>
  );
}
