import axios from 'axios';
import { baseUrl } from '../constants/configs';

const registerUser = async (userDetails) => {
	let error;
	let responseData;
	if (!userDetails) return false;
	axios
		.post(`${baseUrl}/user/add-user`, userDetails)
		.then((response) => {
			responseData = response;

			console.log('responseData: ', responseData);
		})
		.catch((err) => {
			error = err;
		});

	if (error) {
		console.log(error);
		return false;
	} else {
		return responseData;
	}
};

export default registerUser;
