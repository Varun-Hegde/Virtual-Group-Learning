import * as UserConstants from '../constants/userConstants';

//Sign Up
export const signUpReducer = (state = {}, action) => {
	switch (action.type) {
		case UserConstants.USER_SIGNUP_REQUEST:
			return {
				loading: true,
				success: false,
			};
		case UserConstants.USER_SIGNUP_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: action.payload,
			};
		case UserConstants.USER_SIGNUP_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		case UserConstants.USER_SIGNUP_RESET:
			return {};
		default:
			return state;
	}
};

//Status
export const statusReducer = (state = {}, action) => {
	switch (action.type) {
		case UserConstants.USER_STATUS_REQUEST:
			return {
				loading: true,
				isLoggedIn: false,
			};
		case UserConstants.USER_STATUS_SUCCESS:
			return {
				loading: false,
				isLoggedIn: true,
				userInfo: action.payload,
			};
		case UserConstants.USER_STATUS_FAIL:
			return {
				loading: false,
				error: action.payload,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};

//Sign In
export const signInReducer = (state = {}, action) => {
	switch (action.type) {
		case UserConstants.USER_SIGN_IN_REQUEST:
			return {
				loading: true,
				success: false,
			};
		case UserConstants.USER_SIGN_IN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
				success: true,
			};
		case UserConstants.USER_SIGN_IN_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		case UserConstants.USER_SIGN_IN_RESET:
			return {};
		default:
			return state;
	}
};

//Sign Out
export const signOutReducer = (state = {}, action) => {
	switch (action.type) {
		case UserConstants.USER_SIGN_OUT_REQUEST:
			return {
				loading: true,
				success: false,
			};
		case UserConstants.USER_SIGN_OUT_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case UserConstants.USER_SIGN_OUT_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return {};
	}
};

export const googleOauth = (state = {}, action) => {
	switch (action.type) {
		case UserConstants.USER_GOOGLE_REQUEST:
			return {
				loading: true,
			};
		case UserConstants.USER_GOOGLE_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: action.payload,
			};
		case UserConstants.USER_GOOGLE_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		default:
			return {};
	}
};

export const userDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case UserConstants.USER_DETAILS_REQUEST:
			return {
				loading: true,
			};
		case UserConstants.USER_DETAILS_SUCCESS:
			return {
				loading: false,
				success: true,
				userProfileInfo: action.payload,
			};
		case UserConstants.USER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		default:
			return state;
	}
};