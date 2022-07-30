import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../constants/configs';

function useRejectedNgos() {
	const [rejectedNgos, setRejectedNgos] = useState(null);
	useEffect(() => {
		async function fetcRejectedNgos() {
			try {
				const response = await axios.get(`${baseUrl}/user/ngo/rejected`);

				if (response.status === 200) {
					setRejectedNgos(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetcRejectedNgos().catch((e) => console.log(e));
	}, []);

	return rejectedNgos;
}

export default useRejectedNgos;
