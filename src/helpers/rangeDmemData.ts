import { IData } from '~/interfaces/data'

const LENGTH_OF_DMEM = 10

export function createRangeDmemData(data: IData[], start: string): IData[] {
	const startDec = parseInt(start, 16)
	const res = []
	for (let i = 0; i < LENGTH_OF_DMEM; i++) {
		const addressDec = startDec + 4 * i
		const addressHex = '0x' + addressDec.toString(16).padStart(8, '0')

		const DMemData = data.find((value) => value.name === addressHex)
		let value = '0x00000000'
		if (DMemData) {
			value = DMemData.value
		}

		res.push({
			name: addressHex,
			value: value,
		})
	}

	return res
}
