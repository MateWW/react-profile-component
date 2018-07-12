import * as React from 'react';
import styled from 'react-emotion';

import avatar from '@assets/images/girl-photo.jpg';

const AvatarBox = styled.figure<ImageProps>(
    `
    display: flex;
    position: relative;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`,
    ({ size }) => {
        const sizePx = size === 'big' ? '70px' : '40px';
        return { width: sizePx, height: sizePx };
    },
);

export interface ImageProps {
    size: 'small' | 'big';
}

export interface ProfileAvatarProps extends ImageProps {
    fullName: string;
    address: string;
}

export const ProfileAvatar: React.SFC<ProfileAvatarProps> = ({ size, fullName, address }) => (
    <AvatarBox size={size}>
        <figcaption>{` ${fullName} ${address} - profile photo`}</figcaption>
        <img src={avatar} alt="Profile avatar" />
    </AvatarBox>
);
