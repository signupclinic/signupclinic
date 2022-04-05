/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FieldError } from 'react-hook-form';

export default function FreeSoloAutocomplete({
  name,
  label,
  field,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  value: any;
  onChange: (e) => void;
  field: any;
  error: any;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState('');
  useEffect(() => {
    if (ref) {
      ref.current.focus();
    }
  }, [field]);
  let helperText;
  if (error !== undefined) {
    if (Array.isArray(error)) {
      helperText = `Invalid Emails:  ${(error as any as Array<FieldError>)
        ?.map((curr) => value[parseInt(/\d+/.exec(curr?.message)?.[0], 10)])
        .filter((i) => i !== '')
        .join(', ')}`;
    } else {
      helperText = error.message;
    }
  }
  const handleAddEmail = () => {
    if (inputValue) {
      onChange([
        ...new Set([
          ...[value].flat(),
          ...[inputValue]
            .flatMap((a) => a.split(/[, ]+/).map((i) => i.trim()))
            .filter((x) => x),
        ]),
      ]);
      setInputValue('');
    }
  };
  return (
    <Autocomplete
      {...field}
      value={value}
      onBlur={() => {
        handleAddEmail();
        field.onBlur();
      }}
      multiple
      fullWidth
      id="tags-standard"
      options={[]}
      forcePopupIcon={false}
      freeSolo
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, e) =>
        onChange(
          [e]
            .flat()
            .flatMap((a: any) => a.split(/[, ]+/).map((i) => i.trim(', ')))
            .filter((x) => x)
        )
      }
      ChipProps={{ size: 'small' }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label || ''}
          error={error !== undefined}
          helperText={helperText}
          placeholder={label || name}
          data-testid={`${name}-input`}
          inputRef={ref}
          onKeyDown={(e) => {
            if (e.code === 'Space' || e.code === 'Comma' || e.code === 'Tab') {
              e.preventDefault();
              handleAddEmail();
              return true;
            }
            return true;
          }}
        />
      )}
    />
  );
}
