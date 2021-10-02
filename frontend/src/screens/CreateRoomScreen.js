import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { createRoom } from '../actions/roomActions';
import * as RoomConstants from '../constants/roomConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CreateRoomScreen = ({ history }) => {
	const [roomCode, setRoomCode] = useState('');
	const [password, setPassword] = useState('');
	const [description, setDesc] = useState('');

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

	useEffect(() => {
		if (!isLoggedIn || !userStatus)
			history.push('/signin?redirect=/create-room');
	}, [isLoggedIn, userStatus, history]);

	const dispatch = useDispatch();

	const createRoomState = useSelector((state) => state.createRoom);
	const { loading, success, roomInfo, error } = createRoomState;

	const submitHandler = (e) => {
		e.preventDefault();
		let reqBody = {
			name: roomCode,
			password,
			description,
		};

		dispatch(createRoom(reqBody));
	};

	useEffect(() => {
		if (success || roomInfo) {
			dispatch({ type: RoomConstants.CREATE_ROOM_RESET });
			history.push('/');
		}
	}, [success, roomInfo, history, dispatch]);

	const errors = validate();
	return (
		<Fade bottom>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Create Room</h1>

				<Form onSubmit={submitHandler}>
					<FormGroup>
						<Label htmlFor='text'>Room Name</Label>
						<Input
							type='text'
							id='roomCode'
							name='roomCode'
							placeholder='Room Name'
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
					<FormGroup>
						<Label htmlFor='desc' id='desc'>
							Description
						</Label>
						<Input
							type='textarea'
							name='desc'
							id='desc'
							placeholder='Campground description'
							value={description}
							onChange={(e) => setDesc(e.target.value)}
						/>
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
						Create Room
					</Button>
				</Form>
			</FormContainer>
		</Fade>
	);
};

export default CreateRoomScreen;
