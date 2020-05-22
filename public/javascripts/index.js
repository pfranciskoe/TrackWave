const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

    canvas = document.getElementById('track-canvas');
    ctx = canvas.getContext('2d')

    let trackId = '5f0LVeG7bQD0p20iSqA9F0';
    axios.get(`/tracks/${trackId}`)
    .then((response) => {
        
        const spotifyTrack = response;
        console.log(spotifyTrack);
        spotifyTrack.data.segments.forEach((segment,idx) => {
            
            if ((idx % 2) === 0) { ctx.fillStyle = '#a2cdf5'} else {
                ctx.fillStyle = '#0373fc'
            }
            segment.pitches.forEach((pitchPoint,idx) =>{
                if (idx === 0 ){
                ctx.beginPath()
                ctx.arc(2*(segment.start + (segment.duration / 2)), 500 * pitchPoint, 2*(segment.duration/2), 0, 2 * Math.PI, false)
                ctx.fill()
                }
            })

        })

    })
    .catch(function (error) {
        console.log(error);
    });
    

  
     
})
