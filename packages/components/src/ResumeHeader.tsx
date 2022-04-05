import React from 'react';
import { Button, AppBar, Toolbar, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { iconUrl } from './index';

export default function ResumeHeader() {
  const root =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://jacobaclarke.com';

  return (
    <>
      <AppBar
        //   position="static"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar variant="dense">
          <Link href={root}>
            <IconButton sx={{ marginLeft: 3 }}>
              <img
                src={iconUrl}
                height={30}
                width={30}
                alt="Icon Jacob Clarke"
              />
            </IconButton>
          </Link>
          <Box width="100%" />
          <Link href={`${root}/blog`}>
            <Button color="primary" sx={{ marginRight: 3 }} variant="text">
              THOUGHTS
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Box height={40} />
    </>
  );
}
