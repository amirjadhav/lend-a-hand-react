import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../constants/configs';

function useGetFeebacks() {
	const [feedbacks, setFeedbacks] = useState(null);
	useEffect(() => {
		async function fetchFeedbacks() {
			try {
				const response = await axios.get(`${baseUrl}/feedback/`);

				if (response.status === 200) {
					setFeedbacks(response.data);

					console.log('response: ', response);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchFeedbacks().catch((e) => console.log(e));
	}, []);

	return feedbacks;
}

export default useGetFeebacks;
