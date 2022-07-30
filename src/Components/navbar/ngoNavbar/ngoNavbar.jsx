import { Nav } from 'react-bootstrap';

export const NgoNavbar = () => {
	return (
		<>
			<Nav.Link id='nav-item' href='/create-drive'>
				Create Drive
			</Nav.Link>
			<Nav.Link id='nav-item' href='/feedback'>
				Feedback
			</Nav.Link>
		</>
	);
};
