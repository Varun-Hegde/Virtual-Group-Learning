import * as SubjectConstants from '../constants/subjectConstants.js';

export const roomSubjectsReducer = (state = {}, action) => {
	switch (action.type) {
		case SubjectConstants.ROOM_SUBJECTS_REQUEST:
			return {
				loading: true,
			};
		case SubjectConstants.ROOM_SUBJECTS_SUCCESS:
			return {
				loading: false,
				success: true,
				roomSubjectsInfo: action.payload,
			};
		case SubjectConstants.ROOM_SUBJECTS_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		default:
			return state;
	}
};

export const createSubjectReducer = (state = {}, action) => {
	switch (action.type) {
		case SubjectConstants.CREATE_SUBJECT_REQUEST:
			return {
				loading: true,
			};
		case SubjectConstants.CREATE_SUBJECT_SUCCESS:
			return {
				loading: false,
				success: true,
				roomInfo: action.payload,
			};
		case SubjectConstants.CREATE_SUBJECT_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		case SubjectConstants.CREATE_SUBJECT_RESET:
			return {};
		default:
			return {};
	}
};