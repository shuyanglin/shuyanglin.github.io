const express = require("express");
const app = express();

app.listen(8000, () => console.log("listening at port 8000."));
app.use(express.static('public'));