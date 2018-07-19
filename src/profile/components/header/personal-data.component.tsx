import * as React from 'react';
import styled from 'react-emotion';

import { colors, fontSize, margins, breakPoint } from 'styles/variables';

import { ProfileContext } from '../../profile.context';
import { LikeProfile } from '../../actions/profile.actions';

const NameStyles = styled.h3`
    display: block;
    color: ${colors.darkBlue};
    line-height: 1.2em;

    ${breakPoint.mobile} {
        text-align: center;
    }
`;

const AddresStyles = styled.p`
    display: block;
    color: ${colors.lightBlue};
    font-size: ${fontSize.tiny};
    line-height: 1.2em;

    ${breakPoint.mobile} {
        text-align: center;
    }
`;

const Column = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    margin-left: ${margins.regular};

    ${breakPoint.mobile} {
        margin: 0 auto;
    }
`;

interface LikeHearthProps {
    active?: boolean;
    disabled?: boolean;
}

const LikeHeart = styled.span<LikeHearthProps>(
    `
    cursor: pointer;
    margin-left: ${margins.small};
    font-size: ${fontSize.tiny};
`,
    ({ active, disabled }) => {
        if (disabled) {
            return `color: ${colors.disabledHearth}`;
        }
        return `color: ${active ? colors.activeHearth : colors.disabledHearth}`;
    },
);

export const PersonalData: React.SFC = () => (
    <ProfileContext.Consumer>
        {({ events, visibleUser, currentUser }) => (
            <Column>
                <NameStyles>
                    {visibleUser.fullName}
                    <LikeHeart
                        onClick={() => events(LikeProfile(visibleUser.id))}
                        className="far fa-heart"
                        active={visibleUser.liked}
                        disabled={visibleUser.id === currentUser.id}
                    />
                </NameStyles>
                <AddresStyles>{visibleUser.address}</AddresStyles>
            </Column>
        )}
    </ProfileContext.Consumer>
);
