import '~/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import type {AppPropsWithLayout} from '~/interfaces/app'
import Head from 'next/head'
import DefaultLayout from '~/layouts/DefaultLayout'
import {ToastContainer} from 'react-toastify'

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)
	return getLayout(
		<>
			<Head>
				<title>RISC-V</title>
				<meta charSet='utf-8' />
			</Head>
			<Component {...pageProps} />
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme='light'
			/>
		</>
	)
}
