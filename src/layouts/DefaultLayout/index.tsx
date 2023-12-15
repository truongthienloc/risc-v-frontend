import React from 'react'
import NavBar from './NavBar'

interface DefaultLayoutProps {
	children: React.ReactNode
}

function DefaultLayout({children}: DefaultLayoutProps) {
	return (
		<div className='w-full h-screen flex flex-col gap-4 overflow-auto'>
			<NavBar />
			{children}
		</div>
	)
}

export default DefaultLayout
