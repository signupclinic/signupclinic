import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function CalendarEvent({
  startTime,
  lengthMinutes,
  children,
}: {
  startTime: Date;
  lengthMinutes: number;
  children: React.ReactNode;
}) {
  const timeToString = (time: Date) => dayjs(time).format('hh:mm a');
  const timeString = `${timeToString(startTime)} - ${timeToString(
    dayjs(startTime).add(lengthMinutes, 'minutes').toDate()
  )}`;
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        //  md={3} lg={3} xl={3}
      >
        <Typography variant="body1">{timeString}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        // md={9} lg={9} xl={9}
      >
        {children}
      </Grid>
    </Grid>
  );
}
