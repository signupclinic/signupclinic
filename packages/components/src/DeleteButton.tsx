import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem, IconButton, Tooltip } from '@mui/material';
import ConfirmMenu from './ConfirmMenu';

export default function DeleteButton({
  handleDelete,
  title,
  Icon,
  children,
}: {
  handleDelete: () => void;
  title?: string;
  Icon?: React.ReactNode;
  children?: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {children ? (
        <MenuItem onClick={handleClick}>{children}</MenuItem>
      ) : (
        <Tooltip title={title || 'Delete'}>
          <IconButton onClick={handleClick} data-testid="deleteicon">
            {Icon || <DeleteIcon />}
          </IconButton>
        </Tooltip>
      )}
      <ConfirmMenu
        onClose={handleClose}
        anchorEl={anchorEl}
        onDelete={handleDelete}
        label={title || 'Delete'}
      />
    </>
  );
}
