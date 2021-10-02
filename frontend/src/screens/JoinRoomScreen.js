import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { joinRoom } from '../actions/roomActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import * as RoomConstants from '../constants/roomConstants';

const CreateRoomScreen = ({ history }) => {
	const [roomCode, setRoomCode] = useState('');
	const [password, setPassword] = useState('');

	const [touchedRoomCode, setTouchedRoomCode] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);

	function validate() {
		const errors = {
			roomCode: '',
			password: '',
		};
		if (touchedRoomCode && roomCode.length === 0) {
			errors.roomCode = `Room Code can't be empty`;
		}
		if (touchedPassword && password.length <= 4) {
			errors.password = 'Password should be >= 5 characters';
		}

		return errors;
	}

	const statusState = useSelector((state) => state.status);
	const { userInfo: userStatus, isLoggedIn } = statusState;

	const joinRoomState = useSelector((state) => state.joinRoom);
	const { loading, success, roomInfo, error } = joinRoomState;

	useEffect(() => {
		if (!isLoggedIn || !userStatus)
			history.push('/signin?redirect=/join-room');
	}, [isLoggedIn, userStatus, history]);

	const dispatch = useDispatch();

	useEffect(() => {
		if (success || roomInfo) {
			dispatch({ type: RoomConstants.JOIN_ROOM_RESET });
			history.push('/');
		}
	}, [success, roomInfo, history, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		let reqBody = {
			roomCode,
			password,
		};

		dispatch(joinRoom(reqBody));
	};

	const errors = validate();
	return (
		<Fade bottom>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Join Room</h1>

				<Form onSubmit={submitHandler}>
					<FormGroup>
						<Label htmlFor='text'>Room Code</Label>
						<Input
							type='text'
							id='roomCode'
							name='roomCode'
							placeholder='Room Code'
							value={roomCode}
							onChange={(e) => setRoomCode(e.target.value)}
							onBlur={() => setTouchedRoomCode(true)}
							valid={
								errors.roomCode === '' && roomCode.length >= 3
							}
							invalid={errors.roomCode !== ''}
						/>
						<FormFeedback>{errors.roomCode}</FormFeedback>
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
								errors.password === '' && password.length >= 5
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
							errors.roomCode ||
							errors.password ||
							!roomCode ||
							!password
						}
					>
						Join Room
					</Button>
				</Form>
			</FormContainer>
		</Fade>
	);
};

export default CreateRoomScreen;
