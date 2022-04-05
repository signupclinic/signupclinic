import React from 'react';
import { Avatar, Box } from '@mui/material';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export default function DayPicker({
  value,
  setValue,
}: {
  value: any;
  setValue: any;
}) {
  const handleClick = (day: number) =>
    setValue((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  return (
    <Box display="flex" flexWrap="wrap">
      {days.map((day, i) => (
        <Avatar
          onClick={() => handleClick(i)}
          key={day}
          data-testid={`day-repeat-checkbox-${day}`}
          sx={{
            width: 24,
            mr: 0.1,
            height: 24,
            fontSize: '0.7em',
            backgroundColor: value.includes(i) && 'primary.main',
            color: value.includes(i) && 'primary.contrastText',
          }}
        >
          {day}
        </Avatar>
      ))}
    </Box>
  );
}
