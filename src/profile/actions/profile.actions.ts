import { Action } from './../models/Action';

const LIKE_PROFILE = 'LIKE_PROFILE';
export type LikeProfileAction = Action<typeof LIKE_PROFILE, number>;
const LikeProfile = (profileId: number) => ({ type: LIKE_PROFILE, payload: profileId });

const SHARE_PROFILE = 'SHARE_PROFILE';
export type ShareProfileAction = Action<typeof SHARE_PROFILE, number>;
const ShareProfile = (profileId: number) => ({ type: SHARE_PROFILE, payload: profileId });

export type ProfileAction = ShareProfileAction | LikeProfileAction;
