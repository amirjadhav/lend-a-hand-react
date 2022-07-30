import React from 'react';
import Widget from '../../../Components/widget/Widget';
import donorHomeCss from './DonorHome.css';

export function DonorHomePage() {
	return (
		<>
			<div className='DonorHomePage'>
				<div className='widgets'>
					<Widget type='drives' />
					<Widget type='ngo' />
				</div>
			</div>
		</>
	);
}
