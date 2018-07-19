import { Comment } from '../profile/models/Comment';
import { UserState, initialUserState } from './UserState';

export interface State {
    comments: {
        loading: boolean;
        visible: boolean;
        total: number;
        data: Comment[];
    };
    currentUser: UserState;
    visibleUser: UserState;
}

export const initalState: State = {
    comments: {
        loading: false,
        visible: true,
        total: 0,
        data: [],
    },
    currentUser: {
        ...initialUserState,
    },
    visibleUser: {
        ...initialUserState,
    },
};
