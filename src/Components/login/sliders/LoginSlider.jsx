import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import LoginComponent from '../loginForm/loginForm';

export default function LoginSlider({ show, setShow, setIsLogin }) {
	const [showCanvas, setShowCancvas] = useState(show);
	return (
		<>
			<Offcanvas
				show={show}
				onHide={(e) => {
					setShow(false);
					setIsLogin(null);
					e.preventDefault();
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Login</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<LoginComponent setShow={setShow} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
