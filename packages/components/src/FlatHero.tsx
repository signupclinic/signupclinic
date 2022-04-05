import React from 'react';
import { Paper, SxProps } from '@mui/material';

export default function FlatHero({
  children,
  ...props
}: { children: React.ReactNode } & SxProps) {
  return <Paper sx={{ marginBottom: 5, ...props }}>{children}</Paper>;
}
