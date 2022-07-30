import axios from 'axios';
import { baseUrl } from '../constants/configs';

function updateProfile(userDetails) {
	let error;
	let responseData;
	if (!userDetails) return false;
	console.log('updating user: ', userDetails);

	axios
		.put(`${baseUrl}/user`, userDetails)
		.then((response) => {
			responseData = response;

			if (response.status !== 200) {
				alert('failed to update profile');
			} else {
				alert('Successfully updated profile');
			}
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

export default updateProfile;
