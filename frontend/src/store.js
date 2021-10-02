import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as UserReducer from './reducers/userReducer';
import * as AppReducer from './reducers/appReducer';

const initialState = {};
const middleware = [thunk];

const reducer = combineReducers({
	signUp: UserReducer.signUpReducer,
	singIn: UserReducer.signInReducer,
	signOut: UserReducer.signOutReducer,
	googleSignIn: UserReducer.googleOauth,
	status: UserReducer.statusReducer,
	appDetails: AppReducer.app,
});

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
