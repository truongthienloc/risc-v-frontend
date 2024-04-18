import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

function NavBar() {
	const router = useRouter()

	return (
		<nav className='flex flex-row w-full p-6 shadow-lg justify-center gap-12 text-2xl font-bold'>
			{/* <NavItem href='/' value='Home' current={router.pathname} /> */}
			<NavItem href='/coding' value='Coding' current={router.pathname} />
			{/* <NavItem href='/about' value='About' current={router.pathname} /> */}
			<NavItem href='https://forms.gle/yTFeKCdLuUokpAgd7' value='Feedback' current={router.pathname} target='_blank'/>
		</nav>
	)
}

interface NavItemProps {
	href: string
	value: string
	current?: string
	target?: string
}

function NavItem({ href, value, current, target }: NavItemProps) {
	return (
		<Link
			className={clsx('hover:text-[#1976d2]', {
				'text-[#1976d2]':
					current &&
					current.length > 1 &&
					href.split('/')[1] === current.split('/')[1],
			})}
			href={href} target={target}>
			{value}
		</Link>
	)
}

export default NavBar
