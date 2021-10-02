import * as RoomConstants from '../constants/roomConstants';

export const createRoomReducer = (state = {}, action) => {
	switch (action.type) {
		case RoomConstants.CREATE_ROOM_REQUEST:
			return {
				loading: true,
			};
		case RoomConstants.CREATE_ROOM_SUCCESS:
			return {
				loading: false,
				success: true,
				roomInfo: action.payload,
			};
		case RoomConstants.CREATE_ROOM_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		default:
			return {};
	}
};

export const joinRoomReducer = (state = {}, action) => {
	switch (action.type) {
		case RoomConstants.JOIN_ROOM_REQUEST:
			return {
				loading: true,
			};
		case RoomConstants.JOIN_ROOM_SUCCESS:
			return {
				loading: false,
				success: true,
				roomInfo: action.payload,
			};
		case RoomConstants.JOIN_ROOM_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			};
		default:
			return {};
	}
};
