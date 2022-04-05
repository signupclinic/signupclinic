import React from 'react';
import { Paper, SxProps } from '@mui/material';
import Copyright from './Copyright';
import { quartzLandingUrl } from './utils';

export default function Footer({ sx }: { sx?: SxProps }) {
  return (
    <Paper
      sx={{
        height: 100,
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',

        ...sx,
      }}
    >
      <Copyright name="Quartz Software LLC" href={quartzLandingUrl} />
    </Paper>
  );
}
