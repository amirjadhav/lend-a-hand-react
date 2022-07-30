import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { baseUrl } from '../../constants/configs';
import CardComponent from '../../Components/card/cardComponent';
import { useNavigate } from 'react-router-dom';
import createDrive from '../../hooks/createDrive';
<link
	href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css'
	rel='stylesheet'
	integrity='sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor'
	crossorigin='anonymous'
></link>;

function CreateDrivesPage(props) {
	const ngoId = localStorage.getItem('id');
	const role = localStorage.getItem('role');

	const [name, setName] = useState('');
	const [place, setPlace] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [description, setDescritpion] = useState('');
	const [validated, setValidated] = useState(false);

	const [showReqModal, setReqShow] = useState(false);
	const navigate = useNavigate();

	const [showDriveModal, setDriveShow] = useState(true);

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	const onPlaceChange = (e) => {
		setPlace(e.target.value);
	};
	const onDateChange = (e) => {
		setDate(e.target.value);
	};
	const onTimeChange = (e) => {
		setTime(e.target.value);
	};

	const onDescriptionChange = (e) => {
		setDescritpion(e.target.value);
	};
	const handleDriveClose = () => {
		setDriveShow(false);
		navigate('/');
	};
	const handleReqClose = () => setReqShow(false);
	const createNewDrive = () => {
		setDriveShow(true);
	};
	const handleSubmit = async (event) => {
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		console.log('validatinggg');
		setValidated(true);
	};

	useEffect(() => {
		const driveData = async () => {
			try {
				if (!name || !place || !date || !time || !description || !ngoId) return;

				if (validated) {
					const currentDate = new Date().getFullYear();
					const createDate = `${date.toString()}T${time.toString()}:01.915+00:00`;
					const driveData = {
						ngoId: ngoId,
						driveName: name,
						createDate: createDate,
						description: description,
						donorCount: 0
					};
					const url = `${baseUrl}/drive/`;
					const response = await axios.post(url, driveData);
					console.log('response: ', response);

					setDriveShow(false);
					navigate('/');
				}
			} catch (error) {
				console.log(error);
			}
		};
		driveData().catch((e) => {
			console.log(e);
		});
	}, [validated]);

	return (
		<>
			{/* create new drive */}

			{/* Drive Modal */}

			<Modal show={showDriveModal} onHide={handleDriveClose} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Create new Drive</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='col-md' id='form-create-drive' noValidate validated={validated}>
						<Card>
							<Form.Group className='d-flex' controlId='form-drive-name'>
								<Form.Label> Name </Form.Label>
								<Form.Control
									className='border'
									required
									type='text'
									placeholder='Enter Name'
									onChange={onNameChange}
								/>
							</Form.Group>

							<Form.Group className='d-flex' controlId='form-drive-place'>
								<Form.Label> Place </Form.Label>
								<Form.Control
									required
									className='border'
									type='text'
									placeholder='Enter Place'
									onChange={onPlaceChange}
								/>
							</Form.Group>

							<Form.Group className='d-flex' controlId='form-drive-date'>
								<Form.Label> Date </Form.Label>

								<Form.Control required className='border' type='date' onChange={onDateChange} />
							</Form.Group>
							<Form.Group className='d-flex' controlId='form-drive-time'>
								<Form.Label> Time </Form.Label>

								<Form.Control required className='border' type='time' onChange={onTimeChange} />
							</Form.Group>

							<Form.Group className='d-flex' controlId='form-drive-description'>
								<Form.Label> Description </Form.Label>

								<Form.Control
									required
									className='border'
									type='text'
									placeholder='Enter description'
									onChange={onDescriptionChange}
								/>
							</Form.Group>
						</Card>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleDriveClose}>
						Close
					</Button>
					<Button type='submit' variant='primary' onClick={handleSubmit}>
						Create Drive
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default CreateDrivesPage;
