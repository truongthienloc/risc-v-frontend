import client from '~/services/axios'
import apisConfig from '~/configs/apis.json'
import { IPureAssembleData } from '~/interfaces/data2'

export const runCode = (code: string) => {
	return new Promise<IPureAssembleData>(async (resolve, rejects) => {
		try {
			const res = await client.post(apisConfig.core, {
				code: code,
			})
			const data = res.data as IPureAssembleData
			resolve(data)
		} catch (error) {
			rejects(error)
		}
	})
}
