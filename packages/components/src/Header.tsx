import React from 'react';
import { IconButton, AppBar, Toolbar, useScrollTrigger } from '@mui/material';
import { quartzLogoUrl, quartzLandingUrl } from './utils';

export default function Header({
  children,
  logoUrl = quartzLogoUrl,
  logoHref = quartzLandingUrl,
}: {
  children: React.ReactNode;
  logoHref?: string;
  logoUrl?: string;
}) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: !trigger ? 'primary.main' : 'background.default',
          color: !trigger ? 'primary.contrastText' : 'primary.main',
        }}
        elevation={trigger ? 4 : 0}
      >
        <Toolbar>
          <IconButton href={logoHref}>
            <img src={logoUrl} alt="logo" height={50} width={50} />
          </IconButton>
          {children}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
