import { useState } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import LoginSlider from './LoginSlider';
import RegisterSlider from './RegisterSlider';
import loginImg from '../../../login.svg';

export default function MainSlider({ show, setShow }) {
	const [isLogin, setIsLogin] = useState(null);
	return (
		<>
			<Offcanvas
				id='Account_Slider'
				show={show}
				onHide={() => {
					setShow(false);
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Account</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Card id='card-main-slider' style={{ width: '100%', height: '100%' }}>
						<Card.Img src={loginImg} width='100%' height='30%'></Card.Img>
						<Card.Body>
							<Row>
								<div>
									<p>Already have an account ?</p>{' '}
								</div>

								<Button
									className='btn-block'
									onClick={() => {
										setIsLogin(true);
									}}
									block
								>
									Sign In
								</Button>
							</Row>
							<div>
								<p>OR</p>
							</div>
							<div>
								<p>Create new account ?</p>
							</div>

							<Row>
								<Button
									onClick={() => {
										setIsLogin(false);
									}}
								>
									Sign Up
								</Button>
							</Row>
						</Card.Body>
					</Card>
				</Offcanvas.Body>
			</Offcanvas>

			{isLogin === null ? (
				<></>
			) : isLogin === true ? (
				<LoginSlider show={show} setIsLogin={setIsLogin} setShow={setShow} placement={'end'} />
			) : (
				<RegisterSlider show={show} setIsLogin={setIsLogin} setShow={setShow} placement={'end'} />
			)}
		</>
	);
}
