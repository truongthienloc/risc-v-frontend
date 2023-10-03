import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
import {IAssembleData} from '~/interfaces/data'

export interface AssemblingState {
	assembleData: IAssembleData | null
}

const initialState: AssemblingState = {
	assembleData: null,
}

const assemblingSlice = createSlice({
	name: 'assembling',
	initialState,
	reducers: {
		setAssembleData(state, action) {
			state.assembleData = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(HYDRATE, (state, action: any) => {
			return {
				...state,
				...action.payload.assembling,
			}
		})
	},
})

export const assemblingActions = assemblingSlice.actions
export default assemblingSlice
