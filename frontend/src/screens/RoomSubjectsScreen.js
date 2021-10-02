import React , { useState , useEffect } from 'react';
import { roomSubjectDetails } from '../actions/subjectActions';
import ProfileCard from '../components/ProfileCard';
import { Row, Col } from 'react-bootstrap';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button } from 'react-bootstrap';
import { createSubject } from '../actions/subjectActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './RoomSubjectsScreen.css';

function RoomSubjectsScreen( { history , match } ) {

	const [subjectCode, setSubjectCode] = useState('');

	const [touchedSubjectCode, setTouchedSubjectCode] = useState(false);

    const roomSubjects = useSelector(state => state.roomSubjects);
    const { loading , error , roomSubjectsInfo } = roomSubjects;

    const statusState = useSelector((state) => state.status);
	const { userInfo: userStatus, isLoggedIn } = statusState;

	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoggedIn) {
			history.push('/signin?redirect=/');
		}
	}, [history, isLoggedIn]);

	useEffect(() => {
		dispatch(roomSubjectDetails(match.params.id));
	}, [dispatch]);

	function validate() {
		const errors = {
			subjectCode: '',
		};
		if (touchedSubjectCode && subjectCode.length === 0) {
			errors.subjectCode = `Subject Code can't be empty`;
		}

		return errors;
	}

	const submitHandler = (e) => {
		e.preventDefault();
		let reqBody = {
			name: subjectCode,
			roomId: match.params.id
		};

		dispatch(createSubject(reqBody));
	};

	const errors = validate();

    return (
        <div>
			<FormContainer>
				<Form onSubmit={submitHandler}>
					<FormGroup>
						<Label htmlFor='text'>Subject Name</Label>
						<Input
							type='text'
							id='subjectCode'
							name='subjectCode'
							placeholder='Subject Name'
							value={subjectCode}
							onChange={(e) => setSubjectCode(e.target.value)}
							onBlur={() => setTouchedSubjectCode(true)}
							valid={
								errors.subjectCode === '' && subjectCode.length >= 3
							}
							invalid={errors.subjectCode !== ''}
						/>
						<FormFeedback>{errors.subjectCode}</FormFeedback>
					</FormGroup>
					<Button
						block
						type='submit'
						color='primary'
						disabled={
							errors.subjectCode ||
							!subjectCode
						}
					>
						Create Subject
					</Button>
				</Form>
			</FormContainer>
			<Row className="RoomSubject_Subjects">
				{roomSubjectsInfo &&
					roomSubjectsInfo.data.subjects.map((subject) => (
						<Col key={subject._id} sm={12} md={4} lg={3}>
							<ProfileCard
								name={subject.name}
								adminName={subject.createdBy.name}
							></ProfileCard>
						</Col>
					))}
			</Row>            
        </div>
    )
}

export default RoomSubjectsScreen
