import React from 'react';
import './Nav.scss';
import pit from '../../img/pit.png';

class AdminNav extends React.Component {
	render() {
		return (
			<div class='home'>
				<div class='nav'>
					<ul>
						<li>
							<a class='active' href='/'>
								<img alt='sorry' height='80px' width='240px' src={pit} />
							</a>
						</li>
						<li>
							<a class='links' href='/login'>
								Log Out
							</a>
						</li>
						<li>
							<a class='links' href='/feedback'>
								Feedback
							</a>
						</li>
						<li>
							<a class='links' href='/addngo'>
								Add NGO{' '}
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
export default AdminNav;
