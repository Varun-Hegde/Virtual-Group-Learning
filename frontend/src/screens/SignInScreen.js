import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import GoogleLogin from '../components/GoogleLoginButton';
import * as UserActions from '../actions/userActions';
import * as UserConstants from '../constants/userConstants';

const SignUpScreen = ({ location, history }) => {
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);

	const dispatch = useDispatch();
	const userSignIn = useSelector((state) => state.singIn);

	const { error, loading, userInfo, success } = userSignIn;

	const statusState = useSelector((state) => state.status);
	const { userInfo: userStatus, isLoggedIn } = statusState;

	const submitHandler = (e) => {
		e.preventDefault();
		const reqBody = {
			email,
			password,
		};

		dispatch(UserActions.signIn(reqBody));
	};
	useEffect(() => {
		if (isLoggedIn) {
			history.push(redirect);
		} else if (userInfo || userStatus || success || isLoggedIn) {
			dispatch(UserActions.status());
			dispatch({ type: UserConstants.USER_SIGN_IN_RESET });
			history.push(redirect);
		}
	}, [
		success,
		history,
		userInfo,
		isLoggedIn,
		dispatch,
		userStatus,
		redirect,
	]);
	function validate() {
		const errors = {
			email: '',
			password: '',
		};

		function validateEmail(elementValue) {
			return validator.isEmail(elementValue);
		}
		if (touchedEmail && !validateEmail(email)) {
			errors.email = 'Not a valid email';
		}
		if (touchedPassword && password.length <= 7) {
			errors.password = 'Password should be >= 8 characters';
		}

		return errors;
	}
	const errors = validate();
	return (
		<Fade bottom>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Sign In</h1>

				<Form onSubmit={submitHandler}>
					<FormGroup>
						<Label htmlFor='email'>Email</Label>
						<Input
							type='email'
							id='email'
							name='email'
							placeholder='abc@def.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={() => setTouchedEmail(true)}
							valid={errors.email === '' && email.length >= 3}
							invalid={errors.email !== ''}
						/>
						<FormFeedback>{errors.email}</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label htmlFor='password'>Password</Label>
						<Input
							type='password'
							id='password'
							name='password'
							placeholder='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onBlur={() => setTouchedPassword(true)}
							valid={
								errors.password === '' && password.length >= 8
							}
							invalid={errors.password !== ''}
						/>
						<FormFeedback>{errors.password}</FormFeedback>
					</FormGroup>

					{loading && <Loader />}
					{error && <Message variant='danger'>{error}</Message>}
					<Button
						block
						type='submit'
						color='primary'
						disabled={
							errors.email ||
							errors.password ||
							!email ||
							!password
						}
					>
						Sign In
					</Button>
				</Form>
				<center style={{ fontSize: '30px', margin: '10px' }}>OR</center>

				<div className='d-flex justify-content-around'>
					<GoogleLogin />
				</div>

				<Row className='py-3'>
					<Col>
						New Customer?{' '}
						<Link
							to={
								redirect
									? `/signup?redirect=${redirect}`
									: '/signup'
							}
						>
							Register
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</Fade>
	);
};

export default SignUpScreen;
