import React from 'react';
export interface MapButtonProps {
    tooltip: string;
    children: React.ReactNode;
}
declare const MapButton: React.ForwardRefExoticComponent<MapButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default MapButton;
