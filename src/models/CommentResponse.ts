import { Comment } from 'profile/models/Comment';

export interface CommentsResponse {
    total: number;
    data: Comment[];
}
