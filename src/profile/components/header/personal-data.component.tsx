import * as React from 'react';
import styled from 'react-emotion';

import { User } from '../../models/User';
import { colors, fontSize, margins } from 'styles/variables';

const NameStyles = styled.h3`
    display: block;
    color: ${colors.darkBlue};
    line-height: 1.2em;
`;

const AddresStyles = styled.p`
    display: block;
    color: ${colors.lightBlue};
    font-size: ${fontSize.tiny};
    line-height: 1.2em;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: ${margins.regular};
`;

type RequiredProps = Pick<User, 'fullName' | 'address'>;

export const PersonalData: React.SFC<RequiredProps> = ({ fullName, address }) => (
    <Column>
        <NameStyles>{fullName}</NameStyles>
        <AddresStyles>{address}</AddresStyles>
    </Column>
);
