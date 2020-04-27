import {
    CHANGE_PASSWORD,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    CHANGE_PROFILE,
    CHANGE_AVATAR
} from 'Constants/actionTypes';

export const changePassword = (token, email, password, callback) => ({
    type: CHANGE_PASSWORD,
    payload: { token, email, password, callback }
});

export const getProfile = (userId) => ({
    type: GET_PROFILE,
    payload: { userId }
});

export const getProfileSuccess = (profile) => ({
    type: GET_PROFILE_SUCCESS,
    payload: { profile }
});

export const changeProfile = (token, firstName, lastName, email, team, organization, callback) => ({
    type: CHANGE_PROFILE,
    payload: { token, firstName, lastName, email, team, organization, callback }
});

export const changeAvatar = (avatarId, data, callback) => ({
    type: CHANGE_AVATAR,
    payload: { avatarId, data, callback }
});