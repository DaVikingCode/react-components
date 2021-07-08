export declare const breakpoints: {
    sm: string;
    md: string;
    lg: string;
};
export declare const mediaQuery: (key: keyof typeof breakpoints) => (style: TemplateStringsArray | String) => string;
export declare function useMediaQuery(query: keyof typeof breakpoints): boolean;
