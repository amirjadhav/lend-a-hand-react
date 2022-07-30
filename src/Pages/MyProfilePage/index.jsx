import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import { baseUrl } from '../../constants/configs';
import getUser from '../../utils/getUser';
import { storeUserData } from '../../hooks/localStorage';
import backgroundImg from '../../img/img1.jpeg';

export default function MyProfile() {
	const user = getUser();
	console.log('user: ', user);
	const [validated, setValidated] = useState(false);
	const [name, setName] = useState(user ? user.name : null);
	const [phone, setPhone] = useState(user ? user.phone : null);
	const [address, setAddress] = useState(user ? user.address : null);
	const [updated, setUpdated] = useState(false);

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	const onPhoneChange = (e) => {
		setPhone(e.target.value);
	};
	const onAddressChange = (e) => {
		setAddress(e.target.value);
	};

	const handleSubmit = async (event) => {
		try {
			const form = event.currentTarget;

			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}

			setValidated(true);

			if (!name || !phone || !address || !validated) return null;

			const data = {
				id: Number(user.id),
				name: String(name),
				emailId: String(user.email),
				password: String(user.password),
				phone: String(phone),
				address: String(address),
				role: String(user.role),
				certificate: String(user.certificate),
				status: Number(user.status),
				ngoDescription: String(user.ngoDescription)
			};

			const url = `${baseUrl}/user/`;
			const response = await axios.put(url, data);
			console.log('response: ', response);
			if (response.status === 200) {
				const obj = {
					details: response.data,
					role: response.data?.role,
					isLogin: true
				};

				storeUserData(obj);
				alert('Successfully updated!');
			} else {
				alert('failed to get requirements');
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log();
	return (
		<>
			<Container
				fluid
				style={{
					height: '100%',
					backgroundImage:
						'url("https://www.azdo.ly/wp-content/uploads/2020/03/ngos-hero-background.jpg")'
				}}
			>
				<h2 style={{ marginTop: '2rem' }}>Update Profile</h2>
				<Form id='form-udpate' noValidate validated={validated}>
					<Card
						style={{
							boxShadow: '10px 10px 10px',
							width: '50%',
							height: '100%',
							marginTop: '2rem',
							border: 'secondary',
							display: 'flex'
						}}
					>
						<Card.Body>
							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Full Name:</Form.Label>
								<Form.Control
									value={name}
									type='text'
									style={{ height: '4rem' }}
									placeholder='Enter your full name'
									onChange={onNameChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a valid name.
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Email address:</Form.Label>
								<Form.Control
									value={user.email ? user.email : 'No email provided'}
									type='email'
									style={{ height: '4rem' }}
									readOnly
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a valid email.
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Phone Number:</Form.Label>
								<Form.Control
									value={phone}
									minLength={10}
									maxLength={10}
									style={{ height: '4rem' }}
									type='number'
									placeholder='Enter your your Phone Number'
									onChange={onPhoneChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a phone number.
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Address:</Form.Label>
								<Form.Control
									value={address}
									style={{ height: '4rem' }}
									type='text'
									placeholder='Enter your your address'
									onChange={onAddressChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide an address.
								</Form.Control.Feedback>
							</Form.Group>
						</Card.Body>
						<Card.Footer>
							<Button variant='primary' onClick={handleSubmit}>
								Update Changes
							</Button>
						</Card.Footer>
					</Card>
				</Form>
			</Container>
		</>
	);
}
