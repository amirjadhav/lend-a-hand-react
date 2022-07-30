import React, { useState } from 'react';
import profile from '../../img/profile.png';
<link
	href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css'
	rel='stylesheet'
	integrity='sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor'
	crossorigin='anonymous'
></link>;
function Donations(props) {
	const [create, setCreate] = useState('');
	const requList = [
		'Money',
		'Basic Medicine',
		'Wearable Clothes',
		'Bed Sheets',
		'Toiletries',
		'Sanitary Pads'
	];
	const [selectedList, setSelectedList] = useState([]);

	const changeHandler = (i) => {
		if (selectedList.includes(i) === false) {
			console.log(i);
			selectedList.push(i);
			setSelectedList(selectedList);
		} else {
			for (var j = 0; j < selectedList.length; j++) {
				if (selectedList[j] === i) {
					var spliced = selectedList.splice(j, 1);
				}
			}
		}
	};

	return (
		<>
			<nav className='navbar navbar-expand-lg bg-primary'>
				<div className='container-fluid'>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<a
									className='nav-link active '
									aria-current='page'
									href='/Donations'
									style={{ color: 'white' }}
								>
									Home
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='#' style={{ color: 'white' }}>
									Link
								</a>
							</li>
						</ul>
						<ul className='navbar-nav ml-auto '>
							<li className='nav-item' style={{ color: 'white' }}>
								<b>User1 </b> <br /> <b>Address</b>
							</li>
							<li className='nav-item '>
								<img src={profile} width='70px' height='50px' />
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div className='container-fluid' style={{ background: 'lightgrey', height: '800px' }}>
				<h3 className='text-center'>Donation Drives</h3>
				{create === '' ? (
					<div style={{ width: '50%', marginLeft: '25%' }}>
						<button
							className='btn btn-primary col-md-12 text-center '
							onClick={() => setCreate('drive')}
						>
							Create Drive
						</button>
						<br />
						<button
							className='btn btn-primary col-md-12 text-center mt-2'
							onClick={() => {
								setCreate('createreq');
								setSelectedList([]);
							}}
						>
							Create Requirements List
						</button>
						<br />
						<button
							className='btn btn-primary col-md-12 text-center mt-2'
							onClick={() => setCreate('updatereq')}
						>
							Update Requirements List
						</button>
					</div>
				) : (
					''
				)}
				{create === 'drive' ? (
					<div
						className='bg-light'
						style={{ width: '50%', marginLeft: '25%', borderRadius: '5px' }}
					>
						<h4 style={{ paddingTop: '3%', textAlign: 'center' }}>Create Drive</h4>
						<form style={{ padding: '3%' }}>
							<div class='row mb-3 '>
								<label for='inputEmail3' class='col-sm-3 col-form-label'>
									Drive Name
								</label>
								<div class='col-sm-9'>
									<input type='text' class='form-control' id='inputEmail3' />
								</div>
							</div>
							<div class='row mb-3'>
								<label for='inputPassword3' class='col-sm-3 col-form-label'>
									Date of Drive
								</label>
								<div class='col-sm-9'>
									<input type='date' class='form-control' id='inputPassword3' />
								</div>
							</div>
							<div class='row mb-3'>
								<label class='col-form-label col-sm-3 pt-0'>Place of Drive</label>
								<div class='col-sm-9'>
									<input type='text' class='form-control' id='inputPassword3' />
								</div>
							</div>
							<div class='row mb-3'>
								<label class='col-form-label col-sm-3 pt-0'>Motive of Drive</label>
								<div class='col-sm-9'>
									<input type='textbox' class='form-control' id='inputPassword3' />
								</div>
							</div>
							<div class='row mb-3'>
								<label class='col-form-label col-sm-3 pt-0'>Initiated By</label>
								<div class='col-sm-9'>
									<input type='text' class='form-control' id='inputPassword3' />
								</div>
							</div>
							<div class='row mb-3'>
								<label class='col-form-label col-sm-3 pt-0'>Contact No</label>
								<div class='col-sm-9'>
									<input type='text' class='form-control' id='inputPassword3' />
								</div>
							</div>
							<button type='submit' class='btn btn-primary' onClick={() => setCreate('')}>
								Submit
							</button>
						</form>
					</div>
				) : (
					''
				)}

				{create === 'createreq' ? (
					<div
						className='bg-light'
						style={{ width: '20%', marginLeft: '40%', borderRadius: '5px' }}
					>
						<div style={{ padding: '5%' }}>
							<h4 className='text-center'>Create Request List</h4>
							{requList.map((item) => (
								<div class='form-check' style={{ paddingLeft: '40px' }}>
									<input
										class='form-check-input'
										type='checkbox'
										value=''
										id='flexCheckChecked'
										onChange={() => changeHandler(item)}
									/>
									<label class='form-check-label' for='flexCheckChecked'>
										{item}
									</label>
								</div>
							))}
							<button
								class='btn btn-primary'
								style={{ marginLeft: '30%' }}
								onClick={() => {
									setCreate('');
								}}
							>
								Submit
							</button>
						</div>
					</div>
				) : (
					''
				)}

				{create === 'updatereq' ? (
					<div
						className='bg-light'
						style={{ width: '20%', marginLeft: '40%', borderRadius: '5px' }}
					>
						<div style={{ padding: '5%' }}>
							<h4 className='text-center'>Update Request List</h4>
							{requList.map((item) => (
								<div class='form-check' style={{ paddingLeft: '40px' }}>
									{selectedList.includes(item) === true ? (
										<input
											class='form-check-input'
											type='checkbox'
											value=''
											id='flexCheckChecked'
											onClick={() => changeHandler(item)}
											defaultChecked
										/>
									) : (
										<input
											class='form-check-input'
											type='checkbox'
											value=''
											id='flexCheckChecked'
											onClick={() => changeHandler(item)}
										/>
									)}
									<label class='form-check-label' for='flexCheckChecked'>
										{item}
									</label>
								</div>
							))}
							<button
								class='btn btn-primary'
								style={{ marginLeft: '30%' }}
								onClick={() => setCreate('')}
							>
								Update
							</button>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
}
export default Donations;
