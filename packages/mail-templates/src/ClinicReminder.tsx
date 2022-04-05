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
  clinics,
  timezone,
  message,
}: BaseEmailProps & {
  timezone: string;
  clinics: Array<{ lengthMinutes: number; startTime: Date; name: string }>;
  message: string;
}) {
  return (
    <Layout>
      {message && <p>{message}</p>}
      <h2>Please review the following upcoming clinics.</h2>
      <ul>
        {clinics
          .map(({ startTime, lengthMinutes, name }) => ({
            date: dayjs(startTime).format('MMM DD'),
            name,
            startTime: (dayjs(startTime) as any).tz(timezone).format('hh:mm A'),
            endTime: (dayjs(startTime) as any)
              .tz(timezone)
              .add(lengthMinutes, 'minutes')
              .format('hh:mm A z'),
          }))
          .map((val) => (
            <li>
              {val.date} {val.startTime} - {val.endTime} {val.name}
            </li>
          ))}
      </ul>

      <a href={href}>View Clinics</a>
    </Layout>
  );
}
