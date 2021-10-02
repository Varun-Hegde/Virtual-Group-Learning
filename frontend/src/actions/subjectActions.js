import axios from 'axios';

import * as SubjectConstants from '../constants/subjectConstants.js';

//Room subjects
export const roomSubjectDetails = (roomId) => async (dispatch) => {
	try {
		dispatch({
			type: SubjectConstants.ROOM_SUBJECTS_REQUEST,
		});

		const { data } = await axios.get(`/api/rooms/${roomId}/subjects`);

		dispatch({
			type: SubjectConstants.ROOM_SUBJECTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SubjectConstants.ROOM_SUBJECTS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Create subject
export const createSubject = (reqBody) => async (dispatch) => {
	try {
		dispatch({
			type: SubjectConstants.CREATE_SUBJECT_REQUEST,
		});

		const { data } = await axios.post('/api/subjects/', reqBody);

		dispatch({
			type: SubjectConstants.CREATE_SUBJECT_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: SubjectConstants.CREATE_SUBJECT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};