import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, status } from '../actions/userActions';
import Avatar from '@mui/material/Avatar';

const Header = () => {
	const dispatch = useDispatch();
	const userStatus = useSelector((state) => state.status);
	const { isLoggedIn, userInfo } = userStatus;

	const signOutDetails = useSelector((state) => state.signOut);
	const { success, error } = signOutDetails;

	useEffect(() => {
		dispatch(status());
	}, [success, error, dispatch]);

	const logoutHandler = () => {
		dispatch(signOut());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Hackathon</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav>
							<LinkContainer to='/'>
								<Nav.Link>Home</Nav.Link>
							</LinkContainer>
						</Nav>
						<Nav className='ml-auto'>
							{isLoggedIn && userInfo ? (
								<>
									{userInfo.user.photo ? (
										<Image
											className='headerImage'
											height='30'
											width='30'
											src={userInfo.user.photo}
											fluid
											rounded
										/>
									) : (
										<Avatar>
											{userInfo.user.name
												.split(' ')
												.map((el) => el[0])
												.join('')}{' '}
										</Avatar>
									)}
									<NavDropdown
										title={userInfo.user.name}
										id='username'
									>
										<LinkContainer to='/my-profile'>
											<NavDropdown.Item>
												Profile
											</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item
											onClick={logoutHandler}
										>
											Sign Out
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<>
									<LinkContainer to='/signup'>
										<Nav.Link>
											<i class='fas fa-user-plus'></i>{' '}
											Sign Up
										</Nav.Link>
									</LinkContainer>

									<LinkContainer to='/signin'>
										<Nav.Link>
											<i class='fas fa-user'></i> Sign In
										</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
