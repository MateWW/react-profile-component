import { Statistics } from './Statistics';

export interface User {
    id: number;
    fullName: string;
    address: string;
    avatar: string | null;
    statistics: Statistics;
}
