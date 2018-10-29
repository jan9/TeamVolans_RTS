//CITATION: Used previous projects as a template for setting up Node.js + express
//Also used the following guide:
//https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/?a=13

//sets up express and handlebars
var express = require('express');
var app = express();

//using port 4865 for the site
app.set('port', 4865);

//use what is in public - javascript and css
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


//Need to see if this is needed or can be removed
app.listen(app.get('port'), function(){
  console.log('Medieval Mayhem started on http://flipX.engr.oregonstate.edu:4865/);
});
