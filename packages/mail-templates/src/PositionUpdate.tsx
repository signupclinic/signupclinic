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
  lengthMinutes,
  startTime,
  timezone,
  confirmed,
  message,
  positionName,
}: BaseEmailProps & {
  timezone: string;
  lengthMinutes: number;
  message: string;
  startTime: Date;
  confirmed: boolean;
  positionName: string;
}) {
  const date = dayjs(startTime).format('MMM DD');
  const startTimeFormatted = (dayjs(startTime) as any)
    .tz(timezone)
    .format('hh:mm A');
  const endTimeFormatted = (dayjs(startTime) as any)
    .tz(timezone)
    .add(lengthMinutes, 'minutes')
    .format('hh:mm A z');
  return (
    <Layout>
      <h2>
        {confirmed
          ? 'Congratulations, you have been confirmed for a Position!'
          : 'Congratulations on Joining a Position Lottery!'}
      </h2>
      <table>
        <tr>
          <td>Position:</td>
          <td>{positionName}</td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>{date}</td>
        </tr>
        <tr>
          <td>Time:</td>
          <td>
            {startTimeFormatted} - {endTimeFormatted}
          </td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{confirmed ? 'Confirmed' : 'Joined (Not Confirmed)'}</td>
        </tr>
      </table>

      {!confirmed && (
        <p>
          You will be notified by email if you are selected when the lottery is
          run.
        </p>
      )}
      {message && <p>{message}</p>}
      <br />
      <a href={href}>View Position</a>
    </Layout>
  );
}
