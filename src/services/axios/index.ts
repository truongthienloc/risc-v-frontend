import axios from 'axios'

const client = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 7000,
})

export default client
