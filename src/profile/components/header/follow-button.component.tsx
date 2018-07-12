import * as React from 'react';
import styled from 'react-emotion';
import { fontSize, colors } from 'styles/variables';
import { button } from 'styles/mixins';

export interface FollowButtonProps {
    follow?: () => void;
}

const Button = styled.button`
    ${button(fontSize.small, colors.orange, colors.white)};
`;

export const FollowButton: React.SFC<FollowButtonProps> = ({ follow }) => <Button>Follow</Button>;
