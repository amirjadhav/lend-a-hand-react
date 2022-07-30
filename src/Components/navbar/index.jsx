import { AdminNavbar } from './adminNavbar/adminNavbar';
import { DonorNavbar } from './donorNavbar/donorNavbar';
import { NgoNavbar } from './ngoNavbar/ngoNavbar';

import './navbar.css';
import { Navbar, Container, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
import pit from '../../img/pit.png';
import { useState } from 'react';
import ModalComponent from '../modal/modal';
import { useNavigate } from 'react-router-dom';
import MainSlider from '../login/sliders/MainSlider';

export const MainNavbar = () => {
	const userRole = localStorage.getItem('role');
	const isLoggedIn = localStorage.getItem('isLogin');

	const [show, setShow] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.clear();
		navigate('/');
	};
	return (
		<>
			<Container fluid>
				<Navbar className='MainNavbar'>
					<Navbar.Brand href='/'>
						<Image fluid={true} id='nav-logo' alt='logo' height='65px' width='65px' src={pit} />
					</Navbar.Brand>
					<Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
						<Nav.Link id='nav-item' href='/drives'>
							Drives
						</Nav.Link>

						<Nav className='NavItems ml-auto'>
							{userRole && userRole === 'admin' ? (
								<AdminNavbar />
							) : userRole === 'ngo' ? (
								<NgoNavbar />
							) : (
								<DonorNavbar />
							)}

							<NavDropdown id='nav-item' title='My Profile'>
								<NavDropdown.Item href='/my-profile'>MyProfile</NavDropdown.Item>
								{isLoggedIn ? (
									<>
										<NavDropdown.Item>
											<Button variant='outline-dark' onClick={() => setModalShow(true)}>
												Logout
											</Button>
										</NavDropdown.Item>

										<ModalComponent
											show={modalShow}
											modalId={'logout-modal'}
											title={'Logout'}
											body={<p>do you want to logout?</p>}
											buttonLabel={'Yes'}
											onButtonClick={logOut}
											onHide={() => setModalShow(false)}
										/>
									</>
								) : (
									<NavDropdown.Item>
										<Button variant='outline-dark' onClick={() => setShow(true)}>
											Account
										</Button>

										<MainSlider show={show} setShow={setShow} placement={'end'} />
										{/* <LoginSlider
                      show={show}
                      setShow={setShow}
                      placement={'end'}
                    ></LoginSlider> */}
									</NavDropdown.Item>
								)}

								{/* <NavDropdown.Item>
                  <Button variant="outline-dark" onClick={() => setShow(true)}>
                    Register
                  </Button>
                  <RegisterSlider
                    show={show}
                    setShow={setShow}
                    placement={'end'}
                  />
                </NavDropdown.Item> */}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</>
	);
};
