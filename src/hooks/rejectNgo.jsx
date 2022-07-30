import axios from 'axios';
import { baseUrl } from '../constants/configs';

function rejectNgo(ngoId) {
	let error;
	let responseData;
	if (!ngoId) return false;
	console.log('rejecting ngo: ', ngoId);

	axios
		.put(`${baseUrl}/user/ngo/reject/${ngoId}`)
		.then((response) => {
			responseData = response;

			console.log('responseData: ', responseData);
		})
		.catch((err) => {
			console.log(err.message);
			error = err;
		});

	if (error) {
		console.log(error);
		return false;
	} else {
		return responseData ? true : false;
	}
}

export default rejectNgo;
