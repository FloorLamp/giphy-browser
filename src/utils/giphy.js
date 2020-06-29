const API_KEY = "luzY24RLgN382SQuw506TE3cS6LwmX0L"
const GIF_ENDPOINT = "https://api.giphy.com/v1/gifs"

export const fetchTrending = (offset = 0) =>
    fetch(
        `${GIF_ENDPOINT}/trending?api_key=${API_KEY}&limit=50&&offset=${offset}`
    ).then(res => res.json())

export const fetchSearch = (q, offset = 0) =>
    fetch(
        `${GIF_ENDPOINT}/search?api_key=${API_KEY}&q=${q}&limit=50&&offset=${offset}`
    ).then(res => res.json())
