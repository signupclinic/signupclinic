import React from 'react';
import Head from 'next/head';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';

export default {
  Head,
  img: (props) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Box height="50vh" width="100%" position="relative" m={4}>
      <Image
        {...props}
        objectFit="contain"
        layout="fill"
        loading="lazy"
        alt="image"
      />
    </Box>
  ),
  p: (props) => <Typography variant="body1" {...props} />,
  h1: (props) => <Typography variant="h2" {...props} />,
  h2: (props) => <Typography variant="h3" {...props} />,
  h3: (props) => <Typography variant="h4" {...props} />,
  h4: (props) => <Typography variant="h5" {...props} />,
  ul: (props) => <List {...props} />,
  li: ({ children }) => (
    <ListItem dense>
      <ListItemText primary={children} />
    </ListItem>
  ),
  a: (props) => (
    <NextLink href={props.href}>
      <Link {...props} />
    </NextLink>
  ),
};
