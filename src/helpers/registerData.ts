import { IData } from '~/interfaces/data'

const defaultData = '0x00000000'

export function createDefaultRegisterData(): IData[] {
	const data = []
	for (let i = 0; i < 32; i++) {
		data.push({
			name: `x${i}`,
			value: defaultData,
		})
	}
	return data
}
