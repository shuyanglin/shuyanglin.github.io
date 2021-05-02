const express = require("express");
const app = express();

app.use(express.static('public')); 
app.listen(8000, () => console.log("listening at port 8000."));

app.get('/api', function (request, response) {
    console.log("get request");
    response.end();
});