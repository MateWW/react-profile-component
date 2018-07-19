import React from 'react';

import { ProfileActions } from './actions/profile.actions';
import { User } from './models/User';
import { Comment } from './models/Comment';

export interface ProfileContextValue {
    comments: {
        visible: boolean;
        total: number;
        data: Comment[];
    };
    visibleUser: User | null;
    currentUser: User | null;
    events: (action: ProfileActions) => void;
}

const initialValue: ProfileContextValue = {
    comments: {
        visible: true,
        total: 0,
        data: [],
    },
    visibleUser: null,
    currentUser: null,
    events: () => null,
};

export const ProfileContext = React.createContext<ProfileContextValue>(initialValue);
