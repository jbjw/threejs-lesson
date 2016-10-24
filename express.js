//
'use strict';

var url = require("url");
var path = require("path");
var fs = require("fs");
var http = require("http");
var express = require("express");

var host = "";
var port = 8080;

var app = express();

function log(req, res, next) {
	req.time = Date.now(); // new Date();
	console.log(req.time + " " + req.method + " " + req.url);
	next();
}

app.use(log);
app.use(express.static("../client", {index: "sandbox.html"}));
//app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(req, res){
	res.send("get received");
});

app.post("/", function (req, res) {
	res.send("post received")
});

app.listen(port, function () {
	console.log("Example app listening on port " + port);
	//host?
});
