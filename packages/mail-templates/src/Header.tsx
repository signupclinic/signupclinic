import React from 'react';

export default function Header({ firstName }: { firstName?: string }) {
  return (
    <>
      <img
        src="https://signupclinic-assets.s3.amazonaws.com/icon.svg"
        height={25}
        alt="SignUpClinic"
      />
      {firstName && <p>Hi {firstName},</p>}
    </>
  );
}
