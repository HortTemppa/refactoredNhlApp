var express = require("express");
var nhlApp = express();
var path = require("path");
var PORT = process.env.PORT || 3001;
nhlApp.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
