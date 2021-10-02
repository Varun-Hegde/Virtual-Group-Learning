import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row className='d-flex flex-column'>
					<Col className='text-center pb-3'>
						<p style={{ textDecoration: 'none' }}>
							Crafted & Developed with{' '}
							<i
								style={{ color: 'red' }}
								className='fas fa-heart'
							></i>
							{''}
						</p>
						<a href='github.com'>
							<i class='fab fa-github'></i>
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
