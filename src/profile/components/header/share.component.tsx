import * as React from 'react';
import styled from 'react-emotion';

import { colors, margins } from 'styles/variables';

import { ProfileContext } from '../../profile.context';
import { ShareProfile } from '../../actions/profile.actions';

const ShareButton = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    padding: ${margins.small};
    color: ${colors.orange};
    font-size: 12px;
    cursor: pointer;
`;

export const Share: React.SFC = () => (
    <ProfileContext.Consumer>
        {({ events, visibleUser }) => (
            <ShareButton className="fas fa-share-square" onClick={() => events(ShareProfile(visibleUser.id))} />
        )}
    </ProfileContext.Consumer>
);
