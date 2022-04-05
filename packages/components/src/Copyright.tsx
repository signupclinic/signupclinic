import { Typography, Link as MUILink } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Copyright({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href={href}>{name}</Link> {new Date().getFullYear()}.
    </Typography>
  );
}
