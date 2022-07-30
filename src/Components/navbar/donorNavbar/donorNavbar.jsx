import { Nav } from 'react-bootstrap';

export const DonorNavbar = () => {
	return (
		<>
			<Nav.Link id='nav-item' href='/donation-history'>
				Donation History
			</Nav.Link>
			<Nav.Link id='nav-item' href='/feedback'>
				Feedback
			</Nav.Link>
		</>
	);
};
