import React, { useMemo } from 'react';
import * as yup from 'yup';
import { useFormExtended, FormArgs } from '@j718/form-utils';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Alert,
  Grid,
  Zoom,
} from '@mui/material';
import Announcement from 'mail-templates/dist/Announcement';
import ClinicReminder from 'mail-templates/dist/ClinicReminder';
import PositionUpdate from 'mail-templates/dist/PositionUpdate';
import { MailTemplate } from './generated';

const message = 'Either students, trainings, or clinics is required';
const trainingsStudentsRule = {
  is: (template, idsOne, idsTwo) =>
    template !== MailTemplate.LotteryResults &&
    (!idsTwo || idsTwo.length === 0) &&
    (!idsOne || idsOne.length === 0),
  then: (schema) => schema.required(message).min(1, message),
};

const formSchema = yup.object().shape(
  {
    message: yup.string().when('template', {
      is: MailTemplate.Announcement,
      then: (schema) => schema.required('Message is required'),
    }),
    template: yup.string().required(),
    studentIds: yup
      .array()
      .when(['template', 'trainingIds', 'toClinicIds'], trainingsStudentsRule),
    // .when(['template', 'toClinicIds'], trainingsStudentsRule),
    toClinicIds: yup
      .array()
      .of(yup.string())
      .when(['template', 'studentIds', 'trainingIds'], trainingsStudentsRule)
      .when('template', {
        is: MailTemplate.LotteryResults,
        then: (schema) =>
          schema
            .required('At least one event is required')
            .min(1, 'At least one event is required'),
      }),
    trainingIds: yup
      .array()
      .when(['template', 'studentIds', 'toClinicIds'], trainingsStudentsRule),
    bodyClinicIds: yup
      .array()
      .of(yup.string())
      .when('template', {
        is: MailTemplate.ClinicReminder,
        then: (schema) =>
          schema
            .required('At least one event is required')
            .min(1, 'At least one event is required'),
      }),
  },
  [
    ['studentIds', 'trainingIds'],
    ['studentIds', 'toClinicIds'],
    ['trainingIds', 'toClinicIds'],
  ] as any
);

export type FormData = yup.InferType<typeof formSchema>;

function Section({
  children,
  title,
  disabled,
}: {
  children;
  title;
  disabled?: boolean;
}) {
  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          {disabled ? <Lock /> : <LockOpen />}

          <Typography variant="h6" color="secondary">
            {' '}
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}

export default function NewClinicsMailForm({
  onSubmit,
  trainingOptions,
  studentOptions,
  tenant,
  clinicOptions,
  defaultValues,
}: FormArgs<FormData> & {
  tenant: { name: string; timezone?: string };
  trainingOptions: Array<{ label: string; value: string }>;
  studentOptions: Array<{ label: string; value: string }>;
  clinicOptions: Array<{ label: string; value: string }>;
}) {
  const {
    ControlledForm,
    ControlledMultiSelect,
    ControlledTextInput,
    ControlledRadioInput,
    watch,
  } = useFormExtended({
    schema: formSchema,
    defaultValues,
    clearOnSubmit: false,
  });
  // const toExplanation = watch(['trainingIds', 'studentIds', 'toClinicIds'] as any) ? `Sending message to `
  const template = watch('template' as any);
  const FormContent = useMemo(
    () => (
      <ControlledForm onSubmit={onSubmit} name="Send Email">
        <Section title="1. Template">
          <ControlledRadioInput
            options={[
              // { label: 'New Clinic', value: MailTemplate.NewClinic },
              {
                label: 'Event Announcement',
                value: MailTemplate.ClinicReminder,
              },
              { label: 'Lottery Results', value: MailTemplate.LotteryResults },
              {
                label: 'Simple Announcement',
                value: MailTemplate.Announcement,
              },
            ]}
            name="template"
            label=" "
          />
        </Section>
        <Section title="2. To" disabled={!template}>
          {template !== (MailTemplate.LotteryResults as any) && (
            <>
              <ControlledMultiSelect
                options={trainingOptions}
                disabled={!template}
                multiple
                name="trainingIds"
                label="Students with Any of These Trainings"
              />
              <Divider>AND</Divider>
              <ControlledMultiSelect
                options={studentOptions}
                disabled={!template}
                multiple
                name="studentIds"
                label="Any of these Students"
              />
              <Divider>AND</Divider>
            </>
          )}
          <ControlledMultiSelect
            options={clinicOptions}
            disabled={!template}
            multiple
            name="toClinicIds"
            label="Students Confirmed for any of These Events"
          />
        </Section>
        <Section title="3. Body" disabled={!template}>
          {template === (MailTemplate.ClinicReminder as any) && (
            <ControlledMultiSelect
              options={clinicOptions}
              multiple
              name="bodyClinicIds"
              label="Events to Include in the Email"
              disabled={!template}
            />
          )}
          <ControlledTextInput
            multiline
            disabled={!template}
            minRows={4}
            name="message"
            label={`Message ${
              template === (MailTemplate.Announcement as any)
                ? ''
                : '(Optional)'
            }`}
          />
        </Section>
      </ControlledForm>
    ),
    [template, trainingOptions, studentOptions, clinicOptions]
  );

  return (
    <Grid container>
      <Grid item xs={12} md={!template ? 12 : 6}>
        {FormContent}
      </Grid>
      <Zoom in={template !== undefined} unmountOnExit>
        <Grid item xs={12} md={6}>
          <Box
            width="100%"
            p={2}
            m={1}
            sx={{
              borderColor: 'primary.main',
              borderWidth: 2,
              borderStyle: 'solid',
            }}
          >
            <Alert sx={{ mb: 3 }}>Example Email</Alert>
            {template === (MailTemplate.Announcement as any) && (
              <Announcement
                href={`https://${tenant?.name}.signupclinic.com`}
                message={watch('message' as any) as any}
                senderName="Your Email"
                firstName="{User Name}"
              />
            )}
            {template === (MailTemplate.LotteryResults as any) && (
              <PositionUpdate
                href={`https://${tenant?.name}.signupclinic.com`}
                message={watch('message' as any) as any}
                confirmed
                firstName="{User Name}"
                lengthMinutes={60}
                positionName="{Position Name}"
                startTime={new Date()}
                timezone={tenant?.timezone}
              />
            )}
            {template === (MailTemplate.ClinicReminder as any) && (
              <ClinicReminder
                href={`https://${tenant?.name}.signupclinic.com`}
                message={watch('message' as any) as any}
                clinics={[
                  {
                    lengthMinutes: 60,
                    startTime: new Date(),
                    name: '{Clinic Name}',
                  },
                ]}
                timezone={tenant?.timezone}
                firstName="{User Name}"
              />
            )}
          </Box>
        </Grid>
      </Zoom>
    </Grid>
  );
}
