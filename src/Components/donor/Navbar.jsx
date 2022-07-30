import React from 'react';

function Navbar() {
	return (
		<div>
			<nav className='navbar navbar-light bg-light'>
				<img
					src='D:\APPLE-Project\my-app\src\Components\img\login_img.jpeg'
					width='300'
					height='150'
					className='d-inline-block align-top logo'
					alt=''
					//backgroundImage `url(${xx})`,
					backgroundSize='cover'
				/>
			</nav>
		</div>
	);
}

export default Navbar;
