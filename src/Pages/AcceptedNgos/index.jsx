import React, { useMemo, useState } from 'react';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import getUser from '../../utils/getUser';
import useAcceptedNgos from '../../hooks/useAcceptedNgos';
import MainSlider from '../../Components/login/sliders/MainSlider';
import useGetTotalNgos from '../../hooks/useGetTotalNgos';

function AcceptedNgos() {
	const acceptedNgos = useAcceptedNgos();
	const user = getUser();
	const [show, setShow] = useState(false);
	const totalNgos = useGetTotalNgos();

	return (
		<>
			<Container fluid style={{ width: '70%' }}>
				{user.isLogin && user.role === 'admin' && acceptedNgos && acceptedNgos.length > 0 ? (
					<>
						<br></br>
						<h2 className=''>
							Accepted NGOs
							<Badge className='success' style={{ marginLeft: '15px', height: '40px' }}>
								<span>{totalNgos ? totalNgos : 0}</span>
							</Badge>
						</h2>
						<br></br>
						{acceptedNgos.map((ngo) => {
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
									<Card.Img src={ngo.certificate} alt='Certificate'></Card.Img>
								</Card>
							);
						})}
					</>
				) : (
					<>
						<h2>No Pending Ngos</h2>{' '}
					</>
				)}
			</Container>
		</>
	);
}

export default AcceptedNgos;
