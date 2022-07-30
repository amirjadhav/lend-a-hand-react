import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../constants/configs';

function useAcceptedNgos() {
	const [acceptedNgos, setAcceptedNgos] = useState(null);
	useEffect(() => {
		async function fetcRejectedNgos() {
			try {
				const response = await axios.get(`${baseUrl}/user/ngo/accepted`);

				if (response.status === 200) {
					setAcceptedNgos(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetcRejectedNgos().catch((e) => console.log(e));
	}, []);

	return acceptedNgos;
}

export default useAcceptedNgos;
