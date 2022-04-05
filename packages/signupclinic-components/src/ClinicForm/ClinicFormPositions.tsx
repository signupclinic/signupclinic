import {
  Autocomplete,
  Box,
  createFilterOptions,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Fade,
  Card,
  Button,
  Alert,
  Chip,
} from '@mui/material';
import LockOpen from '@mui/icons-material/LockOpen';
import Lock from '@mui/icons-material/Lock';
import React, { useRef, useState } from 'react';
import { AutocompleteInput, SelectInput } from '@j718/form-utils';
import { useFieldArray } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import AddOutlined from '@mui/icons-material/AddOutlined';

const filter = createFilterOptions();

function EditButton({
  onClick,
  flash,
}: {
  onClick: () => void;
  flash: boolean;
}) {
  const Inner = (
    <Button
      size="small"
      color="secondary"
      variant="text"
      onClick={() => {
        onClick();
      }}
      startIcon={<EditIcon />}
    >
      Edit
    </Button>
  );
  return flash ? <Fade in>{Inner}</Fade> : Inner;
}

export function useClinicFormPositions({
  control,
  onCreatePositionType,
  onEditPositionType,
  positionTypeOptions,
}: {
  control;
  onCreatePositionType: (name: string) => void;
  onEditPositionType: (positionType) => void;
  positionTypeOptions: Array<{
    _id: string;
    name: string;
    hasLottery: boolean;
    trainings?: Array<{ name }>;
  }>;
}): {
  Positions: React.FC;
  appendPosition: ({ positionTypeId: string, limit: number }) => void;
} {
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [addingNewPosition, setAddingNewPositon] = useState(false);
  const { fields, append, remove } = useFieldArray<any, any, 'positionTypeId'>({
    control,
    name: 'positions',
  });

  const Positions = fields.map((field, i) => {
    const positionType = positionTypeOptions.find(
      (p) => p._id === field.positionTypeId
    );
    return (
      <Card sx={{ width: '100%', m: 0.5 }} key={field.positionTypeId}>
        <Box sx={{ px: 0.7, pb: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            key={field.positionTypeId}
          >
            <Box display="flex" alignItems="center">
              {positionType?.hasLottery ? (
                <Tooltip title="Allow More Signups than Available">
                  <LockOpen sx={{ marginRight: 1 }} />
                </Tooltip>
              ) : (
                <Tooltip title="Limit signups to number available">
                  <Lock sx={{ marginRight: 1 }} />
                </Tooltip>
              )}
              <Typography variant="h6">
                {positionType?.name ||
                  positionTypeOptions.find(
                    (pos) => pos.name === field.positionTypeId
                  )?.name ||
                  'Loading...'}
              </Typography>
            </Box>
            <div>
              <EditButton
                onClick={() => {
                  onEditPositionType(positionType);
                }}
                flash={i === fields.length - 1}
              />

              <Tooltip title="Remove Position">
                <IconButton size="small" onClick={() => remove(i)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Box>
          <SelectInput
            control={control}
            options={[...Array(100).keys()].map((x) => x + 1)}
            name={`positions.${i}.limit`}
            label="Number Wanted"
            fullWidth
          />
          {positionType?.trainings?.length > 0 && (
            <Typography variant="body2">
              Required Trainings:{' '}
              {positionType?.trainings.map((training) => (
                <Chip label={training.name} size="small" key={training.name} />
              ))}
            </Typography>
          )}
        </Box>
      </Card>
    );
  });
  const AddPositionButton = addingNewPosition ? (
    <Autocomplete
      options={positionTypeOptions.map((i) => ({ ...i, label: i.name })) || []}
      autoHighlight
      clearOnBlur={false}
      autoSelect
      loading={positionTypeOptions === undefined}
      onChange={(e, newValue: any) => {
        if (newValue?.new) {
          onCreatePositionType(newValue.value);
        } else {
          append({ positionTypeId: newValue._id, limit: 1 });
        }
        setAddingNewPositon(false);
      }}
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = opts.some(
          (option) => inputValue?.toLowerCase() === option.label?.toLowerCase()
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            value: inputValue,
            new: true,
            label: `Add "${inputValue}"`,
          });
        }

        return filtered.filter(({ _id }) =>
          fields.every(({ positionTypeId }) => positionTypeId !== _id)
        ) as any;
      }}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ mt: 1 }}
          data-testid="position-type-select"
          inputRef={autoCompleteRef}
          label="Type to add a new position"
        />
      )}
    />
  ) : (
    <Button
      startIcon={<AddOutlined />}
      size="small"
      fullWidth
      color="secondary"
      data-testid="add-position-button"
      sx={{ m: 1 }}
      onClick={() => {
        setAddingNewPositon(true);
        setTimeout(() => autoCompleteRef.current?.focus());
      }}
    >
      Add Volunteer Position
    </Button>
  );
  return {
    appendPosition: append,
    Positions: () => (
      <>
        {Positions}
        {!fields.length && (
          <Alert severity="info" sx={{ width: '100%' }}>
            Click "+ ADD VOLUNTEER POSITION" below to add positions that your
            volunteers can sign up for!
          </Alert>
        )}
        {AddPositionButton}
      </>
    ),
  };
}
