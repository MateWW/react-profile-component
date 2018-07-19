import { User } from 'profile/models/User';

export interface UserState {
    loading: boolean;
    user: User | null;
}

export const initialUserState: UserState = {
    loading: false,
    user: null,
};
