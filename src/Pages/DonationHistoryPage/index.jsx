import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import useDonationHistory from '../../hooks/useDonationHistory';
import getUser from '../../utils/getUser';

function DonationHistory() {
	const user = getUser();
	const donationHistory = useDonationHistory(user.id);

	return (
		<>
			<Container fluid style={{ width: '70%' }}>
				{user.isLogin && user.role === 'donor' && donationHistory && donationHistory.length > 0 ? (
					<>
						<br></br>
						<h2>Donation History</h2>
						<br></br>
						{donationHistory.map((donation) => {
							return (
								<Card
									key={donation.donationId}
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
											<h3>{donation.productName}</h3>
										</Card.Title>
									</Card.Header>

									<Card.Body style={{ padding: '1rem' }}>
										<div style={{ display: 'inline' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Ngo ID:</h4>
													</Col>
													<Col>
														<h5>{donation.ngoId}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>

										<div style={{ display: 'inline', textAlign: 'left' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Donation ID:</h4>
													</Col>
													<Col>
														<h5>{donation.donationId}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>

										<div style={{ display: 'inline', textAlign: 'left' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Quality:</h4>
													</Col>
													<Col>
														<h5>{donation.quality}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>
										<div style={{ display: 'inline', textAlign: 'left' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Qunatity:</h4>
													</Col>
													<Col>
														<h5>{donation.quantity}</h5>
													</Col>
												</Row>
											</Card.Text>
										</div>

										<div style={{ display: 'inline', textAlign: 'left' }}>
											<Card.Text>
												<Row>
													<Col>
														<h4>Pickup Required:</h4>
													</Col>
													<Col>
														<h5>{donation.pickUpRequire ? 'Yes' : 'No'}</h5>
													</Col>
												</Row>
												{donation.pickUpRequire ? (
													<Row>
														<Col>
															<h4>Pickup Address:</h4>
														</Col>
														<Col>
															<h5>{donation.description}</h5>
														</Col>
													</Row>
												) : (
													<></>
												)}
											</Card.Text>
										</div>
									</Card.Body>
								</Card>
							);
						})}
					</>
				) : (
					<>
						<h2>No Donations made</h2>{' '}
					</>
				)}
				{/* TODO: add another ternary operator if user is not logged in then show home to login or signup */}
			</Container>
		</>
	);
}

export default DonationHistory;
