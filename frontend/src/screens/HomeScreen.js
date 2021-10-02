import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './HomeScreen.css';

function HomeScreen( { history } ) {

    const status = useSelector(state => state.status);
    const { loading , error , isLoggedIn , userInfo } = status;

    const createRoomHandler = () => {
        if(isLoggedIn) {
            history.push('/create_room');
        }
        else {
            history.push(`/signin?redirect=create_room`);
        }
    }

    const joinRoomHandler = () => {
        if(isLoggedIn) {
            history.push('/join_room');
        }
        else {
            history.push(`/signin?redirect=join_room`);
        }
    }

	return (
		<div className="Home">
			<h1>Virtual Group Learning</h1>
            <div className="Home_button">
                <Button variant="dark" className="Home_button_create" onClick={createRoomHandler}>Create Room</Button>
                <Button variant="dark" className="Home_button_join" onClick={joinRoomHandler}>Join Room</Button>
            </div>
		</div>
	);
}

export default HomeScreen;
