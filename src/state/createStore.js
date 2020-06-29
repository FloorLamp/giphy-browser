import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import reducer from "./reducers"
import initialState from "./initialState"

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`)

    middlewares.push(logger)
}

const createStore = () =>
    reduxCreateStore(reducer, initialState, applyMiddleware(...middlewares))
export default createStore
