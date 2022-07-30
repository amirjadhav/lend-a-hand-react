import { Offcanvas } from 'react-bootstrap';
import RegisterForm from '../registerForm/registerForm';

export default function RegisterSlider({ show, setShow, setIsLogin }) {
	return (
		<>
			<Offcanvas
				id='Register_Slider'
				show={show}
				onHide={(e) => {
					setShow(false);
					setIsLogin(null);
					e.preventDefault();
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Register</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<RegisterForm />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
