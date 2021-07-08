import { useState, useEffect } from 'react';

export const breakpoints = {
    sm: 'max-width: 480px',
    md: 'max-width: 768px',
    lg: 'max-width: 993px',
    // xl: 60
};

export const mediaQuery = (key: keyof typeof breakpoints) => {
    return (style: TemplateStringsArray | String) =>
        `@media (${breakpoints[key]}) { ${style} }`;
};


export function useMediaQuery(query: keyof typeof breakpoints) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
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
