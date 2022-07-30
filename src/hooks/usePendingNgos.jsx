import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../constants/configs';

function usePendingNgos() {
	const [pendingNgos, setPendingNgos] = useState(null);
	useEffect(() => {
		async function fetchPendingNgos() {
			try {
				const response = await axios.get(`${baseUrl}/user/ngo/pending`);

				if (response.status === 200) {
					setPendingNgos(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchPendingNgos().catch((e) => console.log(e));
	}, []);

	return pendingNgos;
}

export default usePendingNgos;
