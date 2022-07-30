import React from 'react';
import DonorNav from './Nav';
import './d_history.scss';

const admin = {
	width: '100%',
	height: '100%',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 100%'
};

const table = {
	top: '0%',
	left: '40%'
};

class Dhistory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			s: [],
			p: null,
			sf: false
		};
	}
	x;
	renderResultRows() {
		let s = this.state.s;
		let n;
		return s.map((song, index) => {
			let i = '/productimages/' + song[1];
			//console.log(i,typeof(i))
			let a = 'nprice-' + index;
			return (
				<tr id={index} className='foralign'>
					<td>{song[0]}</td>

					<td>
						<img src={i} class='validateimage' />
					</td>

					<td>{song[2]}</td>
				</tr>
			);
		});
	}

	fetchDetails(row) {
		let s = this.state.s;
		var body = {
			pid: s[row][3],
			cid: sessionStorage.getItem('id'),
			quant: s[row][2],
			nquant: s[row][5],
			aprice: s[row][4]
		};
		console.log();
		const url = 'http://localhost:9000/buyproduct';

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
				alert('Details submitted.. Thank You For purchasing..');
				window.location.reload(false);
			}
		});
	}

	products() {
		let body = { did: sessionStorage.getItem('id') };
		console.log(body);
		const url = 'http://localhost:9000/getproducts';

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
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				this.setState({ s: res });
				console.log(this.state.s);
			});
	}
	componentDidMount() {
		this.products();
	}

	render() {
		return (
			<div style={admin} class='adminmain'>
				<DonorNav />

				<div class='cat'>
					<h2>
						<b>
							<center>DONATED PRODUCTS</center>
						</b>
					</h2>
					<br />
					<table className='Table' border='1'>
						<tr>
							<th>S.No</th>
							<th>Image</th>
							<th>Selected NGO</th>
						</tr>
						<tr>
							<td>1</td>
							<td>
								<img src='bag_green1.jpeg'></img>
							</td>
							<td>Kriti Foundation</td>
						</tr>
						<tr>
							<td>2</td>
							<td>
								<img src='bag_purple1.jpeg'></img>
							</td>
							<td>Aarambh Foundation</td>
						</tr>
						<tr>
							<td>3</td>
							<td>
								<img src='cycle_b_1.jpeg'></img>
							</td>
							<td>Yatna Foundation</td>
						</tr>
					</table>
					<br />
					<br />
					<br />
				</div>
			</div>
		);
	}
}

export default Dhistory;
