import {
  Divider,
  IconButton,
  InputBase,
  InputBaseProps,
  Popover,
} from "@material-ui/core";
import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SearchInput = styled(InputBase)`
  width: 188px;
  transition: width 75ms ease-in-out;

  input {
    color: black;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 124);
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: rgba(240, 240, 240, 0.2);
  color: white;
  width: max-content;
  border-radius: 2px;
  padding-left: 8px;
  height: 32px;
  transition: height 75ms ease-in-out;

  &:focus-within {
    background: rgba(240, 240, 240, 0.5);
    height: 40px;
  }
`;

const FilterDropDown: FC<{
  FilterForm?: React.ReactNode;
}> = ({ FilterForm, ...props }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        size="small"
        style={{ color: "inherit" }}
        onClick={() => setOpen(true)}
        {...props}
      >
        <AppIcon name="filter-variant" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={btnRef.current}
        onClose={() => setOpen(false)}
      >
        {FilterForm}
      </Popover>
    </>
  );
};

export interface SearchBarProps extends InputBaseProps {
  /**
   * Called when the user clicks on the clear button.
   */
  onClear?: Function;

  /**
   * The form to use in the filter dropdown
   */
  FilterForm?: React.ReactNode;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onClear, FilterForm, defaultValue, ...props }, ref) => {
    const [searchEmpty, setSearchEmpty] = useState(
      () => !defaultValue || defaultValue === ""
    );
    const inputRef = useRef<HTMLInputElement>(null);

    // TODO: Props clear event instead
    const handleClick = () => {
      if (
        inputRef?.current?.value &&
        inputRef?.current.value !== "" &&
        onClear
      ) {
        // Clear
        onClear();
      } else {
        inputRef?.current?.focus();
      }
    };

    useEffect(() => {
      ref = inputRef;
    }, [ref]);

    return (
      <SearchInputWrapper>
        <SearchInput
          {...props}
          onInput={(e) => {
            setSearchEmpty(
              inputRef.current === null || inputRef.current?.value === ""
            );
            props.onInput && props.onInput(e);
          }}
          inputRef={inputRef}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton onClick={handleClick} color="inherit" size="small">
          <AppIcon name={searchEmpty ? "magnify" : "close"} />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        {FilterForm && <FilterDropDown FilterForm={FilterForm} />}
      </SearchInputWrapper>
    );
  }
);

export default SearchBar;
