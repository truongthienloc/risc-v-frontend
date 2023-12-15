import axios from 'axios'

const client = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 3000,
})

export default client
