import React from 'react';
import { Menu, MenuItem } from '@mui/material';

export default function ConfirmMenu({
  onClose,
  onDelete,
  anchorEl,
  label,
}: {
  onClose: () => void;
  onDelete: () => void;
  anchorEl: any;
  label?: string;
}) {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem
        onClick={() => {
          onDelete();
          onClose();
        }}
        data-testid="confirm-menu-item"
      >
        {label || 'Confirm'}
      </MenuItem>
    </Menu>
  );
}
