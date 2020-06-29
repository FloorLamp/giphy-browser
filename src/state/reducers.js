import { RECEIVE_TRENDING, OPEN_IMAGE, CLOSE_IMAGE } from "./actions"

const gifs = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TRENDING:
            return {
                ...state,
                trending: action.data.data,
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
