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

export const runCodeForPipeline = (code: string) => {
	return new Promise<IPureAssembleData>(async (resolve, rejects) => {
		try {
			const res = await client.post(apisConfig.pipeline, { code: code})
			const data = res.data as IPureAssembleData
			console.log('Data: ', data);
			resolve(data)
		} catch (error) {
			rejects(error)
		}
	})
}

export const disassemble = (code: string) => {
	return new Promise<string[]>(async (resolve, reject) => {
		try {
			const codeArray = code.split('\n')
			const res = await client.post(apisConfig.disassembler, {
				code: codeArray,
			})
			const data = res.data as string[]
			resolve(data.map((value) => value.split('\t')[1]))
		} catch (error) {
			reject(error)
		}
	})
}
