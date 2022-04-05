import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ConfirmMenu from './ConfirmMenu';

export default function ConfirmButton({
  onClick,
  children,
  title,
  label,
  ...props
}: {
  onClick: () => void;
  children: React.ReactNode;
  label?;
  title?: string;
} & { [key: string]: any }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={handleClick} {...props}>
          {children}
        </IconButton>
      </Tooltip>
      <ConfirmMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        onDelete={onClick}
        label={label}
      />
    </>
  );
}
