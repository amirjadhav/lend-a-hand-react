import React from 'react';
import { Image } from 'react-bootstrap';
import loginImg from '../../img/img1.jpeg';

function HomePage(props) {
	return (
		<>
			<h1>Home Page</h1>
			<Image height={'100%'} width={'100%'} src={loginImg} />
		</>
	);
}
export default HomePage;
