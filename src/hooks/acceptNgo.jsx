import axios from 'axios';
import { baseUrl } from '../constants/configs';

function acceptNgo(ngoId) {
	let error;
	let responseData;
	if (!ngoId) return false;
	console.log('accepting ngo: ', ngoId);

	axios
		.put(`${baseUrl}/user/ngo/accept/${ngoId}`)
		.then((response) => {
			responseData = response;

			console.log('responseData: ', responseData);
		})
		.catch((err) => {
			error = err;
			console.log(err.message);
		});

	if (error) {
		console.log(error);
		return false;
	} else {
		return responseData ? true : false;
	}
}

export default acceptNgo;
