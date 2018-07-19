import * as React from 'react';
import styled from 'react-emotion';

import { colors, fontSize, breakPoint } from 'styles/variables';

import { User } from '../../models/User';

type StatisticsProps = Pick<User, 'statistics'>;

const StatsContainer = styled.section`
    display: flex;
    width: 255px;
    justify-content: space-between;

    ${breakPoint.mobile} {
        width: 100%;
    }
`;

const StatsCount = styled.span`
    display: block;
    color: ${colors.orange};
    font-size: ${fontSize.big};
    line-height: 1.2em;
`;

const StatsTitle = styled.span`
    display: block;
    color: ${colors.lightGrey};
    font-size: ${fontSize.extraSmall};
    line-height: 1.2em;
`;

export const Statistics: React.SFC<StatisticsProps> = ({ statistics }) => (
    <StatsContainer>
        <p>
            <StatsCount>{statistics.likes}</StatsCount>
            <StatsTitle>Likes</StatsTitle>
        </p>
        <p>
            <StatsCount>{statistics.following}</StatsCount>
            <StatsTitle>Following</StatsTitle>
        </p>
        <p>
            <StatsCount>{statistics.followers}</StatsCount>
            <StatsTitle>Followers</StatsTitle>
        </p>
    </StatsContainer>
);
