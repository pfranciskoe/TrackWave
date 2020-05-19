const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const keys = require('./config/keys')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static('public'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})
const client_id = keys.clientId; // Your client id
const client_secret = keys.clientSecret; // Your secret

let authOptions = {
  headers: {
    Authorization: ('Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials',
  method:'POST',
  // json: true
};
// create route to get single book by its isbn
app.get('/tracks/:trackId', (request, response) => {
  // make api call using fetch
  fetch('https://accounts.spotify.com/api/token',authOptions)
    .then(res => res.json())
  .then((body) => {
      console.log(body)
      let spotifyAccessToken = body['access_token'];
    fetch(`https://api.spotify.com/v1/audio-analysis/${request.params.trackId}`, 
      { headers: { Authorization: `Bearer ${spotifyAccessToken}` } })
      .then((response) => {
        return response.text();
      }).then((body) => {
        let results = JSON.parse(body)
        response.send(results)
      });
  })
    
});



app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})

