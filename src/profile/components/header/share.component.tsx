import * as React from 'react';
import { css } from 'react-emotion';

import { colors, margins } from 'styles/variables';

const shareButton = css`
    position: absolute;
    right: 0;
    top: 0;
    padding: ${margins.small};
    color: ${colors.orange};
    font-size: 12px;
    cursor: pointer;
`;

export const Share: React.SFC = () => <span className={shareButton + ' fas fa-share-square'} />;
