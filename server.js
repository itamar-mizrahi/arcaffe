const express = require("express");
const app = express();
var http = require("http").Server(app);
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const submit = require("./routes/api/submit");
app.use("/api/submit", submit);

const PORT = process.env.PORT || 5000;

var server = http.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});