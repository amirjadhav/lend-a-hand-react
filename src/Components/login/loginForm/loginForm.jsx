import { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../constants/configs';
import { storeUserData } from '../../../hooks/localStorage';
import loginImg from '../../../login.svg';

export default function LoginForm({ setShow }) {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [validated, setValidated] = useState(false);

	const [userData, setUserData] = useState({});
	const [isValidUser, setIsValidUser] = useState(false);
	const [role, setRole] = useState('donor');
	const navigate = useNavigate();

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (event) => {
		try {
			const form = event.currentTarget;

			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}

			setValidated(true);

			if (validated) {
				if (!role && !email) return;
				console.log('submitting');

				const url =
					role === 'donor'
						? `${baseUrl}/user/login/donor/${email}`
						: role === 'ngo'
						? `${baseUrl}/user/login/ngo/${email}`
						: `${baseUrl}/user/login/admin/${email}`;

				const response = await axios.get(url);

				if (response.status === 200) {
					setUserData(response.data);

					if (!userData) return;
					if (response.data?.emailId === email && response.data?.password === password) {
						setIsValidUser(true);
						const obj = {
							details: userData,
							role: userData?.role,
							isLogin: true
						};

						if (userData.role === 'ngo') {
							if (userData.status === 1) {
								storeUserData(obj);

								// localStorage.setItem('userDetails',  userData?.role)
								setShow(false);
								navigate('/');

								console.log('logged in');
							} else {
								userData.status === 0
									? alert('Your Ngo is not approved yet')
									: alert('Your Ngo is rejected');
							}
						}

						if (userData.role === 'admin' || userData.role === 'donor') {
							storeUserData(obj);

							// localStorage.setItem('userDetails',  userData?.role)
							setShow(false);
							navigate('/');

							console.log('logged in');
						}
					} else {
						alert('User with this credentials does not exists');
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const type = 'radio';

	return (
		<Form id='form-login' noValidate validated={validated} onSubmit={handleSubmit}>
			<Card bg='light' style={{ width: '100%', height: '100%' }}>
				<Card.Img width='100%' height='20%' src={loginImg} />
				<Card.Body>
					<Form.Group className='mb-3' controlId='login-email'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							required
							type='email'
							placeholder='name@example.com'
							onChange={onEmailChange}
						/>
						<Form.Control.Feedback type='invalid'>
							Please provide a valid email.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className='mb-3' controlId='login-password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type='password'
							className='border'
							placeholder='Enter Password'
							onChange={onPasswordChange}
						/>
						<Form.Control.Feedback type='invalid'>Please provide a password.</Form.Control.Feedback>
					</Form.Group>

					<div key={`inline-${type}`} className='mb-3'>
						<Form.Check
							inline
							label='Admin'
							name='radio'
							value='admin'
							type={type}
							id={`inline-${type}-1`}
							checked={role === 'admin'}
							onClick={(e) => setRole(e.currentTarget.value)}
						/>
						<Form.Check
							inline
							label='NGO'
							name='radio'
							value='ngo'
							type={type}
							id={`inline-${type}-2`}
							checked={role === 'ngo'}
							onClick={(e) => setRole(e.currentTarget.value)}
						/>
						<Form.Check
							inline
							name='radio'
							label='Donor'
							value='donor'
							type={type}
							id={`inline-${type}-3`}
							checked={role === 'donor'}
							onClick={(e) => {
								setRole(e.currentTarget.value);
							}}
						/>
					</div>
					<Button type='submit' onClick={handleSubmit}>
						Submit form
					</Button>
				</Card.Body>
			</Card>
		</Form>
	);
}
