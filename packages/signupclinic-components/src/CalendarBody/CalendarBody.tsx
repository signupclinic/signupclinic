import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Fade,
  SxProps,
} from '@mui/material';
import dayjs from 'dayjs';
import CalendarEvent from './CalendarEvent';

type Event = { startTime: Date; lengthMinutes: number; Event: any };

export type DayList = Array<{ day: Date; events: Array<Event> }>;

export const convertEventListToDayList = (
  events: Array<Event>,
  descending = false
): DayList => {
  const toDay = (day: Date) => dayjs(day).format('YYYY-MM-DD');
  const dayObject = events
    .sort(
      (a, b) => dayjs(a.startTime).diff(b.startTime) * (descending ? -1 : 1)
    )
    .reduce((prev, current: Event) => {
      (prev[toDay(current.startTime)] = // eslint-disable-line no-param-reassign
        prev[toDay(current.startTime)] || []).push(current);
      return prev;
    }, {});
  return Object.keys(dayObject).reduce(
    (prev, current) => [
      ...prev,
      { day: dayObject[current][0].startTime, events: dayObject[current] },
    ],
    []
  );
};

export default function CalendarBody<T>({
  events,
  descending,
  sx,
}: {
  events: Array<Event>;
  descending?: boolean;
  sx?: SxProps;
}) {
  const dayList = convertEventListToDayList(events, descending);
  return (
    <>
      {dayList.map((day) => (
        <Fade in key={day.day.toString()}>
          <Card
            sx={{
              padding: 1,
              marginTop: 1,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              ...sx,
            }}
          >
            <CardHeader
              sx={{
                backgroundColor: 'grey',
                padding: 0.5,
              }}
              title={
                <Typography variant="body1">
                  {dayjs(day.day).format('dddd')}
                </Typography>
              }
              action={
                <Typography variant="body1">
                  {dayjs(day.day).format('DD MMMM YYYY')}
                </Typography>
              }
            />
            <CardContent sx={{ padding: 0.5 }}>
              {day.events.map(({ Event, startTime, lengthMinutes }) => (
                <CalendarEvent
                  startTime={startTime}
                  lengthMinutes={lengthMinutes}
                  key={startTime.toString() + lengthMinutes.toString()}
                >
                  {Event}
                </CalendarEvent>
              ))}
            </CardContent>
          </Card>
        </Fade>
      ))}
    </>
  );
}
