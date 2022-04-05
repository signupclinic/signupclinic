import React from 'react';
import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function PositionDescription({
  open,
  setOpen,
  name,
  trainings,
  description,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  trainings?: Array<string>;
  description: string;
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      data-testid="position-description-dialog"
    >
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        {trainings && trainings.length > 0 && (
          <Alert severity="info">
            Required Trainings — {trainings.join(', ')}
          </Alert>
        )}
        <ReactMarkdown>{description}</ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
}
