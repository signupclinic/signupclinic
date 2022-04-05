import { createTransport } from 'nodemailer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PasswordReset from './PasswordReset';
import OrganizationCreated from './OrganizationCreated';
import AccountCreated from './AccountCreated';
import ClinicReminder from './ClinicReminder';
import PositionUpdate from './PositionUpdate';
import Announcement from './Announcement';

const defaultTransport = createTransport({
  host: 'smtp.titan.email',
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function getMailSender(
  Template: any,
  subject: string
): (
  props: Parameters<typeof Template>[0],
  settings: { bcc?: Array<string>; to?: string }
) => Promise<void> {
  return async (props, { bcc = [], to = [] }) => {
    await defaultTransport.sendMail({
      from: { address: 'support@signupclinic.com', name: 'SignupClinic' },
      subject,
      ...(bcc && {
        bcc:
          process.env.MAIL_ENV === 'production'
            ? bcc
            : bcc.map(() => 'jacobclarke718@gmail.com'),
      }),
      html: ReactDOMServer.renderToString(<Template {...props} />),
      ...(to && {
        to:
          process.env.MAIL_ENV === 'production'
            ? to
            : 'jacobclarke718@gmail.com',
      }),
    });
  };
}

export const emailPasswordReset = getMailSender(
  PasswordReset,
  'Signupclinic Reset Password'
);
export const emailOrganizationCreated = getMailSender(
  OrganizationCreated,
  'SignupClinic New Organization'
);
export const emailAccountCreated = getMailSender(
  AccountCreated,
  'SignupClinic New Account'
);
export const emailClinicReminder = getMailSender(
  ClinicReminder,
  'Clinic Reminder'
);

export const emailPositionUpdate = getMailSender(
  PositionUpdate,
  'Position Update'
);

export const emailAnnouncement = getMailSender(Announcement, 'Announcement');
