import * as React from 'react';
import styled, { css } from 'react-emotion';

import { margins, breakPoint } from 'styles/variables';
import { applyBox } from 'styles/mixins';
import { ProfileAvatar } from '../shared/avatar.componen';

import { PersonalData } from './personal-data.component';
import { Statistics } from './statistics.component';
import { FollowButton } from './follow-button.component';
import { Share } from './share.component';
import { ProfileContext } from '../../profile.context';

const Header = styled.header`
    ${applyBox()};

    position: relative;
    margin-top: ${margins.xBig};
`;

const Row = styled.div`
    display: flex;
    width: 100%;
`;

const StatisticRow = css`
    margin-top: ${margins.regular};
    justify-content: space-between;
    align-items: center;

    ${breakPoint.mobile} {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const Avatar = styled.div`
    ${breakPoint.mobile} {
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translate(-50%, 20%);
    }
`;

export const ProfileHeader: React.SFC = () => (
    <ProfileContext.Consumer>
        {({ visibleUser }) => (
            <Header>
                <Row>
                    <Avatar>
                        <ProfileAvatar size="big" {...visibleUser} />
                    </Avatar>
                    <PersonalData />
                </Row>
                <Row className={StatisticRow}>
                    <Statistics {...visibleUser} />
                    <FollowButton />
                </Row>
                <Share />
            </Header>
        )}
    </ProfileContext.Consumer>
);
