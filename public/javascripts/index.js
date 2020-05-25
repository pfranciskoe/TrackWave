const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    //Search Section
        let searchForm = document.getElementById('search-form')
        let albumList = document.getElementById('album-list')
        let canvasList = document.getElementById('album-canvi')
        function clearList(list){
            list.innerHTML = ''
        }
      
        searchForm.addEventListener('submit',(input)=>{
        event.preventDefault()
            let query = input.target[0].value
            axios.get(`/search?string=${query}`)
                .then((response) => {console.log(response)
                    let albums = response.data.albums.items;
                    clearList(albumList)
                    clearList(canvasList)
                    albums.forEach(album=>{
                        let ul = document.createElement('ul')
                        let span = document.createElement('span')
                        let albumCover = document.createElement('img')
                        span.innerHTML = `${album.name} ~ ${album.artists[0].name}`
                        albumCover.src = album.images[0].url
                        ul.appendChild(albumCover)
                        ul.appendChild(span)
                        ul.addEventListener('click',()=>{
                            fetchAndMakeVis(album);
                            clearList(albumList);
                        })
                        albumList.appendChild(ul)
                    })
                })
                
                .catch(function (error) {
                    console.log(error);
                });

            input.target[0].value = ''
        })
    
    function fetchAndMakeVis(album) {
        clearList(canvasList)
        axios.get(`/albums/${album.id}`)
        .then((response) => {
            let tracks = response.data.items;
            tracks.forEach((track) => {
                makeCanvas(track)
            })
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    function makeCanvas(track){
        let newCanvas = document.createElement('canvas');
        newCanvas.width = 1000;
        newCanvas.height = 150;
        newCanvas.id = track.id
        let div = document.createElement('div')
        let para = document.createElement('a')
        // let iframe = document.createElement('iframe')
        //     iframe.width = 1000;
        //     iframe.height = 150;
        //     iframe.src = track.external_urls.spotify;
        //     iframe.setAttribute('frameBorder', 0);
        //     iframe.setAttribute('allowtransparency', true);
        //     iframe.setAttribute('allow' = 'encrypted-media');
        para.innerHTML= `${track.name}`
        para.href = track.external_urls.spotify
        div.appendChild(para)
        div.appendChild(newCanvas)
        canvasList.appendChild(div);
        let ctx = newCanvas.getContext('2d')
        let trackId = track.id;
        axios.get(`/tracks/${trackId}`)
        .then((response) => {
            const spotifyTrack = response;
            const segments = spotifyTrack.data.segments;
            //LINE
            ctx.beginPath()
            ctx.moveTo(0, Math.abs(segments[1].loudness_start*2))
            segments.slice(2).forEach((segment) => {
                ctx.lineTo(segment.start * 5, Math.abs(segment.loudness_start*2))

            })
            ctx.strokeStyle = '#529cf7';
            ctx.stroke();

            //CIRCLES
            segments.slice(1).forEach((segment) => {
                ctx.beginPath()
                ctx.arc(segment.start * 5, Math.abs(segment.loudness_start * 2), 1.5, 0, Math.PI * 2)
                ctx.fillStyle ='#f75268'
                ctx.fill();
            })
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
   
    
    

  
     
})
