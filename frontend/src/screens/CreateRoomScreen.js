import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const CreateRoomScreen = () => {

	/*const [ roomname , setRoomname ] = useState('');
	const [ password , setPassword ] = useState('');

	const [ touchedEmail , setTouchedEmail ] = useState(false);
	const [ password , setTouchedPassword ] = useState(false);

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
	}*/

	return (
		<div>
			<h1>Create room</h1>
			{/*<Form>
				<FormGroup>
					<Label htmlFor='room_name'>Room name</Label>
					<Input
						type='text'
						id='room_name'
						name='room_name'
						placeholder='Hackathon'
						value={roomname}
						onChange={(e) => setRoomname(e.target.value)}
						onBlur={() => setTouchedEmail(true)}
						valid={errors.email === '' && email.length >= 3}
						invalid={errors.email !== ''}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor='password'>Password</Label>
					<Input
						type='text'
						id='password'
						name='password'
						placeholder='Hackathon@04'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onBlur={() => setTouchedEmail(true)}
						valid={errors.email === '' && email.length >= 3}
						invalid={errors.email !== ''}
					/>
				</FormGroup>
			</Form>*/}
		</div>
	);
};

export default CreateRoomScreen;
