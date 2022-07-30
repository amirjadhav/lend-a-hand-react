import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button, ButtonGroup, Alert, Card } from 'react-bootstrap';
import { baseUrl } from '../../../constants/configs';
import loginImg from '../../../login.svg';

export default function RegisterForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [role, setRole] = useState('donor');
	const [certificate, setCertificate] = useState('');
	const [ngoDescription, setNgoDescription] = useState('');
	const [validated, setValidated] = useState(false);
	const [registerd, setRegistered] = useState(false);

	const radios = [
		// { name: 'Admin', value: 'admin' },
		{ name: 'NGO', value: 'ngo' },
		{ name: 'Donor', value: 'donor' }
	];

	const onNameChange = (e) => {
		setName(e.target.value);
	};
	console.log('name: ', name);

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const onPhoneChange = (e) => {
		setPhone(e.target.value);
	};

	const onAddressChange = (e) => {
		setAddress(e.target.value);
	};

	const onCertificateChange = (e) => {
		setCertificate(e.target.value);
	};

	const onDescriptionChange = (e) => {
		setNgoDescription(e.target.value);
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
				if (
					!role ||
					!email ||
					!password ||
					role === '' ||
					email === '' ||
					password === '' ||
					name === '' ||
					address === '' ||
					(role === 'ngo' ? certificate === '' : false)
				) {
					return;
				} else {
					if (!phone || phone.length !== 10) {
						alert('Invalid Phone Number');
					} else {
						const userDetails = {
							name: name,
							emailId: email,
							password: password,
							phone: phone,
							address: address,
							role: role,
							certificate: certificate,
							status: 0,
							ngoDescription: ngoDescription
						};

						const url = `${baseUrl}/user/add-user`;

						const response = await axios.post(url, userDetails);
						console.log('response: ', response);
						if (response.status === 200) {
							setRegistered(true);
						} else {
							alert('failed to register');
						}
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{registerd ? (
				<Alert variant={'success'}>Successfully Registerd!</Alert>
			) : (
				<Form id='form-registration' noValidate validated={validated}>
					<Card id='card-regisration' bg='light' style={{ width: '100%', height: '100%' }}>
						<Card.Img width='100%' height='20%' className='card-img-top' src={loginImg} />
						<Card.Body>
							<Form.Group className='mb-3 ' controlId='register-name'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									required
									type='text'
									className='border'
									placeholder='enter name'
									onChange={onNameChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a valid name.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3' controlId='register-email'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									required
									type='email'
									className='border'
									placeholder='name@example.com'
									onChange={onEmailChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a valid email.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3' controlId='register-phone'>
								<Form.Label>Phone</Form.Label>
								<Form.Control
									required
									maxlength={10}
									minlength={10}
									type='number'
									placeholder='Enter Phone'
									onChange={onPhoneChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a valid mobile number.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3' controlId='register-name'>
								<Form.Label>Address</Form.Label>
								<Form.Control
									as={'textarea'}
									required
									type='text'
									placeholder='Enter address'
									onChange={onAddressChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a valid address.
								</Form.Control.Feedback>
							</Form.Group>

							<ButtonGroup id='register-role' className='mb-3'>
								{radios.map((radio, idx) => (
									<Form.Check
										inline
										name='radio'
										label={radio.name}
										value={radio.value}
										type={'radio'}
										id={idx}
										checked={role === radio.value}
										onClick={(e) => {
											setRole(e.currentTarget.value);
										}}
									/>
								))}
							</ButtonGroup>

							{role === 'ngo' ? (
								<>
									<Form.Group className='mb-3' controlId='register-certificate'>
										<Form.Label>Certificate</Form.Label>
										<Form.Control
											required={role === 'ngo' ? true : false}
											type='url'
											className='border'
											placeholder='Enter file URI'
											onChange={onCertificateChange}
										/>
										<Form.Control.Feedback type='invalid'>
											Please provide a certificate url.
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group className='mb-3' controlId='register-name'>
										<Form.Label>Description</Form.Label>
										<Form.Control
											as={'textarea'}
											type='text'
											className='border'
											placeholder='Enter ngo` description'
											onChange={onDescriptionChange}
										/>
									</Form.Group>
								</>
							) : (
								<></>
							)}

							<Form.Group className='mb-3' controlId='register-password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									type='password'
									className='border'
									placeholder='Enter Password'
									onChange={onPasswordChange}
								/>{' '}
								<Form.Control.Feedback type='invalid'>
									Please provide a password.
								</Form.Control.Feedback>
							</Form.Group>

							<Button type='submit' onClick={handleSubmit}>
								Sign Up
							</Button>
						</Card.Body>
					</Card>
				</Form>
			)}
		</>
	);
}
