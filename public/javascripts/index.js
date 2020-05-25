const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    //Search Section
        let searchForm = document.getElementById('search-form')
        let albumList = document.getElementById('album-list')

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
                    albums.forEach(album=>{
                        // let albumFrag = new DocumentFragment()
                        let ul = document.createElement('ul')
                        let span = document.createElement('span')
                        let albumCover = document.createElement('img')
                        span.innerHTML = `${album.name} ~ ${album.artists[0].name}`
                        albumCover.src = album.images[0].url
                        ul.appendChild(albumCover)
                        ul.appendChild(span)
                        // ul.addEventListener('click',()=>{
                        //     album.tr
                        // })
                        albumList.appendChild(ul)
                    })
                })
                
                .catch(function (error) {
                    console.log(error);
                });

            input.target[0].value = ''
        })
    //Canvas Section
    canvas = document.getElementById('track-canvas');
    ctx = canvas.getContext('2d')
    let trackId = '0N3W5peJUQtI4eyR6GJT5O';
    axios.get(`/tracks/${trackId}`)
    .then((response) => {
        console.log(response)
        const spotifyTrack = response;
        const segments = spotifyTrack.data.segments;
        //LINE
        ctx.beginPath()
        ctx.moveTo(0, Math.abs(segments[1].loudness_start*2))
        segments.slice(2).forEach((segment) => {
            ctx.lineTo(segment.start * 5, Math.abs(segment.loudness_start*2))

        })
        ctx.strokeStyle = '#4db8ff';
        ctx.stroke();

        //CIRCLES
        segments.slice(1).forEach((segment) => {
            ctx.beginPath()
            ctx.arc(segment.start * 5, Math.abs(segment.loudness_start * 2), 1, 0, Math.PI * 2)
            ctx.fillStyle ='#ff859f'
            ctx.fill();
        })
        
    })
    .catch(function (error) {
        console.log(error);
    });
    

  
     
})
