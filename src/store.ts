
import { configureStore } from '@reduxjs/toolkit';
import dataSliceInput from './features/DataSlice';

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({ dataInput: dataSliceInput })
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
});