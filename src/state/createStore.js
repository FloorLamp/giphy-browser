import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunkMiddleware from 'redux-thunk'

import reducer from "./reducers"
import initialState from './initialState'

const createStore = () => reduxCreateStore(reducer, initialState, applyMiddleware(thunkMiddleware))
export default createStore