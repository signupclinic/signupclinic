import React, { useState } from 'react';
import { Typography, Tooltip, IconButton, Box } from '@mui/material';
import Info from '@mui/icons-material/Info';
import { useSnackbar } from 'notistack';
import PositionButton from './PositionButton';
import PositionDescription from '../PositionClinicDescription';
import { SignupStatus } from './utils';

export function Position({
  students = [],
  name,
  limit,
  isModifiable,
  hasLottery,
  trainings,
  signupStatus,
  inadequateTrainings,
  description,
  isAdmin,
  completed,
  onClick = () => {},
}: {
  students?: Array<{ fullName: string; email?: string }>;
  name: string;
  limit: number;
  isModifiable?: boolean;
  trainings?: Array<string>;
  inadequateTrainings?: boolean;
  description?: string;
  hasLottery?: boolean;
  isAdmin?: boolean;
  completed?: boolean;
  onClick?(e): void;
  signupStatus: SignupStatus;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = () => {
    enqueueSnackbar('Copied student emails to clipboard.');
    navigator.clipboard.writeText(
      students?.map(({ email }) => email).join(', ')
    );
  };
  const content = `(${hasLottery ? '-' : students.length}/${limit}) ${name}`;
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const StudentNames = (
    <Typography
      variant="caption"
      sx={{
        marginLeft: 3,
        textAlign: 'left',
        flexGrow: 10,
        marginTop: -0.2,
        marginBottom: 0,
        display: 'block',
        maxWidth: 'max-content',
        ...(isAdmin && {
          title: 'copy student emails to clipboard',
          '&:hover': {
            cursor: 'copy',
            color: 'primary.main',
            textDecoration: 'underline',
          },
        }),
      }}
      onClick={isAdmin && handleCopy}
    >
      {hasLottery && `(${students.length}) `}
      {students?.map((item) => item.fullName).join(', ')}
    </Typography>
  );
  return (
    <div>
      <PositionDescription
        open={descriptionOpen}
        description={description}
        setOpen={setDescriptionOpen}
        name={name}
        trainings={trainings}
      />
      <Box display="flex" alignItems="center">
        <Tooltip title="More Info" placement="right">
          <IconButton
            sx={{ opacity: description || trainings?.length > 0 ? 1 : 0 }}
            onClick={() => setDescriptionOpen(true)}
            name={name}
          >
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
        <PositionButton
          className="position-button"
          hasLottery={hasLottery}
          disabled={!isModifiable}
          inadequateTrainings={inadequateTrainings}
          variant={signupStatus}
          isAdmin={isAdmin}
          completed={completed}
          onClick={onClick}
        >
          {content}
        </PositionButton>
      </Box>
      {students?.length > 0 &&
        (isAdmin ? (
          <Tooltip title="Copy student emails to clipboard">
            {StudentNames}
          </Tooltip>
        ) : (
          StudentNames
        ))}
    </div>
  );
}

export default Position;
