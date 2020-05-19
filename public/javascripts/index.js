const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

    let trackId = '11dFghVXANMlKmJXsNCbNl';
    axios.get(`/tracks/${trackId}`)
    .then((response) => {
        console.log(response); 
    })
    .catch(function (error) {
        console.log(error);
    });
    
})
