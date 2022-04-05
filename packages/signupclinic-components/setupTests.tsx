import React from 'react';

jest.mock(
  'react-markdown',
  () =>
    function (props) {
      return <div />;
    }
);
