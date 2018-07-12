import * as React from 'react';
import styled, { css } from 'react-emotion';

import { margins } from 'styles/variables';
import { applyBox } from 'styles/mixins';
import { userMock } from 'mock/user';

import { ProfileAvatar } from './avatar.componen';
import { PersonalData } from './personal-data.component';
import { Statistics } from './statistics.component';
import { FollowButton } from './follow-button.component';
import { Share } from './share.component';

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
`;

export const ProfileHeader: React.SFC = () => (
    <Header>
        <Row>
            <ProfileAvatar size="big" {...userMock} />
            <PersonalData {...userMock} />
        </Row>
        <Row className={StatisticRow}>
            <Statistics {...userMock} />
            <FollowButton />
        </Row>
        <Share />
    </Header>
);
