import React from 'react';
import { Button, Box } from '@mui/material';
import Link from 'next/link';

export default function HeaderContent({
  title,
  shortTitle,
  callToActionText,
  callToActionLink,
  callToActionOnClick,
}: {
  title: string;
  shortTitle?: string;
  callToActionText: string;
  callToActionLink?: string;
  callToActionOnClick?: () => void;
}) {
  const CallToActionButton = (
    <Button size="large" color="secondary" onClick={callToActionOnClick}>
      {callToActionText}
    </Button>
  );
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Button
        variant="text"
        color="inherit"
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        {shortTitle || title}
      </Button>
      <Box />
      {callToActionLink ? (
        <Link href={callToActionLink}>{CallToActionButton}</Link>
      ) : (
        CallToActionButton
      )}
    </Box>
  );
}
