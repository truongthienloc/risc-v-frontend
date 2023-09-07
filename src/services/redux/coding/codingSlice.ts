import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'

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
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.coding,
			}
		},
	},
})

export const codingActions = codingSlice.actions
export default codingSlice
