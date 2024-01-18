import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import tokenAction from './tokenAction'
import loginSlice from './Login/Login'
import addressSlice from './Address/address'
import tokenSelectedSlice from './TokenSelected/tokenSelected'
import inputValuesSlice from './InputValues/inputValues'
import gasPrice from './Gasprices/GasPrice'
// import themeReducer from "../theme/ThemeSlice";
import  faction  from "./faction";
import tokenDisplay from "./TokenDisplay/tokenDisplay";

const reducers = combineReducers({
  faction: faction,
  tokenAction: tokenAction,
  gasPrice: gasPrice,
  addressSlice: addressSlice,
  inputValuesSlice: inputValuesSlice,
  loginSlice: loginSlice,
  tokenSelectedSlice:tokenSelectedSlice,
  tokenDisplay: tokenDisplay

});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  // theme: themeReducer,
  middleware: [thunk],
})
export const instanceStore = store
export default store
