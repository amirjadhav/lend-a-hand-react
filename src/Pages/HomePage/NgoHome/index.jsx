import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../constants/configs';
import CardComponent from '../../../Components/card/cardComponent';
<link
	href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css'
	rel='stylesheet'
	integrity='sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor'
	crossorigin='anonymous'
></link>;

function NgoHome(props) {
	const [showReqModal, setReqShow] = useState(false);
	const ngoId = localStorage.getItem('id');
	const role = localStorage.getItem('role');

	let [drives, setDrives] = useState();

	const [showDriveModal, setDriveShow] = useState(false);
	const navigate = useNavigate();

	const handleDriveClose = () => setDriveShow(false);
	const handleReqClose = () => setReqShow(false);
	const createNewDrive = () => {
		setDriveShow(true);
	};
	const saveNewDrive = () => {
		setDriveShow(false);
	};
	const createNewRequirements = (e) => {
		setReqShow(true);
		navigate(`/ngo/${ngoId}/${e.target.id}/requirements/`);
	};
	useEffect(() => {
		const driveData = async () => {
			if (!role) return null;
			if (role === 'ngo' && !ngoId) return null;

			let url;

			if (role === 'admin' || role === 'donor') {
				url = `${baseUrl}/drive/`;
			}

			if (role === 'ngo') {
				url = `${baseUrl}/drive/ngo/${ngoId}`;
			}

			const driveDetails = await axios.get(url);
			setDrives(driveDetails.data);
			console.log('dDetails: ', driveDetails);
		};
		driveData().catch((e) => {
			console.log(e);
		});
	}, []);

	return (
		<>
			{/* create new drive */}
			<div className='d-flex flex-wrap'>
				{drives &&
					drives.map((drive, idx) => {
						return (
							<CardComponent
								key={drive.driveId}
								id={drive.driveId}
								cardStyle={{ width: '20rem', height: '100%' }}
								title={drive.driveName}
								description={drive.description}
								body={
									<>
										{role === 'admin' || role === 'donor' ? (
											<Row style={{ marginTop: '2px' }}>
												<h6>Ngo Id </h6>
												<p>{drive.ngoId}</p>
											</Row>
										) : (
											<></>
										)}
										<Row style={{ marginTop: '2px' }}>
											<h6>Location</h6>
											<p>{drive.place}</p>
										</Row>
										<Row style={{ marginTop: '2px' }}>
											<h6>Donor Count</h6>
											<p>{drive.donorCount}</p>
										</Row>
									</>
								}
								action={createNewRequirements}
								btnName={'Requirements'}
							/>
						);
					})}
			</div>
		</>
	);
}
export default NgoHome;
