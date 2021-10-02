import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { googleOauth } from '../actions/userActions';
import { Button } from 'react-bootstrap';

const GoogleLoginButton = () => {
	const dispatch = useDispatch();
	const responseGoogle = (res) => {
		const data = {
			access_token: res.accessToken,
		};

		dispatch(googleOauth(data));
	};

	return (
		<>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				className='google'
			/>
		</>
	);
};

export default GoogleLoginButton;
