import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import PopUp from './components/PopUp';

import * as AppConstants from './constants/appConstants';
import * as UserAction from './actions/userActions';

import Header from './components/Header';
import Footer from './components/Footer';
import SignUpScreen from './screens/SignUpScreen';
import SingInScreen from './screens/SignInScreen';

function App() {
	const dispatch = useDispatch();

	const appDetail = useSelector((state) => state.appDetails);
	const { signInPopUp, signUpPopUp, signOutPopUp } = appDetail;
	useEffect(() => {
		dispatch(UserAction.status());
	}, [dispatch]);

	const popUpMsg = (displayText) => {
		toast.success(displayText, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	useEffect(() => {
		if (signInPopUp) {
			popUpMsg('Login Successfull');
			dispatch({ type: AppConstants.USER_SIGNED_IN_RESET });
		}

		if (signUpPopUp) {
			popUpMsg('Successfully created an account');
			console.log('POP UP!!');
			dispatch({ type: AppConstants.USER_SIGNED_UP_RESET });
		}
		if (signOutPopUp) {
			popUpMsg('Successfully logged out');
			dispatch({ type: AppConstants.USER_SIGNED_OUT_RESET });
		}
	}, [signInPopUp, signUpPopUp, signOutPopUp, dispatch]);

	return (
		<>
			<Router>
				<Header />
				<PopUp />
				<main className='py-3'>
					<div className='container'>
						<Switch>
							<Route
								exact
								path='/signup'
								component={SignUpScreen}
							/>
							<Route
								exact
								path='/signin'
								component={SingInScreen}
							/>
						</Switch>
					</div>
				</main>
				<Footer />
			</Router>
		</>
	);
}

export default App;