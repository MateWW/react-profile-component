import { Statistics } from './Statistics';

export interface User {
    id: number;
    liked: boolean;
    fullName: string;
    address: string;
    avatar: string | null;
    statistics: Statistics;
}
