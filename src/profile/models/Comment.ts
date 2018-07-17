import { User } from './User';

export interface Comment {
    id: number;
    author: Pick<User, 'fullName' | 'avatar' | 'address'>;
    date: Date;
    text: string;
}
