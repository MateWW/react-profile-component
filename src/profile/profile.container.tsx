import * as React from 'react';
import styled from 'react-emotion';

import { maxContainerWith, colors, borderRadius, margins } from 'styles/variables';
import { applyFontDefault } from 'styles/mixins';

import { ProfileHeader } from './components/header/header.component';
import { ProfileComments } from './components/comments/comments.component';

const Wrapper = styled.section`
    ${applyFontDefault()};

    width: 100%;
    max-width: ${maxContainerWith};
    margin: 0 auto;
    padding: 0 ${margins.regular};
    box-sizing: border-box;
`;

const TopBar = styled.div`
    width: 100%;
    height: 95px;
    margin-bottom: -95px;
    background: ${colors.darkBlue};
    border-radius: ${borderRadius.small} ${borderRadius.small} 0 0;
`;

export class ProfileContainer extends React.Component {
    public render(): JSX.Element {
        return (
            <div>
                <TopBar />
                <Wrapper>
                    <ProfileHeader />
                    <ProfileComments />
                </Wrapper>
            </div>
        );
    }
}
