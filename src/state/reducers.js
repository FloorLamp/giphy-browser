import {
    START_FETCHING,
    RECEIVE_SEARCH_RESULTS,
    INPUT_QUERY,
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
                isDoneFetching: false,
            }
        case INPUT_QUERY:
            return {
                ...state,
                query: action.query,
                results: [],
                isDoneFetching: false,
            }
        case RECEIVE_SEARCH_RESULTS: {
            const offset =
                action.data.pagination.offset + action.data.pagination.count
            return {
                ...state,
                results: state.results.concat(action.data.data),
                isFetching: false,
                isDoneFetching: true,
                offset,
                hasMore: offset < action.data.pagination.total_count,
            }
        }
        case RECEIVE_TRENDING: {
            const offset =
                action.data.pagination.offset + action.data.pagination.count
            return {
                ...state,
                trending: state.trending.concat(action.data.data),
                isFetching: false,
                offset,
                hasMore: offset < action.data.pagination.total_count,
            }
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
