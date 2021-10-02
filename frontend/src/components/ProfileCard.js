import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

function ProfileCard({ name, id, adminName, desc }) {

	const history = useHistory();

	const enterRoomHandler = () => {
		history.push(`/${id}/subjects`);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						Admin {adminName}
					</Card.Subtitle>
					<Card.Text>{desc}</Card.Text>
					<Button variant='dark' onClick={enterRoomHandler}>Enter</Button>
				</Card.Body>
			</Card>
		</div>
	);
}

export default ProfileCard;
