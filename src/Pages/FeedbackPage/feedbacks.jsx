import { Container, Card, Row, Col } from 'react-bootstrap';

import useGetFeebacks from '../../hooks/useGetFeedbacks';

export default function Feedbacks() {
	const feedbacks = useGetFeebacks();
	console.log('feedbacks: ', feedbacks);

	return (
		<>
			<Container fluid>
				{feedbacks && feedbacks.length > 0 ? (
					feedbacks.map((fb, idx) => {
						return (
							<Card
								key={idx}
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
										<h3>{fb.subject}</h3>
									</Card.Title>
								</Card.Header>

								<Card.Body style={{ padding: '1rem' }}>
									<Card.Subtitle style={{ display: 'inline' }}>
										<h5> {fb.name}</h5>
									</Card.Subtitle>

									<div style={{ display: 'flex' }}>
										<Card.Text>
											<Row>
												<Col>
													<h4>Email:</h4>
												</Col>
												<Col>
													<h5>{fb.email}</h5>
												</Col>
											</Row>
										</Card.Text>
									</div>

									<div style={{ display: 'flex' }}>
										<Card.Text>
											<Row>
												<Col>{fb.description}</Col>
											</Row>
										</Card.Text>
									</div>
								</Card.Body>
							</Card>
						);
					})
				) : (
					<></>
				)}
			</Container>
		</>
	);
}
