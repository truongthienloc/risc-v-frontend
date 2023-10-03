import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
import {IAssembleData} from '~/interfaces/data'
// import {runCode} from '~/apis/code'
// import { HydrateAction } from '..'

export interface CodingState {
	code: string
}

const initialState: CodingState = {
	code: '',
}

const codingSlice = createSlice({
	name: 'coding',
	initialState,
	reducers: {
		setCode(state, action) {
			state.code = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(HYDRATE, (state, action: any) => {
			return {
				...state,
				...action.payload.coding,
			}
		})
		// .addCase(assembleCodeThunk.fulfilled, (state, action) => {
		// 	state.assembleData = action.payload
		// })
	},
})

// export const assembleCodeThunk = createAsyncThunk(
// 	'coding/assemble_code',
// 	async (code: string) => {
// 		return await runCode(code)
// 	}
// )

export const codingActions = codingSlice.actions
export default codingSlice
