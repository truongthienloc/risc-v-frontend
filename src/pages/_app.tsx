// import dynamic from 'next/dynamic'
// dynamic(() => {return import('codemirror/addon/mode/simple')}, {ssr: false})
import '~/styles/globals.scss'
import '~/styles/codeEditor.scss'
import 'codemirror/lib/codemirror.css'
import 'react-toastify/dist/ReactToastify.css'
import type {AppPropsWithLayout} from '~/interfaces/app'
import Head from 'next/head'
import DefaultLayout from '~/layouts/DefaultLayout'
import {ToastContainer} from 'react-toastify'
import {useEffect} from 'react'
import {wrapper} from '~/services/redux'
import {PersistGate} from 'redux-persist/integration/react'
import {useStore, Provider} from 'react-redux'

function App({Component, pageProps}: AppPropsWithLayout) {
	const store: any = useStore()
	// const {store, props} = wrapper.useWrappedStore(pageProps)
	// const {} = props
	const getLayout =
		Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

	useEffect(() => {
		if (window) {
			import('codemirror/addon/mode/simple')
		}
	}, [])
	return getLayout(
		// <Provider store={store}>
			<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
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
			</PersistGate>
		// </Provider>
	)
}

export default wrapper.withRedux(App)
