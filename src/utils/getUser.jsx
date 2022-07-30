const getUser = () => {
	const name = localStorage.getItem('name');
	const role = localStorage.getItem('role');
	const id = localStorage.getItem('id');
	const emailId = localStorage.getItem('emailId');
	const certificate = localStorage.getItem('certificate');
	const address = localStorage.getItem('address');
	const status = localStorage.getItem('status');
	const isLogin = localStorage.getItem('isLogin');
	const ngoDescription = localStorage.getItem('ngoDescription');
	const phone = localStorage.getItem('phone');
	const password = localStorage.getItem('password');

	return {
		name: name,
		role: role,
		id: id,
		email: emailId,
		certificate: certificate,
		address: address,
		status: status,
		isLogin: isLogin,
		ngoDescription: ngoDescription,
		phone: phone,
		password: password
	};
};

export default getUser;
