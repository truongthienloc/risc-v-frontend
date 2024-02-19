import { FiveSections, SingleStandardPipeline } from '~/interfaces/pipeline'

export const pushFiveSections = (
	fiveSections: FiveSections,
	newSection: SingleStandardPipeline | null
): FiveSections => {
	const result = [
		newSection,
		fiveSections[0],
		fiveSections[1],
		fiveSections[2],
		fiveSections[3],
	] as FiveSections
	return result
}
