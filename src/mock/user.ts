import avatar from '@assets/images/girl-photo.jpg';

import { User } from './../profile/models/User';

export const userMock: User = {
    id: 0,
    fullName: 'Sabine Sabriye',
    address: 'New York, USA',
    avatar,
    statistics: {
        likes: 121,
        following: 723,
        followers: 4433,
    },
};
