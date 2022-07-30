import './Widget.scss';

const Widget = ({ type }) => {
	let data;

	//temp
	const amount = 100;
	const diff = 20;

	switch (type) {
		case 'drives':
			data = {
				title: 'DONATION DRIVES',
				matter:
					'Donation drives allow individuals and groups to donate new,unused or used items to those who really need them.',
				link: 'See all drives'
			};
			break;
		case 'ngo':
			data = {
				title: 'NGO',
				matter: 'Social development organizations assisting in empowerment of people.',
				link: 'View all NGOs'
			};
			break;

		default:
			break;
	}
	return (
		<div className='widget'>
			<div className='left'>
				<span className='title'>{data.title}</span>
				<span className='counter'>{data.matter}</span>
				<span className='link'>{data.link}</span>
			</div>
			<div className='right'>
				<div className='percentage'></div>
			</div>
		</div>
	);
};
export default Widget;
