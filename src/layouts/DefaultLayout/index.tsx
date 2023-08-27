import React from 'react'
import NavBar from './NavBar';

interface DefaultLayoutProps {
	children: React.ReactNode
}

function DefaultLayout({children}: DefaultLayoutProps) {
	return (
	<div className='w-full min-h-screen flex flex-col gap-4'>
		<NavBar />
		{children}
	</div>
	);
}

export default DefaultLayout
