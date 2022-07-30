import axios from 'axios';
import { baseUrl } from '../constants/configs';

const createDrive = async (driveDetails) => {
	let error;

	if (!driveDetails) return false;
	axios
		.post(`${baseUrl}/drive`, driveDetails)
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			error = err;
		});

	if (error) {
		console.log(error);
		return false;
	} else {
		return true;
	}
};

export default createDrive;
