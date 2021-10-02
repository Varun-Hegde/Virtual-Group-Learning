import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function ProfileCard({ name, adminName, desc }) {
	return (
		<div>
			<Card>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						Room Admin {adminName}
					</Card.Subtitle>
					<Card.Text>{desc}</Card.Text>
					<Button variant='dark'>Enter Room</Button>
				</Card.Body>
			</Card>
		</div>
	);
}

export default ProfileCard;
