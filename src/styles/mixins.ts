import { LightenDarkenColor } from 'helpers/LightenDarkenColor';

import { fontSize, colors, shadow, margins, borderRadius } from './variables';

export const applyFontDefault = () => `
    font-family: 'Montserrat', sans-serif;
    font-size: ${fontSize.basic}
`;

export const applyBox = () => `
    padding: ${margins.regular};
    border-radius: ${borderRadius.small};
    background: ${colors.white};
    box-shadow: ${shadow.boxShadow};
    box-sizing: border-box;
`;

export type ButtonMixin = (size: string, background: string, color: string) => string;

export const button: ButtonMixin = (size, bg, color) => `
    padding: ${size} ${margins.regular};
    border: 0;
    border-radius: ${borderRadius.buttons};
    background: ${bg};
    font-size: ${size};
    color: ${color};
    letter-spacing: 4.2px;
    line-height: 1.3rem;
    cursor: pointer;
    text-transform: uppercase;
    transition: .3s background;

    &:hover {
        background: ${LightenDarkenColor(bg, -15)};
    }
`;
