const axios = require('axios')

document.addEventListener('DOMContentLoaded', () => {
  // Search Section
  const searchForm = document.getElementById('search-form')
  const albumList = document.getElementById('album-list')
  const canvasList = document.getElementById('album-canvi')
  const albumTitle = document.getElementById('album-title')
  function clearList (list) {
    list.innerHTML = ''
  }

  searchForm.addEventListener('submit', (input) => {
    event.preventDefault()
    clearList(albumTitle)
    const query = input.target[0].value
    axios.get(`/search?string=${query}`)
      .then((response) => {
        const albums = response.data.albums.items
        clearList(albumList)
        clearList(canvasList)
        albums.forEach(album => {
          const ul = document.createElement('ul')
          const span = document.createElement('span')
          const albumCover = document.createElement('img')
          span.innerHTML = `${album.name} ~ ${album.artists[0].name}`
          albumCover.src = album.images[0].url
          ul.appendChild(albumCover)
          ul.appendChild(span)
          ul.addEventListener('click', () => {
            fetchAndMakeVis(album)
            clearList(albumList)
          })
          albumList.appendChild(ul)
        })
      })

      .catch(function (error) {
        console.log(error)
      })

    input.target[0].value = ''
  })

  function fetchAndMakeVis (album) {
    clearList(canvasList)
    clearList(albumTitle)
    let newAlbumHeader = document.createElement('h3');
    let albumArtwork = document.createElement('img');
    newAlbumHeader.innerText = `${album.name}~${album.artists[0].name}`;
    albumArtwork.src = album.images[0].url;
    albumTitle.appendChild(albumArtwork);
    albumTitle.appendChild(newAlbumHeader);
    axios.get(`/albums/${album.id}`)
      .then((response) => {
        const tracks = response.data.items
        makeCanvasCheck(tracks)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  function makeCanvasCheck(tracks){
    if (tracks.length > 0){
      makeCanvas(tracks.shift()).then(() => {
        makeCanvasCheck(tracks)
      })
    } else {
      return null
    }
  }
  async function makeCanvas (track) {
    const newCanvas = document.createElement('canvas')
    newCanvas.width = 1000
    newCanvas.height = 150
    newCanvas.className = 'wave'
    const div = document.createElement('div')
    const para = document.createElement('a')

    para.innerHTML = `${track.name}` 
    para.href = `spotify:track:${track.id}`
    div.appendChild(para)
    div.appendChild(newCanvas)
    canvasList.appendChild(div)
    const ctx = newCanvas.getContext('2d')
    const trackId = track.id
    axios.get(`/tracks/${trackId}`)
      .then((response) => {
        const spotifyTrack = response
        const segments = spotifyTrack.data.segments
        // LINE
        ctx.beginPath()
        ctx.moveTo(0, Math.abs(segments[1].loudness_start * 2))
        segments.slice(2).forEach((segment) => {
          ctx.lineTo(segment.start * 5, Math.abs(segment.loudness_start * 2))
        })
        ctx.strokeStyle = '#529cf7'
        ctx.stroke()

        // CIRCLES
        segments.slice(1).forEach((segment) => {
          ctx.beginPath()
          ctx.arc(segment.start * 5, Math.abs(segment.loudness_start * 2), 1.5, 0, Math.PI * 2)
          ctx.fillStyle = '#f75268'
          ctx.fill()
        })
          
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})
