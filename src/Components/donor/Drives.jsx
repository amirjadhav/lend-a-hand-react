import React from 'react';
import '../App.css';
//import {Homepage} from "Components/Homepage";
import { useNavigate } from 'react-router-dom';
function Drives() {
	const navigate = useNavigate();
	const home = () => {
		navigate('/d_home');
	};

	const Form1 = () => {
		navigate('/Form1');
	};

	return (
		<>
			<div className='card '>
				<h1>Drives </h1>
				<ul className='list-group list-group-flush'>
					<button className='button2' onClick={Form1}>
						Drive1:
						<br />
						Smile Foundation
						<br />
						Helping Students
						<br />
						Contact:smilefoundation.orgs
						<br />
					</button>

					<button className='button2' onClick={Form1}>
						Drive2:
						<br />
						Nanhi Kali
						<br />
						Donating goods
						<br />
						Contact:nanhikali.orgs
						<br />
					</button>

					<button className='button2' onClick={Form1}>
						Drive3:
						<br />
						Kriti Foundation
						<br />
						Helping Needy
						<br />
						Contact:kriti.orgs
						<br />
					</button>
					<button className='button2' onClick={Form1}>
						Drive4:
						<br />
						Yatna Foundation
						<br />
						Helping Students
						<br />
						Contact:yatna.orgs
						<br />
					</button>
				</ul>
			</div>
			<button className='button1' onClick={home}>
				Back to Home
			</button>
		</>
	);
}

export default Drives;
