import axios from 'axios';
import config from '../config';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';

export const LOGOUT = 'signupProgress/LOGOUT';
export const NEXT_STEP = 'signupProgress/NEXT_STEP';
export const SUBMIT_HOME_INFO = 'signupProgress/SUBMIT_HOME_INFO';
export const ADD_FLOOR = 'signupProgress/ADD_FLOOR';
export const CREATE_ACCOUNT = 'signupProgress/CREATE_ACCOUNT';

const initialState = {
	step: 1,
	numFloors: '',
	floors: [],
	newUser: '',
	user: '',
	floorAdded: false
};

export default (state = initialState, action) => {
	if (action && action.error && action.payload.response.status >= 500) {
		swal(`Oops!  Something went wrong...`, 'Please try again later!');
	} else if (action.error && action.payload.response.data) {
		swal(
			action.payload.response.data.message ? action.payload.response.data.message : action.payload.response.data
		);
	} else {
		switch (action.type) {
			case LOGOUT:
				return {
					...state,
					step: 1,
					numFloors: '',
					floors: [],
					newUser: '',
					user: '',
					floorAdded: false
				};
			case NEXT_STEP:
				return {
					...state,
					step: state.step + 1
				};
			case SUBMIT_HOME_INFO:
				localStorage.setItem('new home', action.payload.data._id);
				return {
					...state,
					newHome: action.payload.data,
					homeId: action.payload.data._id
				};
			case ADD_FLOOR:
				return {
					...state,
					floors: [...state.floors, action.payload.data],
					floorAdded: true
				};
			case CREATE_ACCOUNT:
				localStorage.setItem('user token', action.payload.data.id_token);
				return {
					...state,
					newUser: action.payload.data.id_token,
					user: action.payload.data.id_token ? jwt_decode(action.payload.data.id_token) : null
				};

			default:
				return state;
		}
	}
};

export const nextStep = () => {
	return dispatch => {
		dispatch({
			type: NEXT_STEP
		});
	};
};

export const submitHomeInfo = payload => {
	const id_token = localStorage.getItem('user token');
	let promise = axios.post(`${config.ROOT_URL}/user/house`, payload, {
		headers: { Authorization: `Bearer ${id_token}` }
	});
	return dispatch => {
		dispatch({
			type: SUBMIT_HOME_INFO,
			payload: promise
		});
	};
};
export const addFloor = (houseId, payload) => {
	if (payload.rooms.length) {
		payload.rooms.map(room => delete room.key);
	}
	const id_token = localStorage.getItem('user token');
	let promise = axios.post(`${config.ROOT_URL}/house/${houseId}/floor`, payload, {
		headers: { Authorization: `Bearer ${id_token}` }
	});
	return dispatch => {
		dispatch({
			type: ADD_FLOOR,
			payload: promise
		});
	};
};
export const createAccount = payload => {
	let promise = axios.post(`${config.ROOT_URL}/user`, payload);
	return dispatch => {
		dispatch({
			type: CREATE_ACCOUNT,
			payload: promise
		});
	};
};
