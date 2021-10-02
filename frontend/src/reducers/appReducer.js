import * as AppConstants from '../constants/appConstants';

export const app = (state = {}, action) => {
	switch (action.type) {
		case AppConstants.USER_SIGNED_IN:
			return {
				...state,
				signInPopUp: true,
			};
		case AppConstants.USER_SIGNED_IN_RESET:
			return {
				...state,
				signInPopUp: false,
			};
		case AppConstants.USER_SIGNED_UP:
			return {
				...state,
				signUpPopUp: true,
			};
		case AppConstants.USER_SIGNED_UP_RESET:
			return {
				...state,
				signUpPopUp: false,
			};
		case AppConstants.USER_SIGNED_OUT:
			return {
				...state,
				signOutPopUp: true,
			};
		case AppConstants.USER_SIGNED_OUT_RESET:
			return {
				...state,
				signOutPopUp: false,
			};
		default:
			return state;
	}
};
