import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function Hero({
  label,
  children,
  logoUrl = undefined,
  ...props
}: {
  label: string;
  children?: React.ReactNode;
  logoUrl?: string;
  [key: string]: any;
}) {
  return (
    <Box
      height={400}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      {...props}
    >
      <Grid container justifyContent="center" alignItems="center">
        {logoUrl && (
          <Grid item xs={12} md={2} display="flex" justifyContent="center">
            <img height={150} width={150} src={logoUrl} alt={label} />
          </Grid>
        )}
        <Grid item>
          <Typography
            variant="h1"
            sx={{ display: { sm: 'block', xs: 'none' } }}
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h3" sx={{ display: { xs: 'block', sm: 'none' } }}>
        {label}
      </Typography>
      {children && <Box m={3}>{children}</Box>}
    </Box>
  );
}
