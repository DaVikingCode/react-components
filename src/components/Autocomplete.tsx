import React from 'react';
import { AutocompleteProps as MatAutocompleteProps, Autocomplete as MatAutoComplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { LinearProgress, TextField, TextFieldProps } from '@material-ui/core';
import styled from 'styled-components';

const BootstrapTextField = styled(TextField)`
    & > .MuiInputBase-root {
        padding-top: 0;
        padding-bottom: 0;
    }

    & > .MuiInputBase-root > fieldset {
        top: 0;
        border: 1px solid #ced4da;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    & > .MuiInputBase-root > fieldset > legend {
        display: none;
    }

    &:focus-within > .MuiInputBase-root > fieldset {
        box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
        border-width: 1px;
        border-color: #399fff;
    }
`;

const InputProgress = styled(LinearProgress)`
    position: absolute;
    bottom: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    left: 0;
`;

// Redecalare forwardRef
declare module "react" {
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}


export interface AutocompleteProps<
    Data,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
    >
    extends Omit<MatAutocompleteProps<Data, Multiple, DisableClearable, FreeSolo>, 'options' | 'renderInput'> {
    asyncSearchFn: (value: string) => Promise<Data[]>;
    label: string;
    TextFieldProps?: TextFieldProps;
    options?: Data[];
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

type CancellablePromise<T> = Promise<T> & { cancel?: () => void };

function AutocompleteInner<
    Data,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(
    { asyncSearchFn, label, TextFieldProps, ...props }: AutocompleteProps<Data, Multiple, DisableClearable, FreeSolo>,
    ref: React.ForwardedRef<unknown>
) {
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<Data[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const [dirty, setDirty] = React.useState(false);

    const renderInput = (params: AutocompleteRenderInputParams) => <>
        <BootstrapTextField
            {...params}
            {...TextFieldProps}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
        >
        </BootstrapTextField>
        {(loading && focused && dirty) && <InputProgress />}
    </>;

    React.useEffect(() => {
        setLoading(true);
        const promise: CancellablePromise<void> = asyncSearchFn(inputValue)
            .then((options) => {
                if (options !== undefined && Array.isArray(options)) {
                    setOptions(options);
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch(error => {
                console.error(error);
                setError(true);
            }).finally(() => {
                setLoading(false);
            });
        return () => {
            (promise.cancel && promise.cancel());
        };
    }, [inputValue, asyncSearchFn]);

    return <MatAutoComplete
        {...props}
        size="small"
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) => {
            setInputValue(newInputValue);
            setDirty(true);
            (props.onInputChange && props.onInputChange(event, newInputValue, reason)) // Lift the event up if needed
        }}
        onChange={(...args) => {
            setDirty(false);
            (props.onChange && props.onChange(...args)); // Lift the event up if needed
        }}
        loading={loading}
        options={options}
        renderInput={renderInput}
    />;
}

export const Autocomplete = React.forwardRef(AutocompleteInner);

export default Autocomplete;