import { Autocomplete, Box, TextField, Collapse, Chip } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { DeleteButton } from '@j718/components';

export function useClinicFormClinicTypeSelector({
  control,
  options,
  onDeleteClinicType,
  onChangeClinicType,
}: {
  control;
  options: Array<{ label: string; value: string }>;
  onDeleteClinicType?: (clinicTypeId: string) => void;
  onChangeClinicType: (clinicTypeId: string) => void;
}): { ClinicTypeSelector: React.FC; reset } {
  const [fromTemplate, setFromTemplate] = useState(false);

  return {
    ClinicTypeSelector: () => (
      <Controller
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          const fromTemplateCalculated: boolean =
            fromTemplate === true || Boolean(field.value);
          return (
            <>
              <Box display="block">
                <Chip
                  label="From Scratch"
                  sx={{ mr: 1 }}
                  color={!fromTemplateCalculated ? 'primary' : 'default'}
                  onClick={() => {
                    setFromTemplate(false);
                    field.onChange(null);
                  }}
                />
                <Chip
                  label="From Template"
                  color={fromTemplateCalculated ? 'primary' : 'default'}
                  onClick={() => setFromTemplate(true)}
                />
              </Box>
              <Collapse in={fromTemplateCalculated} sx={{ width: '100%' }}>
                <Box display="flex" alignItems="center" pl={1} pr={1}>
                  <Autocomplete
                    options={options}
                    onChange={(event, data) => {
                      onChangeClinicType(data?.value);
                    }}
                    fullWidth
                    getOptionLabel={(option) =>
                      typeof option === 'string' && option !== ''
                        ? options?.find((i) => i.value === option)?.label ||
                          'Loading ...'
                        : option?.label || ''
                    }
                    isOptionEqualToValue={(option, value: string) =>
                      option.value === value
                    }
                    value={field?.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        size="small"
                        label="Select Preexisting Template?"
                        inputRef={ref}
                        error={error !== undefined}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <Box ml={2}>
                    <DeleteButton
                      title="Delete Template"
                      handleDelete={() => {
                        onDeleteClinicType(field?.value);
                      }}
                    />
                  </Box>
                </Box>
              </Collapse>
            </>
          );
        }}
        control={control}
        name="clinicTypeId"
      />
    ),
    reset: () => setFromTemplate(false),
  };
}
