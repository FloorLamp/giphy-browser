import {
    START_FETCHING,
    INPUT_QUERY,
    RECEIVE_GIFS,
    OPEN_IMAGE,
    CLOSE_IMAGE,
} from "./actions"

const gifs = (state = {}, action) => {
    switch (action.type) {
        case START_FETCHING:
            return {
                ...state,
                isFetching: true,
                isDoneFetching: false,
            }
        case INPUT_QUERY:
            return {
                ...state,
                query: action.query,
                results: [],
                isDoneFetching: false,
            }
        case RECEIVE_GIFS:
            if (!action.data.data && action.data.message) {
                return {
                    ...state,
                    error: action.data.message,
                    isFetching: false,
                    isDoneFetching: true,
                }
            }

            if (action.data.meta.status >= 400) {
                return {
                    ...state,
                    error: action.data.meta.msg,
                    isFetching: false,
                    isDoneFetching: true,
                }
            }

            const offset =
                action.data.pagination.offset + action.data.pagination.count
            return {
                ...state,
                error: "",
                [action.which]: state[action.which].concat(action.data.data),
                isFetching: false,
                isDoneFetching: true,
                offset,
                hasMore: offset < action.data.pagination.total_count,
            }
        case OPEN_IMAGE:
            return {
                ...state,
                openedImage: {
                    preview: action.preview,
                    original: action.original.url,
                    width: action.original.width,
                    height: action.original.height,
                },
            }
        case CLOSE_IMAGE:
            return {
                ...state,
                openedImage: null,
            }
        default:
            return state
    }
}

export default gifs
