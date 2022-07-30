import React from 'react';
import donorhome from '../../img/donorhome.jpg';
import './donate.scss';
import './Nav.scss';
import pit from '../../img/pit.png';

var eid, profile, image1, image2, message, ngo, s;

const donor = {
	backgroundImage: 'url(' + donorhome + ')',
	width: '100%',
	height: '100%',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 100%'
};

class Donate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pname: null,
			quant: null,
			quality: null,
			date: null,
			des: null,
			category: null,
			file1: null,
			file2: null,
			ngo: [],
			type: '',
			sngo: null,
			scat: null
		};

		this.handleImage1 = this.handleImage1.bind(this);
		this.handleImage2 = this.handleImage2.bind(this);
		this.pnameChange = this.pnameChange.bind(this);
		this.quantChange = this.quantChange.bind(this);
		this.qualityChange = this.qualityChange.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.desChange = this.desChange.bind(this);
		this.categoryChange = this.categoryChange.bind(this);
		this.typeChange = this.typeChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sngoChange = this.sngoChange.bind(this);
		this.scatChange = this.scatChange.bind(this);

		eid = sessionStorage.getItem('id');
		profile = '/donorprofile';
		console.log(eid);
	}

	componentDidMount() {
		console.log('In cdm');
		const url = 'http://localhost:9000/ngos';

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');

		headers.append('Access-Control-Allow-origin', url);
		headers.append('Access-Control-Allow-Credentials', 'true');

		headers.append('POST', 'GET');

		fetch(url, {
			headers: headers,
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				this.setState({ ngo: res });
				//  console.log(typeof(this.sate.ngo))
				//  console.log(this.sate.ngo),
				//  console.log(this.sate.ngo[0]),
				//  console.log(this.sate.ngo[1])
			});
	}
	dd() {
		let s = this.state.ngo;

		return s.map((song) => {
			return <option value={song}>{song}</option>;
		});
	}

	pnameChange = (event) => {
		this.setState({
			pname: event.target.value
		});
	};

	sngoChange = (event) => {
		this.setState({
			sngo: event.target.value
		});
	};

	scatChange = (event) => {
		this.setState({
			scat: event.target.value
		});
	};

	quantChange = (event) => {
		this.setState({
			quant: event.target.value
		});
	};
	qualityChange = (event) => {
		this.setState({
			quality: event.target.value
		});
	};
	dateChange = (event) => {
		this.setState({
			date: event.target.value
		});
	};
	desChange = (event) => {
		this.setState({
			des: event.target.value
		});
	};
	categoryChange = (event) => {
		this.setState({
			category: event.target.value
		});
	};

	typeChange = (event) => {
		this.setState({
			type: event.target.value
		});
	};
	handleImage1(event) {
		this.setState({
			file1: URL.createObjectURL(event.target.files[0])
		});
		image1 = event.target.files[0].name;
	}
	handleImage2(event) {
		this.setState({
			file2: URL.createObjectURL(event.target.files[0])
		});
		image2 = event.target.files[0].name;
	}
	subcategory() {
		let cat = {
			Furnitures: ['Sofas', 'Beds', 'HomeDecors', 'ChairsDining', 'Wadrobes', 'KidsFurniture'],
			Electronics: [
				'CamerasAndLenses',
				'Computers',
				'Mobiles',
				'TV-Video-Audio',
				'ComputerAccessories'
			],
			Appliances: ['Refrigerators', 'WashingMachines', 'ACs', 'KitchenAppliances'],
			Vehicles: ['Cars', 'Bikes', 'Bicycles', 'OtherVehicles'],
			Clothing: ['Men', 'Women', 'Kids', 'OtherClothing'],
			Accessories: ['Watches', 'Footwear', 'BagsAndWallets', 'Jewellery', 'OtherAccessories'],
			Stationery: ['WritingThings', 'Books', 'EngineeringInstruments', 'OtherStationery']
		};
		let sc = this.state.category;
		let s = cat[sc];
		if (s) {
			return s.map((son) => {
				return <option value={son}>{son}</option>;
			});
		}
	}
	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
		var body = {
			did: eid,
			pname: this.state.pname,
			quant: this.state.quant,
			quality: this.state.quality,
			expdate: this.state.date,
			des: this.state.des,
			cat: this.state.category,
			scat: this.state.scat,
			type: this.state.type,
			img1: image1,
			img2: image2,
			state: 0,
			ngo: this.state.sngo
		};
		console.log(body);
		const url = 'http://localhost:9000/addproduct';
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');

		headers.append('Access-Control-Allow-origin', url);
		headers.append('Access-Control-Allow-Credentials', 'true');

		headers.append('POST', 'GET');

		fetch(url, {
			headers: headers,
			method: 'POST',
			body: JSON.stringify(body)
		}).then((response) => {
			if (response.ok) {
				alert('Details submitted.. Thank You For Donating..');
				window.location.reload(false);
			}
		});
	}
	render() {
		return (
			<div style={donor} class='main'>
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
				<div class='container'>
					<b>Welcome..</b>
					<br />
					<br />
					<form class='donorform'>
						<div class='row'>
							<div class='col-25'>
								<label for='fname'>Product Name</label>
							</div>
							<div class='col-75'>
								<input
									type='text'
									id='pname'
									name='pname'
									placeholder='product name..'
									value={this.state.pname}
									onChange={this.pnameChange}
									required
								/>
							</div>
						</div>
						<div class='row'>
							<div class='col-25'>
								<label for='quant'>Quantity</label>
							</div>
							<div class='col-75'>
								<input
									type='text'
									id='quant'
									name='quant'
									placeholder='quantity..'
									value={this.state.quant}
									onChange={this.quantChange}
									required
								/>
							</div>
						</div>
						<div class='row'>
							<div class='col-25'>
								<label for='quality'>Quality</label>
							</div>
							<div class='col-75'>
								<select
									id='quality'
									name='quality'
									value={this.state.quality}
									onChange={this.qualityChange}
									required
								>
									<option>select</option>
									<option value='used'>Used</option>
									<option value='new'>New</option>
								</select>
							</div>
						</div>
						<div class='row'>
							<div class='col-25'>
								<label for='Category'>Category of product</label>
							</div>
							<div class='col-75'>
								<select
									id='category'
									name='category'
									value={this.state.category}
									onChange={this.categoryChange}
									required
								>
									<option>select</option>
									<option value='Vehicles'>Vehicles</option>
									<option value='Furnitures'>Furnitures</option>
									<option value='Electronics'>Electronics</option>
									<option value='Clothing'>Clothing</option>
									<option value='Appliances'>Appliances</option>
									<option value='Accessories'>Accessories</option>
								</select>
							</div>
						</div>
						<div class='row'>
							<div class='col-25'>
								<label for='des'>Description</label>
							</div>
							<div class='col-75'>
								<textarea
									id='des'
									name='des'
									placeholder='Write something..'
									value={this.state.des}
									onChange={this.desChange}
									required
								></textarea>
							</div>
						</div>
						<div class='row'>
							<div class='col-25'>
								<label for='ngo'>Select NGO to donate</label>
							</div>
							<div class='col-75'>
								<select
									id='ngo'
									name='ngo'
									value={this.state.sngo}
									onChange={this.sngoChange}
									required
								>
									<option>Select ngo</option>
									{this.dd()}
								</select>
							</div>
							<br />
						</div>
						<div class='row'>
							<div class='col-25'>
								<label for='images'>Product Images</label>
							</div>
							<br />
							<div class='fileimages'>
								<input type='file' onInput={this.handleImage1} required />
								<div class='imgfile'>
									<img class='upload' src={this.state.file1} />
								</div>
							</div>
							<div class='fileimages'>
								<input type='file' onInput={this.handleImage2} required />
								<div class='imgfile'>
									<img class='upload' src={this.state.file2} />
								</div>
							</div>
						</div>{' '}
						<br /> <br />
						<div class='row'>
							<center>
								<button
									type='submit'
									class='submit'
									onClick={this.handleSubmit.bind(this)}
									value='Submit'
								>
									Submit And Add Product
								</button>
							</center>
						</div>
					</form>
					<div>
						<h2>{message}</h2>
					</div>
				</div>
			</div>
		);
	}
}
export default Donate;
