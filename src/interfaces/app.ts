import {NextPage} from 'next'
import {AppProps} from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactNode) => React.ReactNode
}

export interface AppPropsWithLayout extends AppProps {
	Component: NextPageWithLayout
}
