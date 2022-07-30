export const storeUserData = (data) => {
	if (!data) return;
	Object.keys(data).map((key) => {
		if (key === 'details') {
			Object.keys(data[key]).map((k) => {
				localStorage.setItem(k, data[key][k]);
			});
		} else {
			localStorage.setItem(key, data[key]);
		}
	});
};

export const clearStorage = () => {
	localStorage.clear();
};
