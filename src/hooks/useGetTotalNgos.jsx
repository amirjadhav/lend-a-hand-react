import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../constants/configs';

function useGetTotalNgos() {
	const [totalNgos, setTotalNgos] = useState(null);
	useEffect(() => {
		async function fetchTotalNgos() {
			try {
				const response = await axios.get(`${baseUrl}/user/ngo/count`);
				if (response.status === 200) {
					setTotalNgos(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchTotalNgos().catch((e) => console.log(e));
	}, []);

	return totalNgos;
}

export default useGetTotalNgos;
