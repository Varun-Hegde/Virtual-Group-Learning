import React, { useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { Row, Col } from 'react-bootstrap';
import { getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen({ history }) {
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, userProfileInfo } = userDetails;

	const statusState = useSelector((state) => state.status);
	const { userInfo: userStatus, isLoggedIn } = statusState;

	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoggedIn) {
			history.push('/signin?redirect=/my-profile');
		}
	}, [history, isLoggedIn]);
	console.log(userProfileInfo);
	useEffect(() => {
		dispatch(getUserDetails());
	}, [dispatch]);
	return (
		<div>
			{userProfileInfo && <h1>{userProfileInfo.name}</h1>}
			<Row>
				{userProfileInfo &&
					userProfileInfo.roomsPartOf.map((room) => (
						<Col key={room._id} sm={12} md={4} lg={3}>
							<ProfileCard
								name={room.name}
								adminName={room.admin.name}
								desc={room.description}
							></ProfileCard>
						</Col>
					))}
			</Row>
		</div>
	);
}

export default ProfileScreen;
