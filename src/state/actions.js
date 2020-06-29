import { fetchTrending as giphyTrending, fetchSearch } from "../utils/giphy"

export const fetchSearchResults = () => {
    return (dispatch, getstate) => {
        const { query } = getstate()
        if (!query) {
            return
        }

        dispatch(startFetching())
        fetchSearch(query).then(data => dispatch(receiveSearchResults(data)))
    }
}

export const fetchTrendingIfNeeded = () => {
    return (dispatch, getstate) => {
        const { isFetching, trending } = getstate()
        if (trending.length || isFetching) {
            return
        }

        dispatch(startFetching())
        giphyTrending().then(data => dispatch(receiveTrending(data)))
    }
}

export const fetchNextPage = () => {
    return (dispatch, getstate) => {
        const { offset, query, isFetching } = getstate()

        if (isFetching) {
            return
        }

        dispatch(startFetching())
        if (query) {
            fetchSearch(query, offset).then(data =>
                dispatch(receiveSearchResults(data))
            )
        } else {
            giphyTrending(offset).then(data => dispatch(receiveTrending(data)))
        }
    }
}

export const START_FETCHING = "START_FETCHING"
const startFetching = () => ({
    type: "START_FETCHING",
})

export const RECEIVE_TRENDING = "RECEIVE_TRENDING"
export const receiveTrending = data => ({
    type: "RECEIVE_TRENDING",
    data,
})

export const INPUT_QUERY = "INPUT_QUERY"
export const inputQuery = query => ({
    type: "INPUT_QUERY",
    query,
})

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS"
const receiveSearchResults = data => ({
    type: "RECEIVE_SEARCH_RESULTS",
    data,
})

export const OPEN_IMAGE = "OPEN_IMAGE"
export const openImage = url => ({
    type: "OPEN_IMAGE",
    url,
})

export const CLOSE_IMAGE = "CLOSE_IMAGE"
export const closeImage = () => ({
    type: "CLOSE_IMAGE",
})
