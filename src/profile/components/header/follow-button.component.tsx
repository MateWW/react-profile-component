import * as React from 'react';
import styled from 'react-emotion';

import { fontSize, colors, breakPoint, margins } from 'styles/variables';
import { button } from 'styles/mixins';

import { ProfileContext } from '../../profile.context';
import { FollowProfile } from '../../actions/profile.actions';

const Button = styled.button`
    ${button(fontSize.small, colors.orange, colors.white)};

    ${breakPoint.mobile} {
        width: 100%;
        margin-top: ${margins.regular};
    }
`;

export const FollowButton: React.SFC = () => (
    <ProfileContext.Consumer>
        {({ events, visibleUser, currentUser }) => (
            <Button onClick={() => events(FollowProfile(visibleUser.id))} disabled={currentUser.id === visibleUser.id}>
                Follow
            </Button>
        )}
    </ProfileContext.Consumer>
);
