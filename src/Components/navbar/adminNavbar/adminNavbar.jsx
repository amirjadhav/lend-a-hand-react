import { Nav } from 'react-bootstrap';

export const AdminNavbar = () => {
	return (
		<>
			<Nav.Link id='nav-item' href='/register-ngo'>
				Register NGO
			</Nav.Link>
			<Nav.Link id='nav-item' href='/registered-ngo'>
				Registered NGOs
			</Nav.Link>
			<Nav.Link id='nav-item' href='/rejected-ngo'>
				Rejected NGOs
			</Nav.Link>
			<Nav.Link id='nav-item' href='/feedback'>
				Feedbacks
			</Nav.Link>
		</>
	);
};
