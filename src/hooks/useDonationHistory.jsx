import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../constants/configs';

function useDonationHistory(userId) {
	const [donationHistory, setDonationHistory] = useState(null);

	useEffect(() => {
		async function fetchDonationHistory() {
			try {
				if (!userId) return;
				const response = await axios.get(`${baseUrl}/donation/user/${userId}`);

				if (response.status === 200) {
					setDonationHistory(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchDonationHistory().catch((e) => console.log(e));
	}, []);

	return donationHistory;
}

export default useDonationHistory;
