import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, ListGroup, Row, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../constants/configs';
import getUser from '../../utils/getUser';

export default function Requirements() {
	const [requirements, setRequirements] = useState(null);
	let { ngoId, driveId } = useParams();
	const [showReqModal, setReqShow] = useState(false);
	const [newReqModal, setNewReqShow] = useState(false);

	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState('');
	const [address, setAddress] = useState('');
	const [reqId, setReqId] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [isDonate, setIsDonate] = useState(false);
	const [isPickup, setIsPickup] = useState(false);
	const [isNewReq, setIsNewReq] = useState(false);
	const donationQuantity = [];
	const productQuality = [];

	const [validated, setValidated] = useState(false);
	const user = getUser();

	const handleReqClose = () => setReqShow(false);
	const onNameChange = (e) => {
		setName(e.target.value);
	};
	const onQuantityChange = (e) => {
		setQuantity(e.target.value);
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

			if (
				!user.isLogin ||
				user.role !== 'ngo' ||
				name === '' ||
				quantity === '' ||
				!validated ||
				!ngoId ||
				!driveId ||
				!reqId
			)
				return;

			const data = {
				reqId: Number(reqId),
				ngoId: Number(ngoId),
				driveId: Number(driveId),
				reqName: name,
				quantity: Number(quantity)
			};
			setUpdated(false);

			const url = `${baseUrl}/require/`;
			const response = await axios.put(url, data);

			if (response.status === 200) {
				setUpdated(true);
				setValidated(false);
			} else {
				alert('failed to update requirements');
			}

			setReqShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddRequirement = async (event) => {
		try {
			const form = event.currentTarget;

			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}

			setValidated(true);

			if (
				!user.isLogin ||
				user.role !== 'ngo' ||
				name === '' ||
				quantity === '' ||
				!validated ||
				!ngoId ||
				!driveId
			)
				return;

			const data = {
				ngoId: Number(ngoId),
				driveId: Number(driveId),
				reqName: name,
				quantity: Number(quantity)
			};
			setUpdated(false);

			const url = `${baseUrl}/require/`;
			const response = await axios.post(url, data);

			if (response.status === 200) {
				setUpdated(true);
				setValidated(false);
				setNewReqShow(false);
				alert('Requirement Successfully added');
			} else {
				alert('failed to update requirements');
			}

			setIsNewReq(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (reqId) => {
		try {
			const url = `${baseUrl}/require/${reqId}`;
			const response = await axios.delete(url);

			if (response.status === 200) {
				setUpdated(true);
				alert('Requirement Successfully deleted');
			} else {
				alert('failed to delete requirements');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDonate = async () => {
		try {
			const url = `${baseUrl}/donation/`;

			for (let i = 0; i < requirements.length; i++) {
				const qualityData = document.getElementById(`quality_${i}`).value;
				const quantityData = document.getElementById(`quantity_${i}`).value;

				productQuality[i] = qualityData;
				donationQuantity[i] = quantityData;
			}

			if (
				productQuality.length !== donationQuantity.length ||
				!productQuality ||
				!donationQuantity
			) {
				alert('invalid data provided');
				return;
			}

			if (isPickup && address.length <= 0) {
				alert('enter pickup address');
				return;
			}
			console.log('productQuality: ', productQuality);
			console.log('donationQuantity: ', donationQuantity);

			let isSuccessfull = false;
			for (let i = 0; i < productQuality.length; i++) {
				if (!donationQuantity[i] || !productQuality[i]) {
					alert('invalid data for index: ', i);
					continue;
				}
				const donation = {
					donorId: user.id,
					productName: requirements[i].reqName,
					quantity: donationQuantity[i],
					quality: productQuality[i],
					productCategory: 'N/A',
					description: address,
					ngoId: ngoId,
					driveId: driveId,
					pickUpRequire: isPickup,
					donated: false
				};

				const response = await axios.post(url, donation);

				if (response.status === 200) {
					setUpdated(true);
					isSuccessfull = true;
				} else {
					alert('failed to delete requirements');
				}
			}

			if (isSuccessfull) {
				alert('Donated Successfully');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getRequirements = async () => {
			if (!ngoId || !driveId) return null;
			const url = `${baseUrl}/require/drive/${driveId}`;
			const response = await axios.get(url);

			if (response.status === 200) {
				setRequirements(response.data);
			} else {
				alert('failed to get requirements');
			}
		};
		getRequirements().catch((e) => {
			console.log(e);
		});
	}, [updated]);

	return (
		<Container fluid style={{ width: '70%' }}>
			<br></br>
			<h1>Requirements List</h1>
			<br></br>

			{user.isLogin && user.role === 'ngo' ? (
				<Button
					onClick={() => {
						setIsNewReq(true);
						setNewReqShow(true);
					}}
				>
					Add Requirements
				</Button>
			) : (
				<></>
			)}

			<br></br>
			<br></br>

			<Form className='col-md' id='form-new-requirement' noValidate validated={validated}>
				<Modal
					show={newReqModal}
					onHide={() => setNewReqShow(false)}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Add Goods Requirements</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className='d-flex justify-content-around' controlId='formReqName'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								required
								className='border'
								type='text'
								placeholder='Name'
								value={name}
								onChange={onNameChange}
							/>
						</Form.Group>
						<Form.Group className='d-flex justify-content-around' controlId='formReqName'>
							<Form.Label>Required Quantity</Form.Label>
							<Form.Control
								required
								className='border'
								type='number'
								placeholder='Quantity'
								value={quantity}
								min={1}
								onChange={onQuantityChange}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button type='submit' variant='primary' onClick={handleAddRequirement}>
							Add Requirement
						</Button>
					</Modal.Footer>
				</Modal>
			</Form>

			{requirements && requirements.length > 0 ? (
				<>
					<ListGroup as={'ul'}>
						<ListGroup.Item variant='primary'>
							<Row>
								<Col>{'No.'}</Col>
								<Col>{'Name'}</Col>
								<Col>{'Required Quantity'}</Col>
								{user.isLogin && user.role === 'donor' ? (
									<>
										<Col>Quality of Product'</Col>
										<Col>Donation Quantity</Col>
									</>
								) : (
									<></>
								)}
								{user.isLogin && user.role === 'ngo' ? <Col /> : <></>}
							</Row>
						</ListGroup.Item>
						{requirements.map((requirement, idx) => (
							<ListGroup.Item variant='light' key={idx}>
								<Row>
									<Col>{idx}</Col>
									<Col>{requirement.reqName}</Col>
									<Col>{requirement.quantity}</Col>
									{user.role === 'donor' ? (
										<Col>
											<Form.Select id={`quality_${idx}`} >
												<option>Low</option>
												<option>Average</option>
												<option>High</option>
											</Form.Select>
										</Col>
									) : (
										''
									)}
									{user.isLogin && user.role === 'ngo' ? (
										<>
											<Col>
												<Button
													variant='outline-primary'
													onClick={() => {
														setName(requirement.reqName);
														setQuantity(requirement.quantity);
														setReqId(requirement.reqId);
														setReqShow(true);
													}}
												>
													Update
												</Button>
												<Button
													style={{ marginLeft: '10px' }}
													variant='outline-danger'
													onClick={() => {
														handleDelete(requirement.reqId);
													}}
												>
													Delete
												</Button>
											</Col>
										</>
									) : (
										<>
											{user.role === 'donor' ? (
												<Col>
													<input
														id={`quantity_${idx}`}
														type={'number'}
														placeholder='donation amount'
														defaultValue={0}
													/>
												</Col>
											) : (
												<></>
											)}
										</>
									)}
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>

					{/* Requirement Modal */}

					<Form className='col-md' id='form-update-requirement' noValidate validated={validated}>
						<Modal show={showReqModal} onHide={handleReqClose} backdrop='static' keyboard={false}>
							<Modal.Header closeButton>
								<Modal.Title>Update Goods Requirements</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form.Group className='d-flex justify-content-around' controlId='formReqName'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										disabled
										className='border'
										type='text'
										placeholder='Name'
										value={name}
										onChange={onNameChange}
									/>
								</Form.Group>
								<Form.Group className='d-flex justify-content-around' controlId='formReqName'>
									<Form.Label>Required Quantity</Form.Label>
									<Form.Control
										required
										className='border'
										type='number'
										placeholder='Quantity'
										value={quantity}
										min={1}
										onChange={onQuantityChange}
									/>
								</Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button variant='secondary' onClick={handleReqClose}>
									Close
								</Button>
								<Button type='submit' variant='primary' onClick={handleSubmit}>
									Update Changes
								</Button>
							</Modal.Footer>
						</Modal>
					</Form>

					{
						<>
							<br></br>
							<br></br>
							<div>
								{user.isLogin && user.role === 'donor' ? (
									<Form.Check
										className='d-block col-md-3'
										type='switch'
										id='custom-switch'
										label='Pickup service required'
										value={isPickup}
										onClick={() => {
											setIsPickup(!isPickup);
										}}
									/>
								) : (
									<></>
								)}
								<br></br>
								{isPickup ? (
									<Form.Group className='d-flex col-md-6' controlId='form-address'>
										<Form.Label>Pickup Address</Form.Label>
										<Form.Control
											required
											className='border'
											type='textarea'
											placeholder='Enter pickup address'
											value={address}
											onChange={onAddressChange}
										/>
									</Form.Group>
								) : (
									<></>
								)}
								<br></br>
								<br></br>
							</div>
							{user.isLogin && user.role === 'donor' ? (
								<Button type='submit' variant='primary' onClick={handleDonate}>
									Donate
								</Button>
							) : (
								<></>
							)}
						</>
					}
				</>
			) : (
				<>
					<h1>No Reuirements Created</h1>
				</>
			)}
		</Container>
	);
}
