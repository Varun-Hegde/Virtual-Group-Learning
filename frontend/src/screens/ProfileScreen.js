import React , { useEffect } from 'react'
import ProfileCard from '../components/ProfileCard'
import Row from 'react-bootstrap/Row'
import { getUserDetails } from '../actions/userActions'
import { useDispatch , useSelector } from 'react-redux'

function ProfileScreen( { history } ) {

    const userDetails = useSelector(state => state.userDetails);
    const { loading , error , userProfileInfo } = userDetails;

    const statusState = useSelector((state) => state.status);
	const { userInfo: userStatus, isLoggedIn } = statusState;

    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getUserDetails());
        }
        else {
            history.push('/signin?redirect=/profile');
        }
    })

    return (
        <div>
            { userProfileInfo && userProfileInfo.roomsPartOf.map(room => {
                return (
                    <Row xs={1} md={2} className="g-4">
                        <ProfileCard name={room.name} adminName={room.admin}></ProfileCard>
                    </Row>
                )
            }  
            )}
        </div>
    )
}

export default ProfileScreen
