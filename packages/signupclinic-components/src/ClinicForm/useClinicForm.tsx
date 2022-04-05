import React, { useEffect, useState } from 'react';
import {
  Box,
  Tooltip,
  Divider,
  Button,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import * as yup from 'yup';
import { useFormExtended } from '@j718/form-utils';
import SaveIcon from '@mui/icons-material/SaveRounded';
// import { DescriptionPreview } from '../../../signupclinic/src/web/components';
import { useClinicFormPositions } from './ClinicFormPositions';
import { useClinicFormClinicTypeSelector } from './ClinicFormClinicTypeSelector';
import DayRepeat from '../DayRepeat';

const formSchema = yup.object({
  name: yup.string().required('Please enter a name'),
  startTime: yup.string().required('Start time is required'),
  allowMultipleSignups: yup.boolean(),
  clinicTypeId: yup.string().nullable(),
  lengthMinutes: yup.number().required('Length is required'),
  description: yup.string().optional().nullable(),
  repeatDates: yup.array().of(yup.number()).nullable(),
  positions: yup
    .array()
    .min(1, 'At least one position is required')
    .required()
    .of(
      yup.object({
        limit: yup
          .number()
          .typeError('Plase enter a number')
          .required('Please enter a number'),
        positionTypeId: yup.string().required(),
      })
    ),
});

type FormData = yup.InferType<typeof formSchema>;

type ClinicFormClinicTypeSelectorProps = Parameters<
  typeof useClinicFormClinicTypeSelector
>[0];
type ClinicFormPositionsProps = Parameters<typeof useClinicFormPositions>[0];

export default function useClinicForm({
  positionTypeOptions,
  clinicTypeOptions,
  onSubmit,
  onEditPositionType,
  defaultValues,
  updating,
  onCreatePositionType,
  onDeleteClinicType,
  onSaveClinicType,
  onChangeClinicType,
}: {
  onEditPositionType: ClinicFormPositionsProps['onEditPositionType'];
  defaultValues: Partial<FormData>;
  updating?: boolean;
  onSubmit: (data: FormData) => void;
  onSaveClinicType: (data: FormData) => void;
  onDeleteClinicType: ClinicFormClinicTypeSelectorProps['onDeleteClinicType'];
  onCreatePositionType: ClinicFormPositionsProps['onCreatePositionType'];
  onChangeClinicType: ClinicFormClinicTypeSelectorProps['onChangeClinicType'];
  clinicTypeOptions: ClinicFormClinicTypeSelectorProps['options'];
  positionTypeOptions: ClinicFormPositionsProps['positionTypeOptions'];
}): {
  Form: React.ReactElement;
  appendPosition: ({ limit, positionTypeId }) => void;
  reset: () => void;
} {
  const baseDefaults = {
    lengthMinutes: 60,
    clinicTypeId: null,
    repeatDates: [],

    positions: [],
  };
  const defaults = {
    ...baseDefaults,
    ...defaultValues,
    positions:
      defaultValues?.positions?.map((i) => ({
        positionTypeId: i.positionTypeId,
        limit: i.limit,
      })) || [],
  };
  const {
    ControlledForm,
    ControlledTextInput,
    ControlledSwitchInput,
    ControlledSelect,
    control,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useFormExtended<FormData>({
    defaultValues: defaults,
    clearOnSubmit: false,
    schema: formSchema,
  });

  const { Positions, appendPosition } = useClinicFormPositions({
    control,
    onEditPositionType,
    onCreatePositionType,
    positionTypeOptions,
  });
  const { ClinicTypeSelector, reset: resetClinicTypeSelector } =
    useClinicFormClinicTypeSelector({
      control,
      onChangeClinicType,
      options: clinicTypeOptions,
      onDeleteClinicType,
    });
  const [descriptionPreview, setDescriptionPreview] = useState(
    getValues('description')
  );
  const [multiple, setMultiple] = useState(false);

  const title = updating ? 'Update Event' : 'Save Event';

  // from template section helpers
  const StyledDivider = (
    <Box width="100%" mb={2} mt={1}>
      <Divider />
    </Box>
  );
  const handleReset = () => {
    setMultiple(false);
    reset();
    resetClinicTypeSelector();
    setDescriptionPreview('');
  };

  useEffect(() => {
    setValue('repeatDates', []);
  }, [multiple]);
  useEffect(() => {
    setDescriptionPreview('');
    reset({
      startTime: getValues('startTime'),
      ...baseDefaults,
      ...defaultValues,
    });
  }, [defaultValues]);
  // return 0 as any;
  return {
    Form: (
      <>
        <ControlledForm
          sx={{ height: '100%' }}
          name={title}
          onSubmit={onSubmit}
        >
          <ControlledTextInput
            fullWidth
            name="startTime"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* {!updating && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={multiple}
                    onChange={(e) => setMultiple((val) => !val)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    data-testid="repeat-checkbox"
                  />
                }
                label="Repeat"
              />

              {multiple && (
                <DayRepeat
                  value={watch('repeatDates')}
                  setValue={(f) =>
                    setValue('repeatDates', f(watch('repeatDates')))
                  }
                />
              )}
            </>
          )} */}
          {StyledDivider}
          <ClinicTypeSelector />
          {StyledDivider}
          <ControlledTextInput name="name" fullWidth label="Event Name" />

          <ControlledSelect
            sx={{ m: 0.5 }}
            options={[...Array(33).keys()].map((i) => {
              const value = i * 15;
              const hours = Math.floor(value / 60);
              const minutes = value % 60;
              return {
                value,
                label: `${hours !== 0 ? `${hours} hour(s) ` : ''} ${
                  minutes !== 0 ? `${minutes} minutes` : ''
                }`,
              };
            })}
            name="lengthMinutes"
            label="Event Length"
            fullWidth
          />
          <ControlledSwitchInput
            name="allowMultipleSignups"
            label="Users may join multiple positions"
          />
          {/* todo test this switch */}
          <Positions />
          {errors.positions && (
            <Typography variant="caption" color="error">
              At least one position is required.
            </Typography>
          )}
          <ControlledTextInput
            name="description"
            label="Description (Leave blank to have default description for clinic type)"
            multiline
            minRows={4}
          />
        </ControlledForm>
        <Tooltip title="Save to Templates">
          <Button
            color="warning"
            startIcon={<SaveIcon />}
            sx={{ mt: 1 }}
            fullWidth
            data-testid="save-to-templates-button"
            onClick={() => {
              clearErrors();
              trigger('name').then((res) => {
                if (res) {
                  onSaveClinicType(getValues());
                }
              });
            }}
          >
            Save to Templates
          </Button>
        </Tooltip>
      </>
    ),
    // Form: 0 as any,
    reset: handleReset,
    appendPosition,
  };
}
