import {
  useForm,
  Controller,
  UseFormReturn,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import {
  Button,
  Switch,
  Typography,
  InputLabel,
  FormControlProps,
  Select,
  MenuItem,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  SelectProps,
  Radio,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import MultiSelect, {
  AutocompleteInput,
  FreeSoloMultiSelect,
} from './MultiSelect';

export * from './MultiSelect';
export { default as MultiSelect } from './MultiSelect';

export * from './test';

function toTitleCase(str) {
  const split = str.replace(/(\w)([A-Z].*)/g, (_, p1, p2) => `${p1} ${p2}`);
  return split.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function RadioInput({
  control,
  name,
  label = undefined,
  longLabel = undefined,
  options = [],
  ...props
}: {
  control: UseFormReturn['control'];
  name: string;
  label?: string;
  type?: string;
  longLabel?: string;
  options?: Array<{ label: string; value: string }>;
  [key: string]: any;
} & UseFormProps) {
  return (
    <FormControl component="fieldset" {...props}>
      <FormLabel component="legend">
        {longLabel ? '' : label || toTitleCase(name)}
      </FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <RadioGroup row {...field}>
            {options.map(({ label: radioLabel, value }) => (
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={radioLabel}
              />
            ))}
            <FormHelperText sx={{ color: 'error.main' }}>
              {error?.message}
            </FormHelperText>
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}

export function TextInput({
  control,
  name,
  label = undefined,
  longLabel = undefined,
  ...props
}: {
  control: UseFormReturn['control'];
  name: string;
  label?: string;
  type?: string;
  longLabel?: string;
  [key: string]: any;
} & UseFormProps) {
  return (
    <>
      {longLabel && <Typography variant="body1">{longLabel}</Typography>}
      <Controller
        key={`${name}-controller`}
        render={({
          field: { ref, value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <TextField
            {...props}
            inputRef={ref}
            key={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            {...{
              inputProps: { 'data-testid': name, ...props.inputProps },
              error: error !== undefined,
              helperText: error?.message || '',
              label: longLabel ? '' : label || toTitleCase(name),
            }}
          />
        )}
        name={name}
        control={control}
      />
    </>
  );
}
export function Form({
  name = 'Submit',
  children,
  ...props
}: {
  name: string;
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
}) {
  return (
    <form {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          padding: 0.2,
        }}
      >
        {children}
        <Button fullWidth type="submit" data-testid="submit">
          {name}
        </Button>
      </Box>
    </form>
  );
}

function SwitchInput({
  control,
  name,
  label = undefined,
  ...props
}: {
  control: UseFormReturn['control'];
  name: string;
  label?: string;
  [key: string]: any;
}) {
  return (
    <>
      <Typography> {label || toTitleCase(name)}</Typography>
      <Controller
        render={({ field }) => (
          <Switch {...field} checked={field.value} {...props} />
        )}
        name={name}
        control={control}
      />
    </>
  );
}

export function SelectInput({
  options,
  control,
  name,
  label,
  ...props
}: {
  control;
  options;
  name;
  label;
} & FormControlProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl {...props}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} size="small">
            {options.map((opt: any) => (
              <MenuItem value={typeof opt === 'object' ? opt?.value : opt}>
                {typeof opt === 'object' ? opt?.label : opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

type ControlledFormProps<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  name?: string;
  [key: string]: any;
};
export function useFormExtended<T>({
  schema,
  clearOnSubmit = false,
  ...other
}: UseFormProps<T> & { schema?: any; clearOnSubmit?: boolean }): {
  ControlledTextInput;
  ControlledRadioInput;
  ControlledForm: React.FC<ControlledFormProps<T>>;
  ControlledSwitchInput;
  ControlledMultiSelect;
  ControlledFreeSoloMultiSelect;
  ControlledAutocomplete;
  ControlledSelect;
} & UseFormReturn<T> {
  const methods = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
    ...other,
  });

  const ControlledTextInput = useCallback(
    (props) => (
      <TextInput
        control={methods.control}
        errors={methods.formState.errors}
        {...props}
      />
    ),
    [methods.control]
  );
  const ControlledMultiSelect = useCallback(
    (props) => <MultiSelect control={methods.control} {...props} />,
    [methods.control]
  );

  const ControlledFreeSoloMultiSelect = useCallback(
    (props) => <FreeSoloMultiSelect control={methods.control} {...props} />,
    [methods.control]
  );

  const ControlledAutocomplete = useCallback(
    (props) => <AutocompleteInput control={methods.control} {...props} />,
    [methods.control]
  );

  const ControlledRadioInput = useCallback(
    (props) => <RadioInput control={methods.control} {...props} />,
    [methods.control]
  );

  const ControlledSelect = useCallback(
    (props) => <SelectInput control={methods.control} {...props} />,
    [methods.control]
  );

  function ControlledForm({
    onSubmit,
    children,
    name,
    ...props
  }: ControlledFormProps<T>) {
    return (
      <Form
        onSubmit={methods.handleSubmit((...args) => {
          if (clearOnSubmit) methods.reset();
          onSubmit(...args);
        })}
        name={name}
        {...props}
      >
        {children}
      </Form>
    );
  }

  function ControlledSwitchInput(props) {
    return <SwitchInput control={methods.control} {...props} />;
  }
  return {
    ...methods,
    ControlledTextInput,
    ControlledRadioInput,
    ControlledForm,
    ControlledSelect,
    ControlledSwitchInput,
    ControlledMultiSelect,
    ControlledFreeSoloMultiSelect,
    ControlledAutocomplete,
  };
}

export type FormArgs<T> = {
  onSubmit: (props: T, event?) => void;
  defaultValues?: T;
};
