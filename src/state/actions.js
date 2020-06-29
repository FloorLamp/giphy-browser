import { fetchTrending as giphyTrending } from "../utils/giphy"

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

export const search = query => ({
    type: "SEARCH",
    query,
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
