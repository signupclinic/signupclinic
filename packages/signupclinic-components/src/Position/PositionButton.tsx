import React from 'react';
import { Button, Tooltip, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LeaveIcon from '@mui/icons-material/ExitToApp';
import BlockIcon from '@mui/icons-material/Block';
import { SignupStatus } from './utils';

export enum Titles {
  HAS_LOTTERY_OPEN = 'Click to Join. Position allows unlimited signups.',
  OPEN = 'Click to Join.',
  HAS_LOTTERY_JOINED = 'Joined. Click to Unjoin',
  CONFIRMED = 'Confirmed. Contact Admin to Unjoin',
  FULL = 'Position is Full',
  TRAININGS = 'Inadequate Trainings',
  ADMIN = 'Click to Edit or Add Students',
}
export function PositionButton({
  variant,
  children,
  hasLottery,
  completed,
  inadequateTrainings,
  disabled,
  isAdmin,
  onClick,
  ...props
}: {
  variant: SignupStatus;
  children: React.ReactNode;
  hasLottery: boolean;
  inadequateTrainings?: boolean;
  disabled?: boolean;
  completed?: boolean;
  isAdmin?: boolean;
  onClick?: (e) => void;
  [key: string]: any;
}) {
  let color = 'warning';
  switch (variant) {
    case SignupStatus.Joined:
      color = 'primary';
      break;
    case SignupStatus.Confirmed:
      color = 'secondary';
      break;
    default:
      break;
  }
  let title = Titles.HAS_LOTTERY_OPEN;
  let startIcon = <PersonAddIcon />;
  if (isAdmin) {
    title = Titles.ADMIN;
    if (completed) {
      startIcon = <CheckCircleIcon />;
    }
  } else if (variant === SignupStatus.Open && !hasLottery) {
    title = Titles.OPEN;
  } else if (variant === SignupStatus.Joined) {
    startIcon = <LeaveIcon />;
    title = Titles.HAS_LOTTERY_JOINED;
  } else if (variant === SignupStatus.Confirmed) {
    startIcon = <CheckCircleIcon />;
    title = Titles.CONFIRMED;
  } else if (completed) {
    title = Titles.FULL;
    startIcon = <CheckCircleIcon />;
  } else if (inadequateTrainings) {
    title = Titles.TRAININGS;
    startIcon = <BlockIcon />;
  }
  const InnerButton = (
    <Box>
      <Button
        data-testid="position-button"
        size="small"
        variant="contained"
        color={color as any}
        sx={{ mt: 0.5 }}
        disabled={!isAdmin && disabled && variant !== SignupStatus.Confirmed}
        startIcon={startIcon}
        onClick={(...p) => {
          if (isAdmin || !disabled) onClick(...p);
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  );
  return onClick ? (
    <Tooltip title={title} placement="bottom">
      {InnerButton}
    </Tooltip>
  ) : (
    InnerButton
  );
}

export default PositionButton;
