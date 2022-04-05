import React from 'react';
import { Container } from '@mui/material';
import Header from './ResumeHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        {children}
      </Container>
    </>
  );
}
