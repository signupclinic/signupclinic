import React, { useState } from 'react';
import {
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';

import Info from '@mui/icons-material/Info';
import More from '@mui/icons-material/MoreVert';
import { DeleteButton } from '@j718/components';
import { PositionClinicDescription } from '.';

export default function ClinicEvent({
  name,
  children,
  onRunLottery = () => {},
  onDeleteClinic = () => {},
  onEditClinic = () => {},
  lotteryCompleted = undefined,
  isAdmin = false,
  description,
}: {
  name: string;
  children: React.ReactNode;
  onRunLottery?: () => void;
  onDeleteClinic?: () => void;
  onEditClinic?: () => void;
  lotteryCompleted?: boolean;
  isAdmin?: boolean;
  description: string;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <Box mb={4}>
      {description && (
        <PositionClinicDescription
          open={infoOpen}
          setOpen={setInfoOpen}
          name={name}
          description={description}
        />
      )}
      <Stack direction="row" justifyContent="space-between" marginTop={-0.5}>
        <Typography variant="h6">
          {name}{' '}
          {description && (
            <Tooltip title="Show description" placement="right">
              <IconButton onClick={() => setInfoOpen(true)}>
                <Info />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {isAdmin && (
          <>
            <Tooltip title="More">
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                data-testid="clinic-event-more-button"
              >
                <More />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={anchorEl !== null}
              onClose={() => setAnchorEl(null)}
            >
              {!lotteryCompleted && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    onRunLottery();
                  }}
                >
                  Run Lotteries
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onEditClinic();
                }}
                data-testid="clinic-event-edit-button"
              >
                Edit Event
              </MenuItem>
              <DeleteButton
                handleDelete={() => {
                  setAnchorEl(null);
                  onDeleteClinic();
                }}
                title="Confirm"
              >
                Delete Event
              </DeleteButton>
            </Menu>
          </>
        )}
      </Stack>
      {children}
    </Box>
  );
}
