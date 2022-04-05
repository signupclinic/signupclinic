import { Fab } from '@mui/material';
import React, { useRef, useState } from 'react';
import { PopupModal } from 'react-calendly';

export default function Calendly() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  return typeof document !== 'undefined' ? (
    <div ref={ref}>
      <Fab
        variant="extended"
        color="primary"
        sx={{ position: 'fixed', bottom: 10, right: 10 }}
        onClick={() => setOpen(true)}
      >
        Schedule a Meeting
      </Fab>
      <PopupModal
        url="https://calendly.com/jacobclarke/30min"
        rootElement={ref.current}
        onModalClose={() => setOpen(false)}
        open={open}
      />
    </div>
  ) : (
    <div />
  );
}
