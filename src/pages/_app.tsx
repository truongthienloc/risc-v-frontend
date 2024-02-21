import '~/styles/globals.scss'
import '~/styles/codeEditor.scss'
import 'codemirror/lib/codemirror.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppPropsWithLayout } from '~/interfaces/app'
import Head from 'next/head'
import DefaultLayout from '~/layouts/DefaultLayout'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useRef } from 'react'
import { wrapper } from '~/services/redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore, Provider } from 'react-redux'
import client from '~/services/axios'

function App({ Component, pageProps }: AppPropsWithLayout) {
	const store: any = useStore()
	const isStart = useRef(true)
	// const {store, props} = wrapper.useWrappedStore(pageProps)
	// const {} = props
	const getLayout =
		Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

	useEffect(() => {
		if (window) {
			import('codemirror/addon/mode/simple')
		}

		if (isStart.current) {
			isStart.current = false
			toast.promise(client.get('/', { timeout: 120000 }), {
				pending: 'Đang khởi động trình biên dịch',
				success: 'Khởi động thành công',
				error: 'Khởi động thất bại',
			})
		}
	}, [])
	return getLayout(
		// <Provider store={store}>
		<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
			<Head>
				<title>RISC-V</title>
				<meta charSet='utf-8' />
				<link rel='icon' href='/images/LogoUIT.png' />
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
		</PersistGate>
		// </Provider>
	)
}

export default wrapper.withRedux(App)
