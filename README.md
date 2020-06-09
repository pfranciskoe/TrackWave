
<h1 align="center" > ~ TrackWave ~ </h1>
<h3 align="center"> Search for any album and see it. </h3>
<h5 align="center">
<a href='https://trackwave.herokuapp.com/'>Live Site</a> | <a href=https://github.com/pfranciskoe/TrackWave>Github</a>
</h5>

## User Journey

* Users are greated by a clean minimal homepage.
* Search for any album on spotify.
* Explore what the music looks like.
* ...then listen to it and see how your perception changed.

## Core Features

### `Search`
* Search the complete spotify library by artist, song, or album.
* View the top twenty results, ordered by relevance.
* Utilizes spotitify client credentials flow to access API without requiring users to log in to their account
```
app.get('/search', (request, response) => {
  //Fetch accessToken from Spotify API
  fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(res => res.json())
    .then((body) => {
      const spotifyAccessToken = body.access_token
      //Use token to access spotify api search endpont, passing it the query string
      fetch(`https://api.spotify.com/v1/search?q=${request.query.string.split(' ').join('%20')}&type=album`,
        { headers: { Authorization: `Bearer ${spotifyAccessToken}` } })
        .then((response) => {
          return response.text()
        }).then((body) => {
          //Send parsed response to frontend
          let results = JSON.parse(body)
          response.send(results)
        })
    })
})
```
<img
		width="300"
		alt="Spotify API"
		src="https://github.com/pfranciskoe/TrackWave/blob/master/public/AuthG_ClientCredentials.png">
### `Track Visualizer`
* Fetch data from Spotify API.
* See analyzed track data for each song on the album.
* Compare tracks to eachother.

### `User Interface`
* Snappy
* Simple
* Clean


## Tech / Framework:
* Javascript
* Node.JS
* CSS
* Webpack
* Spotify Web API

### Upcoming Features:

* Dynamic Soundwave Visualization
* ThreeJS-powered full-album Visualization
* Spotify SDK player implementation