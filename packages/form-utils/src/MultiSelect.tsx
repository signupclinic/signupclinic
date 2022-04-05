/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller, FieldError } from 'react-hook-form';
import {
  TextFieldProps,
  AutocompleteProps,
  BaseTextFieldProps,
} from '@mui/material';
import FreeSoloAutocomplete from './FreeSoloAutoComplete';

type Option = {
  label: string;
  value: any;
};
const filter = createFilterOptions();

export function AutocompleteInput<T>({
  label,
  onChange,
  value,
  control,
  name,
  textFieldProps,
  ...props
}: {
  label: string;
  textFieldProps?: TextFieldProps;
  options: Array<any>;
  control: any;
  onAddMissing?: (value: string) => void;
  name: string;
  multiple: boolean;
  onChange?: (e, data, field) => void;
  value?: (field: any) => any;
} & { [key: string]: any }) {
  const getValue = (field) => (value ? value(field) : field.value);

  return (
    <Controller
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          onBlur={field.onBlur}
          autoHighlight
          openOnFocus
          filterSelectedOptions
          onChange={(event, data) => {
            if (onChange) {
              onChange(event, data, field);
            } else {
              field.onChange(data);
            }
          }}
          fullWidth
          isOptionEqualToValue={(option, val: string) => option.value === val}
          value={getValue(field)}
          aria-label={name}
          renderInput={(params) => (
            <TextField
              {...params}
              data-testid={`${name}-input`}
              variant="outlined"
              label={label}
              inputRef={ref}
              error={error !== undefined}
              helperText={error?.message}
              placeholder={label || name}
              {...textFieldProps}
            />
          )}
          {...props}
        />
      )}
      name={name}
      control={control}
    />
  );
}
export default function MultiSelect({
  label,
  options = [],
  control,
  onAddMissing,
  name,
  placeholder,
  multiple = true,
  textFieldProps,
  ...props
}: {
  label: string;
  options?: Array<{ value; label }>;
  control: any;
  onAddMissing?: (value: string) => void;
  name: string;
  placeholder?: string;
  textFieldProps?: BaseTextFieldProps;
  multiple: boolean;
} & { [key: string]: any }) {
  return (
    <Controller
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          onBlur={field.onBlur}
          autoHighlight
          openOnFocus
          options={options}
          filterOptions={(opts, params) => {
            const filtered = filter(opts, params);

            const { inputValue } = params;
            // Suggest the creation of a new value

            if (onAddMissing && inputValue !== '') {
              filtered.push({
                value: inputValue,
                label: `Add "${inputValue}"`,
              });
            }
            return filtered;
          }}
          multiple={multiple}
          filterSelectedOptions
          onChange={(event, data) => {
            if (multiple) {
              const newValues = data.filter(
                (item) =>
                  !options.map((opt) => opt.value).includes(item.value || item)
              );
              if (newValues.length && onAddMissing) {
                newValues.forEach(({ value }) => onAddMissing(value));
              }
            }
            field.onChange(
              multiple ? data.map((i) => i.value || i) || [] : data?.value
            );
          }}
          fullWidth
          // isOptionEqualToValue={() => true}
          getOptionLabel={(option: Option) =>
            typeof option === 'string' && option !== ''
              ? options?.find((i) => i.value === option)?.label || 'Loading ...'
              : option?.label || ''
          }
          isOptionEqualToValue={(option, value: string) =>
            option.value === value
          }
          value={multiple ? field.value || [] : field.value}
          aria-label={name}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              {...params}
              {...textFieldProps}
              data-testid={`${name}-input`}
              label={label}
              inputRef={ref}
              error={error !== undefined}
              helperText={error?.message}
              placeholder={placeholder || label || name}
            />
          )}
          {...props}
        />
      )}
      name={name}
      control={control}
    />
  );
}

export function FreeSoloMultiSelect({
  name,
  control,
  label,
}: {
  name: string;
  control: any;
  label: string;
}) {
  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <FreeSoloAutocomplete
          {...field}
          field={field}
          label={label}
          error={error}
        />
      )}
      name={name}
      control={control}
    />
  );
}
