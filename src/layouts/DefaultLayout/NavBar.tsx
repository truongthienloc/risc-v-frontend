import Link from "next/link";

function NavBar() {
    return (
        <nav className='flex flex-row w-full p-6 shadow-lg justify-center gap-12 text-2xl font-bold'>
            <Link className='hover:text-[#1976d2]' href={'/'} >
                Trang chủ
            </Link>
            <Link className='hover:text-[#1976d2]' href={'/coding'} >
                Coding
            </Link>
            <Link className='hover:text-[#1976d2]' href={'/feedback'} >
                About
            </Link>
            <Link className='hover:text-[#1976d2]' href={'/feedback'} >
                Feedback
            </Link>
        </nav>
    );
}

export default NavBar;