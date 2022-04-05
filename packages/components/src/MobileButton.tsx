import React from 'react';
import {
  ButtonProps,
  Tooltip,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  IconButton,
} from '@mui/material';

export default function MobileButton({
  onClick,
  buttonRef,
  open,
  Icon,
  title,
  ...props
}: {
  onClick: (e: any) => void;
  buttonRef?: any;
  open: boolean;
  Icon: any;
  title: string;
} & ButtonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return isMobile ? (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        size="small"
        color={open ? 'secondary' : 'inherit'}
        data-testid={`mobile-button-${title}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          //   ml: 0.2,
          //   mr: 0.2,
        }}
        {...props}
      >
        {Icon}
        <Typography variant="body2" color="inherit" sx={{ fontSize: '0.45em' }}>
          {title}
        </Typography>
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      variant={open ? 'contained' : 'outlined'}
      color={open ? 'secondary' : 'inherit'}
      onClick={onClick}
      startIcon={Icon}
      ref={buttonRef}
      data-testid={`mobile-button-${title}`}
      sx={{ ml: 0.5, mr: 0.5 }}
      {...props}
    >
      {title}
    </Button>
  );
}
