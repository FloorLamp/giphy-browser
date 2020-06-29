import { fetchTrending as giphyTrending, fetchSearch } from "../utils/giphy"

export const fetchSearchResults = () => {
    return (dispatch, getstate) => {
        const { query } = getstate()
        if (!query) {
            return
        }

        dispatch(startFetching())
        fetchSearch(query).then(data => dispatch(receiveGifs("results", data)))
    }
}

export const fetchTrendingIfNeeded = () => {
    return (dispatch, getstate) => {
        const { isFetching, trending } = getstate()
        if (trending.length || isFetching) {
            return
        }

        dispatch(startFetching())
        giphyTrending().then(data => dispatch(receiveGifs("trending", data)))
    }
}

export const fetchNextPage = () => {
    return (dispatch, getstate) => {
        const { offset, query, isFetching, hasMore } = getstate()

        if (isFetching || !hasMore) {
            return
        }

        dispatch(startFetching())
        if (query) {
            fetchSearch(query, offset).then(data =>
                dispatch(receiveGifs("results", data))
            )
        } else {
            giphyTrending(offset).then(data =>
                dispatch(receiveGifs("trending", data))
            )
        }
    }
}

export const START_FETCHING = "START_FETCHING"
const startFetching = () => ({
    type: "START_FETCHING",
})

export const INPUT_QUERY = "INPUT_QUERY"
export const inputQuery = query => ({
    type: "INPUT_QUERY",
    query,
})

export const RECEIVE_GIFS = "RECEIVE_GIFS"
const receiveGifs = (which, data) => ({
    type: "RECEIVE_GIFS",
    which,
    data,
})

export const OPEN_IMAGE = "OPEN_IMAGE"
export const openImage = (preview, original) => ({
    type: "OPEN_IMAGE",
    preview,
    original,
})

export const CLOSE_IMAGE = "CLOSE_IMAGE"
export const closeImage = () => ({
    type: "CLOSE_IMAGE",
})
