const API_KEY = "luzY24RLgN382SQuw506TE3cS6LwmX0L"

export const fetchTrending = (offset = 0) =>
    fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&offset=${offset}`
    ).then(res => res.json())
