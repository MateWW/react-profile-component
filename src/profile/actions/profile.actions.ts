import { Action, createAction } from './../models/Action';

export const LIKE_PROFILE = 'LIKE_PROFILE';
export type LikeProfileAction = Action<typeof LIKE_PROFILE, number>;
export const LikeProfile = createAction<LikeProfileAction>((profileId: number) => ({
    type: LIKE_PROFILE,
    payload: profileId,
}));

export const SHARE_PROFILE = 'SHARE_PROFILE';
export type ShareProfileAction = Action<typeof SHARE_PROFILE, number>;
export const ShareProfile = createAction<ShareProfileAction>((profileId: number) => ({
    type: SHARE_PROFILE,
    payload: profileId,
}));

export const FOLLOW_PROFILE = 'FOLLOW_PROFILE';
export type FollowProfileAction = Action<typeof FOLLOW_PROFILE, number>;
export const FollowProfile = createAction<FollowProfileAction>((profileId: number) => ({
    type: FOLLOW_PROFILE,
    payload: profileId,
}));

export const ADD_COMMENT = 'ADD_COMMENT';
export type AddCommentAction = Action<typeof ADD_COMMENT, { profileId: number; text: string }>;
export const AddProfileComment = createAction<AddCommentAction>((profileId: number, text: string) => ({
    type: ADD_COMMENT,
    payload: { profileId, text },
}));

export const LOAD_MORE = 'LOAD_MORE';
export type LoadMoreAction = Action<typeof LOAD_MORE, { profileId: number; offset: number }>;
export const LoadMore = createAction<LoadMoreAction>((profileId: number, offset: number) => ({
    type: LOAD_MORE,
    payload: { profileId, offset },
}));

export const TOGGLE_COMMENTS = 'TOGGLE_COMMENTS';
export type ToggleCommentsAction = Action<typeof TOGGLE_COMMENTS>;
export const ToggleComments = createAction<ToggleCommentsAction>(() => ({
    type: TOGGLE_COMMENTS,
}));

export type ProfileActions =
    | ShareProfileAction
    | LikeProfileAction
    | AddCommentAction
    | LoadMoreAction
    | FollowProfileAction
    | ToggleCommentsAction;
