import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function ProfileCard( { name , adminName } ) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Room Admin {adminName}</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    Gives room description.
                    </Card.Text>
                    <Button variant="dark">Enter Room</Button>
                </Card.Body>
            </Card>            
        </div>
    )
}

export default ProfileCard
