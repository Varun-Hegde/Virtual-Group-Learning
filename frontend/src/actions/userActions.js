import axios from 'axios';

import * as UserConstants from '../constants/userConstants';
import * as AppConstants from '../constants/appConstants';

//Sign Up
export const signup = (reqBody) => async (dispatch) => {
	try {
		dispatch({
			type: UserConstants.USER_SIGNUP_REQUEST,
		});

		const { data } = await axios.post('/api/users/signup', reqBody);

		dispatch({
			type: UserConstants.USER_SIGNUP_SUCCESS,
			payload: data.data,
		});

		dispatch({
			type: AppConstants.USER_SIGNED_UP,
		});
	} catch (error) {
		dispatch({
			type: UserConstants.USER_SIGNUP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Status
export const status = () => async (dispatch) => {
	try {
		dispatch({
			type: UserConstants.USER_STATUS_REQUEST,
		});

		const { data } = await axios.get('/api/users/status');

		dispatch({
			type: UserConstants.USER_STATUS_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: UserConstants.USER_STATUS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Sign In
export const signIn = (reqBody) => async (dispatch) => {
	try {
		dispatch({
			type: UserConstants.USER_SIGN_IN_REQUEST,
		});

		const { data } = await axios.post('/api/users/login', reqBody);

		dispatch({
			type: AppConstants.USER_SIGNED_IN,
		});
		dispatch({
			type: UserConstants.USER_SIGN_IN_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: UserConstants.USER_SIGN_IN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signOut = () => async (dispatch) => {
	try {
		dispatch({
			type: UserConstants.USER_SIGN_OUT_REQUEST,
		});

		const { data } = await axios.get('/api/users/logout');

		dispatch({
			type: UserConstants.USER_SIGN_OUT_SUCCESS,
			payload: data,
		});
		dispatch({
			type: AppConstants.USER_SIGNED_OUT,
		});
	} catch (error) {
		dispatch({
			type: UserConstants.USER_SIGN_OUT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Google Sign in
export const googleOauth = (token) => async (dispatch) => {
	try {
		dispatch({
			type: UserConstants.USER_GOOGLE_REQUEST,
		});

		const { data } = await axios.post('/api/users/oauth/google', token);

		dispatch({
			type: UserConstants.USER_GOOGLE_SUCCESS,
			payload: data.data,
		});
		dispatch({
			type: AppConstants.USER_SIGNED_IN,
		});
		dispatch({
			type: UserConstants.USER_SIGN_IN_SUCCESS,
			payload: data.data,
		});
		dispatch({
			type: UserConstants.USER_SIGNUP_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: UserConstants.USER_GOOGLE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
