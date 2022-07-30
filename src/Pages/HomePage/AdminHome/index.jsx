import React, { useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import MainSlider from '../../../Components/login/sliders/MainSlider';
import acceptNgo from '../../../hooks/acceptNgo';
import rejectNgo from '../../../hooks/rejectNgo';
// import { useNavigate } from 'react-router-dom';
import usePendingNgos from '../../../hooks/usePendingNgos';
import getUser from '../../../utils/getUser';

function AdminHomepage() {
	// const navigate = useNavigate();
	const [ngoId, setNgoId] = useState(null);
	const pendingNgos = usePendingNgos();
	const user = getUser();
	const [res, setRes] = useState(false);
	const [show, setShow] = useState(false);

	console.log('user: ', res);
	const onAccept = () => {
		const response = acceptNgo(ngoId);
		setRes(response);
		// .then((res) => {
		//   setRes(response);
		//   if (res === true) {
		//     alert('Successfully accepted ngo, ', ngoId);
		//   } else {
		//     alert('Failed to accept ngo, ', ngoId);
		//   }
		// });
	};
	const onReject = () => {
		const response = rejectNgo(ngoId);
		setRes(response);
		// .then((res) => {
		//   setRes(response);
		//   if (res === true) {
		//     alert('Successfully rejected ngo, ', ngoId);
		//   } else {
		//     alert('failed to reject ngo', ngoId);
		//   }
		// });
	};

	return (
		<>
			<Container fluid style={{ width: '70%' }}>
				{user.isLogin && user.role === 'admin' && pendingNgos && pendingNgos.length > 0 ? (
					<>
						<br></br>
						<h1>Pendings Ngos</h1>
						<br></br>

						<h2>Please Accept following NGO's Requests</h2>

						{console.log('pendingNgos: ', pendingNgos)}
						{pendingNgos.map((ngo) => {
							return (
								<Card
									key={ngo.id}
									className='d-flex flex-wrap'
									bg='light'
									style={{
										boxShadow: '10px 10px 10px',
										width: '50%',
										height: '50%',
										marginTop: '4rem',
										border: 'secondary',
										display: 'flex'
									}}
								>
									<Card.Header>
										<Card.Title>
											<h3>{ngo.name}</h3>
										</Card.Title>
									</Card.Header>

									<Card.Body style={{ padding: '1rem' }}>
										<Card.Subtitle style={{ display: 'inline' }}>
											<h5> {ngo.ngoDescription}</h5>
										</Card.Subtitle>

										<div style={{ display: 'flex' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>ID:</h4>
													</Col>
													<Col>
														<h5>{ngo.id}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>

										<div style={{ display: 'flex' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Phone:</h4>
													</Col>
													<Col>
														<h5>{ngo.phone}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>

										<div style={{ display: 'flex' }}>
											<Card.Text>
												<Row>
													<Col style={{ width: '20%' }}>
														<h4>Email:</h4>
													</Col>
													<Col style={{ width: '80%' }}>
														<h5>{ngo.emailId}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>
										<div style={{ display: 'flex' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Status:</h4>
													</Col>
													<Col>
														<h5>
															{ngo.status === 0
																? ' Pending'
																: ngo.status === 1
																? ' Accepted'
																: ' Rejected'}
														</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>

										<div style={{ display: 'flex' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Address:</h4>
													</Col>
													<Col>
														<h5>{ngo.address}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>
									</Card.Body>
									<Card.Img src={ngo.certificate} alt='Missing Certificate'></Card.Img>

									<Card.Footer>
										<Button
											style={{
												height: '3rem',
												marginLeft: '1rem',
												marginRight: '1rem'
											}}
											variant='success'
											onClick={() => {
												setNgoId(ngo.id);
												onAccept();
											}}
										>
											Accept
										</Button>
										<Button
											style={{
												height: '3rem',
												marginLeft: '1rem',
												marginRight: '1rem'
											}}
											variant='danger'
											onClick={() => {
												setNgoId(ngo.id);
												onReject();
											}}
										>
											Reject
										</Button>
									</Card.Footer>
								</Card>
							);
						})}
					</>
				) : (
					<>
						<h2>No Pending Ngos</h2>{' '}
					</>
				)}

				{/* TODO: add another ternary operator if user is not logged in then show home to login or signup */}
			</Container>
		</>
	);
}

export default AdminHomepage;
