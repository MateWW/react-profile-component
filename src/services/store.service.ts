import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'profile/models/User';
import { ProfileActions, LIKE_PROFILE, LOAD_MORE, ADD_COMMENT, TOGGLE_COMMENTS } from 'profile/actions/profile.actions';
import { Comment, createComment } from 'profile/models/Comment';

import { initalState, State } from 'models/State';
import { HttpService } from './http.service';
import { CommentsResponse } from 'models/CommentResponse';

const urls = {
    user: `/api/user/`,
    comments: `/api/comments/`,
    commentAdd: `/api/comments/add`,
    like: `/api/like/`,
};

export class Store {
    private state$ = new BehaviorSubject<State>(initalState);
    private httpService = new HttpService();

    constructor() {
        this.loadCurrentUser();
    }

    public getState(): Observable<State> {
        return this.state$.asObservable();
    }

    public dispatch(action: ProfileActions): void {
        switch (action.type) {
            case TOGGLE_COMMENTS:
                return this.toggleComments();
            case ADD_COMMENT:
                return this.addComment(action.payload.text);
            case LOAD_MORE:
                return this.loadComments(action.payload.profileId, action.payload.offset);
            case LIKE_PROFILE:
                return this.likeProfile(action.payload);
            default:
        }
    }

    public loadCurrentUser(): void {
        const { currentUser } = this.state$.getValue();
        if (!currentUser.loading) {
            this.setState(state => ({ ...state, currentUser: { ...state.currentUser, loading: true } }));
            this.httpService.get<User>(urls.user).subscribe(user => {
                this.setState(state => ({ ...state, currentUser: { loading: false, user } }));
                this.loadComments(user.id, 0);
                this.loadUser(user.id + 1);
            });
        }
    }

    public loadUser(id: number): void {
        const { visibleUser } = this.state$.getValue();
        if (!visibleUser.loading) {
            this.setState(state => ({ ...state, visibleUser: { ...state.visibleUser, loading: true } }));
            this.httpService
                .get<User>(`${urls.user}${id}/`)
                .subscribe(user => this.setState(state => ({ ...state, visibleUser: { loading: false, user } })));
        }
    }

    public likeProfile(id: number): void {
        this.httpService
            .get<User>(`${urls.like}${id}/`)
            .subscribe(user => this.setState(state => ({ ...state, visibleUser: { loading: false, user } })));
    }

    public loadComments(id: number, offset: number): void {
        const currentState = this.state$.getValue();
        if (!currentState.comments.loading) {
            this.setState(state => ({
                ...state,
                comments: { ...state.comments, loading: true },
            }));
            this.httpService
                .get<CommentsResponse>(`${urls.comments}${id}/`, { offset: `${offset}` })
                .pipe(map(({ total, data }) => ({ total, data: data.map(comment => createComment(comment)) })))
                .subscribe(({ total, data }) =>
                    this.setState(({ comments, ...state }) => ({
                        ...state,
                        comments: { ...comments, loading: false, total, data: [...comments.data, ...data] },
                    })),
                );
        }
    }

    public addComment(text: string): void {
        this.httpService
            .post<Comment>(urls.commentAdd, { text })
            .pipe(map(comment => createComment(comment)))
            .subscribe(comment =>
                this.setState(({ comments, ...state }) => ({
                    ...state,
                    comments: {
                        ...comments,
                        total: comments.total + 1,
                        loading: false,
                        data: [...comments.data, comment],
                    },
                })),
            );
    }

    public toggleComments(): void {
        this.setState(({ comments, ...state }) => ({
            ...state,
            comments: { ...comments, visible: !comments.visible },
        }));
    }

    private setState(fn: (state: State) => State): void {
        const value = this.state$.getValue();
        this.state$.next(fn(value));
    }
}
