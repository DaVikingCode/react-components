import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, IconButton, InputBase, Popover } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// TODO: Slot this one
// import ChantierFilterUrlEditor from "../../entry-components/ChantierFilterUrlEditor";
import AppIcon from "./AppIcon";
const SearchInput = styled(InputBase) `
    width: 188px;
    transition: width 75ms ease-in-out;

    input {
        color: white;
    }

    input::placeholder {
        color: rgba(255, 255, 255, 124);
    }
`;
const SearchInputWrapper = styled.div `
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    width: max-content;
    border-radius: 2px;
    padding-left: 8px;
    height: 32px;
    transition: height 75ms ease-in-out;

    &:focus-within {
        background: rgba(255, 255, 255, 0.5);
        height: 40px;
    }
`;
const FilterDropDown = ({ FilterForm, ...props }) => {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    return _jsxs(_Fragment, { children: [_jsx(IconButton, Object.assign({ ref: btnRef, size: 'small', style: { color: 'inherit' }, onClick: () => setOpen(true) }, props, { children: _jsx(AppIcon, { name: 'filter-variant' }, void 0) }), void 0), _jsx(Popover, Object.assign({ open: open, anchorEl: btnRef.current, onClose: () => setOpen(false) }, { children: FilterForm }), void 0)] }, void 0);
};
const SearchBar = React.forwardRef(({ onClear, FilterForm, defaultValue, ...props }, ref) => {
    const [searchEmpty, setSearchEmpty] = useState(() => !defaultValue || defaultValue === '');
    const inputRef = useRef(null);
    // TODO: Props clear event instead
    const handleClick = () => {
        if (inputRef?.current?.value && inputRef?.current.value !== '' && onClear) {
            // Clear
            onClear();
        }
        else {
            inputRef?.current?.focus();
        }
    };
    useEffect(() => {
        ref = inputRef;
    }, [ref]);
    return _jsxs(SearchInputWrapper, { children: [_jsx(SearchInput, Object.assign({}, props, { onInput: e => { setSearchEmpty(inputRef.current === null || inputRef.current?.value === ''); props.onInput && props.onInput(e); }, inputRef: inputRef, inputProps: { 'aria-label': 'search' } }), void 0), _jsx(IconButton, Object.assign({ onClick: handleClick, color: "inherit", size: 'small' }, { children: _jsx(AppIcon, { name: searchEmpty ? 'magnify' : 'close' }, void 0) }), void 0), _jsx(Divider, { orientation: "vertical", flexItem: true }, void 0), FilterForm && _jsx(FilterDropDown, { FilterForm: FilterForm }, void 0)] }, void 0);
});
export default SearchBar;
