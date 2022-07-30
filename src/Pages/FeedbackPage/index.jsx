import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { baseUrl } from '../../constants/configs';
import getUser from '../../utils/getUser';
import backgroundImage from '../../img/img1.jpeg';

export default function FeedbackPage() {
	const user = getUser();
	console.log('user: ', user);
	const [validated, setValidated] = useState(false);
	const [name, setName] = useState(user ? user.name : null);
	const [email, setEmail] = useState(user ? user.email : null);
	const [message, setMessage] = useState('');
	const [subject, setSubject] = useState('');

	const onMessageChange = (e) => {
		setMessage(e.target.value);
	};
	const onSubjectChange = (e) => {
		setSubject(e.target.value);
	};

	const handleSubmit = async (event) => {
		try {
			const form = event.currentTarget;

			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}

			setValidated(true);

			if (!name || !email || !message || !subject || !validated) return null;

			const data = {
				name: name,
				email: email,
				subject: subject,
				description: message
			};

			const url = `${baseUrl}/feedback/`;
			const response = await axios.post(url, data);
			console.log('response: ', response);
			if (response.status === 200) {
				alert('Successfully submitted!');
			} else {
				alert('failed to give feedback');
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
						'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhcml0eXxlbnwwfHwwfHw%3D&w=1000&q=80")'
				}}
			>
				<h2 style={{ marginTop: '2rem', color: 'white' }}>User Feedback</h2>
				<Form id='form-feedback' noValidate validated={validated}>
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
								<Form.Control disabled value={name} type='text' style={{ height: '4rem' }} />
							</Form.Group>
							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Email address:</Form.Label>
								<Form.Control
									disabled
									value={user.email ? user.email : 'No email provided'}
									type='email'
									style={{ height: '4rem' }}
									readOnly
								/>
							</Form.Group>

							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Subject:</Form.Label>
								<Form.Control
									required
									value={subject}
									style={{ height: '4rem' }}
									type='text'
									placeholder='Enter subject'
									onChange={onSubjectChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a subject
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3 d-flex'>
								<Form.Label>Message:</Form.Label>
								<Form.Control
									required
									value={message}
									style={{ height: '4rem' }}
									type='text'
									placeholder='Enter your feedback'
									onChange={onMessageChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Please provide a feedback
								</Form.Control.Feedback>
							</Form.Group>
						</Card.Body>
						<Card.Footer>
							<Button variant='primary' onClick={handleSubmit}>
								Submit Feedback
							</Button>
						</Card.Footer>
					</Card>
				</Form>
			</Container>
		</>
	);
}
