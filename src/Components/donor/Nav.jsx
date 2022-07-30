import React from 'react';
import './Nav.scss';
import pit from '../../img/pit.png';
import { BrowserRouter as Router } from 'react-router-dom';

class DonorNav extends React.Component {
	render() {
		return (
			<div class='home'>
				<div class='nav'>
					<ul>
						<li>
							<a class='active' href='/'>
								<img alt='sorry' height='67px' width='150px' src={pit} />
							</a>
						</li>
						<li>
							<a class='links' href='/login'>
								LogOut
							</a>
						</li>
						<li>
							<a class='links' href='/myprofile'>
								MyProfile
							</a>
						</li>
						<li>
							<a class='links' href='/d_history'>
								Donation History
							</a>
						</li>
						<li>
							<a class='links' href='/donate'>
								Donate
							</a>
						</li>
						<li>
							<a class='links' href='/homepage'>
								Drives
							</a>
						</li>
						<li>
							<a class='links' href='/Donations'>
								NGO
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
export default DonorNav;
