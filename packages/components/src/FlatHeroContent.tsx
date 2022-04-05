import React from 'react';
import { Container, Typography, SxProps } from '@mui/material';

export default function FlatHeroContent({
  children,
  primary = '',
  secondary = '',
  ...props
}: {
  children?: React.ReactNode;
  primary?: string;
  secondary?: string;
} & SxProps) {
  return (
    <Container maxWidth="lg" sx={{ padding: 4, paddingBottom: 4, ...props }}>
      <Typography variant="h4">{primary}</Typography>
      <Typography variant="h6" color="secondary">
        {secondary}
      </Typography>
      {children}
    </Container>
  );
}
