const express = require("express");
const axios = require("axios");
const app = express(); 
const PORT = 3000;
const moment = require('moment');

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`);
    
    let date = moment().subtract(2, 'days').format().slice(0,10);
    //change .subtract(?) to be 1 when pushing to production

    axios.get("https://api.github.com/users/canoespinoza/events")
    //change username for whoever (eventually template literal)
    .then((res) => {
        let numCommits = res.data.filter(event => event.type === 'PushEvent' && event.created_at.slice(0,10) === date)
        .reduce((count,event) => {
           return count + event.payload.commits.length; 
        },0);

        console.log(numCommits);
    })
});
