// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const session = require("express-session");
const app = express();
let ejs = require('ejs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.set("view engine", "ejs");
const { URL } = require('url'); // No .Url and with { }


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/", function(req, res){
  var data = httpGet('http://services.rnli.org/api/launches?numberOfShouts=50')
  data = JSON.parse(data)
  data.forEach(launch => {
    var time = launch.launchDate
    time = time.split("T")
    
    var actualtime = time[1].split(":")
    actualtime = actualtime[0] + ":" + actualtime[1]
    
    var date = time[0].split("-")
    var actualdate = date[2] + "." + date[1] + "." + date[0]
    
    launch.time = actualtime
    launch.date = actualdate
  })
  
  res.render(__dirname + "/views/index.ejs", {
    launches: data
  })
})

app.get("/selection", function(req, res){
  const url = new URL('https://latestlaunches.glitch.me' + req.url)
  const amount = url.searchParams.get('amount')
  if(amount > 50 || amount < 1) return res.send('<style>p{color:white;}</style><p>Invalid value</p>')
  var data = httpGet('http://services.rnli.org/api/launches?numberOfShouts=' + amount)
  
  data = JSON.parse(data)
  data.forEach(launch => {
    var time = launch.launchDate
    time = time.split("T")
    
    var actualtime = time[1].split(":")
    actualtime = actualtime[0] + ":" + actualtime[1]
    
    var date = time[0].split("-")
    var actualdate = date[2] + "." + date[1] + "." + date[0]
    
    launch.time = actualtime
    launch.date = actualdate
  })  
  
  res.render(__dirname + "/views/selection.ejs", {
    launches: data
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});