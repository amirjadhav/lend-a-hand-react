import React from 'react';
import { useRoutes } from 'react-router-dom';

import Donor from '../Components/donor/d_home';
import Donations from '../Components/donor/Donations';
import { DonorHomePage } from '../Pages/HomePage/DonorHome';
import Requirements from '../Pages/Requirements';
import NgoHome from '../Pages/HomePage/NgoHome';
import CreateDrivesPage from '../Pages/CreateDrivePage';
import AdminHomepage from '../Pages/HomePage/AdminHome';
import RejectedNgos from '../Pages/RejectedNgosPage';
import '../Components/App.css';
import AcceptedNgos from '../Pages/AcceptedNgos';
import MyProfile from '../Pages/MyProfilePage';
import DonationHistory from '../Pages/DonationHistoryPage';
import getUser from '../utils/getUser';
import HomePage from '../Pages/HomePage';
import Feedback from '../Pages/FeedbackPage';
import Feedbacks from '../Pages/FeedbackPage/feedbacks';

export function AppRoutes() {
	const user = getUser();
	const routerRoutes = useRoutes([
		{
			// TODO - add default page
			path: '/',
			element:
				user.role && user.role === 'donor' ? (
					<DonorHomePage />
				) : user.role === 'ngo' ? (
					<NgoHome />
				) : user.role === 'admin' ? (
					<AdminHomepage />
				) : (
					<HomePage />
				)
		},
		// { path: "/my-profile", element: <Pit /> },
		{ path: '/my-profile', element: <MyProfile /> },
		{ path: '/drives', element: <NgoHome /> },
		{ path: '/create-drive', element: <CreateDrivesPage /> },
		{ path: '/ngo/:ngoId/:driveId/requirements', element: <Requirements /> },
		{ path: '/create-requirement-list', element: <Donor /> },
		{ path: '/donate', element: <Donations /> },
		{ path: '/donation-history', element: <DonationHistory /> },
		{ path: '/register-ngo', element: <AdminHomepage /> },
		{ path: '/registered-ngo', element: <AcceptedNgos /> },
		{ path: '/rejected-ngo', element: <RejectedNgos /> },
		{ path: '/feedback', element: user.role === 'admin' ? <Feedbacks /> : <Feedback /> },
		{ path: '/ngo-home', element: <NgoHome /> }
	]);

	return routerRoutes;
}
