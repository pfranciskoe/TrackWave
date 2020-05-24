const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    //Search Section
        let searchForm = document.getElementById('search-form')
        let albumList = document.getElementById('album-list')
        searchForm.addEventListener('submit',(input)=>{
        event.preventDefault()
            let query = input.target[0].value
            axios.get(`/search?string=${query}`)
                .then((response) => {console.log(response)
                    let albums = response.data.albums.items;
                    albumList.innerHTML = ''
                    albums.forEach(album=>{
                        // let albumFrag = new DocumentFragment()
                        let ul = document.createElement('ul')
                        ul.innerHTML = album.name
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
    let trackId = '6z2O61TBA5HOsVyBesIwWs';
    axios.get(`/tracks/${trackId}`)
    .then((response) => {
        
        const spotifyTrack = response;

        spotifyTrack.data.segments.forEach((segment,sIdx) => {
            segment.pitches.forEach((pitch,pIdx)=>{ 
                ctx.rect((sIdx*10),(pIdx*50),(10 * pitch),50)
                ctx.fillStyle = 'blue'
                ctx.fill()
            })
            
        })
       
    })
    .catch(function (error) {
        console.log(error);
    });
    

  
     
})
