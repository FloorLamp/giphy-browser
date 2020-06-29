import { RECEIVE_TRENDING } from './actions'

const gifs = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TRENDING:
            return {
                ...state,
                trending: action.data.data
            }
        default:
            return state
    }
}

export default gifs