import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"

import reducer from "./reducers"
import initialState from "./initialState"

const loggerMiddleware = createLogger()

const createStore = () =>
    reduxCreateStore(
        reducer,
        initialState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
export default createStore
