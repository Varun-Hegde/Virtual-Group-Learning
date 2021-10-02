import React from 'react';
import Loader from 'react-loader-spinner';

export default class App extends React.Component {
	//other logic
	render() {
		return (
			<Loader
				type='Bars'
				color='rgb(126, 124, 143)'
				height={100}
				width={100}
				style={{
					width: '100px',
					height: '100px',
					margin: 'auto',
					display: 'block',
				}}
			/>
		);
	}
}
