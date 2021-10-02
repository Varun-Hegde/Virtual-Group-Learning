import axios from 'axios';

import * as RoomConstants from '../constants/roomConstants.js';

//Create room
export const createRoom = (reqBody) => async (dispatch) => {
	try {
		dispatch({
			type: RoomConstants.CREATE_ROOM_REQUEST,
		});

		const { data } = await axios.post('/api/rooms/create', reqBody);

		dispatch({
			type: RoomConstants.CREATE_ROOM_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: RoomConstants.CREATE_ROOM_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//JOIN room
export const joinRoom = (reqBody) => async (dispatch) => {
	try {
		dispatch({
			type: RoomConstants.JOIN_ROOM_REQUEST,
		});

		const { data } = await axios.post('/api/rooms/join', reqBody);

		dispatch({
			type: RoomConstants.JOIN_ROOM_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: RoomConstants.JOIN_ROOM_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
