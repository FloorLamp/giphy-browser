import {
    START_FETCHING,
    RECEIVE_TRENDING,
    OPEN_IMAGE,
    CLOSE_IMAGE,
} from "./actions"

const gifs = (state = {}, action) => {
    switch (action.type) {
        case START_FETCHING:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_TRENDING:
            return {
                ...state,
                trending: state.trending.concat(action.data.data),
                isFetching: false,
                offset:
                    action.data.pagination.offset +
                    action.data.pagination.count,
            }
        case OPEN_IMAGE:
            return {
                ...state,
                openedImage: action.url,
            }
        case CLOSE_IMAGE:
            return {
                ...state,
                openedImage: "",
            }
        default:
            return state
    }
}

export default gifs
