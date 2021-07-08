'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var core = require('@material-ui/core');
var styled = require('styled-components');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Icon = styled__default['default'](core.Icon) `
    line-height: 100%;
    width: ${p => p.size};
    height: ${p => p.size};
    font-size: ${p => p.size};
`;
const AppIcon = ({ name, className, size = '24px', ...rest }) => jsxRuntime.jsx(Icon, Object.assign({}, rest, { size: size, className: `${className} mdi mdi-${name}` }), void 0);

const MapButtonWrapper = styled__default['default'].button `
    box-shadow: 0px 0px 0px 1px var(--clr-grey-25, #d9dfe5);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--clr-white, white);
    color: #4C5761;
    height: 40px;
    min-width: 40px;
    border-radius: 2px;
    & > * {
        font-size: 24px;
    }
    &:hover {
        background-color: var(--clr-light-grey-25, #e5e8eb);
    }
    &:active {
        background-color: var(--clr-light-grey-50, #cbd1d6);
    }
`;
React__default['default'].forwardRef(({ children, tooltip, ...props }, ref) => {
    return jsxRuntime.jsx(core.Tooltip, Object.assign({ title: tooltip, enterDelay: 200 }, { children: jsxRuntime.jsx(MapButtonWrapper, Object.assign({ ref: ref }, props, { children: children }), void 0) }), void 0);
});

styled__default['default'].div `
    text-align: center;
    margin: 32px 16px;
`;
styled__default['default'].ul `
    list-style: none;
    padding: 0;
    margin: 0;
`;

const SearchInput = styled__default['default'](core.InputBase) `
    width: 188px;
    transition: width 75ms ease-in-out;

    input {
        color: white;
    }

    input::placeholder {
        color: rgba(255, 255, 255, 124);
    }
`;
const SearchInputWrapper = styled__default['default'].div `
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
    const [open, setOpen] = React.useState(false);
    const btnRef = React.useRef(null);
    return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(core.IconButton, Object.assign({ ref: btnRef, size: 'small', style: { color: 'inherit' }, onClick: () => setOpen(true) }, props, { children: jsxRuntime.jsx(AppIcon, { name: 'filter-variant' }, void 0) }), void 0), jsxRuntime.jsx(core.Popover, Object.assign({ open: open, anchorEl: btnRef.current, onClose: () => setOpen(false) }, { children: FilterForm }), void 0)] }, void 0);
};
React__default['default'].forwardRef(({ onClear, FilterForm, defaultValue, ...props }, ref) => {
    const [searchEmpty, setSearchEmpty] = React.useState(() => !defaultValue || defaultValue === '');
    const inputRef = React.useRef(null);
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
    React.useEffect(() => {
        ref = inputRef;
    }, [ref]);
    return jsxRuntime.jsxs(SearchInputWrapper, { children: [jsxRuntime.jsx(SearchInput, Object.assign({}, props, { onInput: e => { setSearchEmpty(inputRef.current === null || inputRef.current?.value === ''); props.onInput && props.onInput(e); }, inputRef: inputRef, inputProps: { 'aria-label': 'search' } }), void 0), jsxRuntime.jsx(core.IconButton, Object.assign({ onClick: handleClick, color: "inherit", size: 'small' }, { children: jsxRuntime.jsx(AppIcon, { name: searchEmpty ? 'magnify' : 'close' }, void 0) }), void 0), jsxRuntime.jsx(core.Divider, { orientation: "vertical", flexItem: true }, void 0), FilterForm && jsxRuntime.jsx(FilterDropDown, { FilterForm: FilterForm }, void 0)] }, void 0);
});

const breakpoints = {
    sm: 'max-width: 480px',
    md: 'max-width: 768px',
    lg: 'max-width: 993px',
    // xl: 60
};
const mediaQuery = (key) => {
    return (style) => `@media (${breakpoints[key]}) { ${style} }`;
};
function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(false);
    React.useEffect(() => {
        const media = window.matchMedia(`(${breakpoints[query]})`);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            setMatches(media.matches);
        };
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);
    return matches;
}

styled__default['default'].div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
`;
styled__default['default'].aside `
    display: flex;
    flex-direction: column;
    z-index: 2;
    background: white;
    height: 100%;
    overflow-x: hidden;
    transition: width 125ms ease-in;
    width: ${p => p.closed ? '0px' : '320px'};
    box-shadow: ${p => p.closed ? '' : '1px 0px 4px 1px #bbb'};

    /* Override so the sidebar takes all screen on mobile */
    ${p => p.closed
    ? mediaQuery('sm') `width: 0px`
    : mediaQuery('sm') `width: 100vw`}
`;

exports.breakpoints = breakpoints;
exports.mediaQuery = mediaQuery;
exports.useMediaQuery = useMediaQuery;
