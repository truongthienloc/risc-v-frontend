import {configureStore, combineReducers, createAction, ThunkAction, Action} from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper'
import {persistReducer, persistStore, PersistConfig} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import codingSlice from './coding/codingSlice'

const rootReducer = combineReducers({
	[codingSlice.name]: codingSlice.reducer,
})

const makeConfiguredStore = () =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
	})

export type AppStore = ReturnType<typeof makeConfiguredStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>

export const makeStore = () => {
	const isServer = typeof window === 'undefined'
	if (isServer) {
		return makeConfiguredStore()
	} else {
		const persistConfig = {
			key: 'nextjs',
			whitelist: [codingSlice.name],
			storage,
		}
		const persistedReducer = persistReducer(persistConfig, rootReducer)
		const store: any = configureStore({
			reducer: persistedReducer,
			devTools: process.env.NODE_ENV !== 'production',
		})
		store.__persistor = persistStore(store)
		return store
	}
}

export const wrapper = createWrapper<AppStore>(makeStore)
export const HydrateAction = createAction<any>(HYDRATE)
