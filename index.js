const express = require("express");
const app = express();

app.use(express.static('public')); 
app.listen(8001, () => console.log("listening at port 8001."));

app.get('/api', function (request, response) {
    console.log("got request");
    var km = {
        ride: 1000,
        run: 5000
    }
    response.json({
        message: "status ok",
        km: km
    })
});