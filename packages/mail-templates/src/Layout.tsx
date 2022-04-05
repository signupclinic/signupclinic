import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({
  firstName,
  children,
}: {
  firstName?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header firstName={firstName} />
      {children}
      <Footer />
    </>
  );
}
