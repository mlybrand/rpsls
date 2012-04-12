var http = require('http');
var url = require('url');

var options = ["rock", "paper", "scissors", "lizard", "spock"];

var whoBeats = {"rock" : { "paper":1, "spock":1},
               "paper" : { "scissors":1, "lizard":1},
               "scissors" : { "rock":1, "spock":1 },
               "lizard" : { "rock":1, "scissors":1 },
               "spock" : { "lizard":1, "paper":1 }
             }

var pickRandom = function() {
  return options[Math.floor(Math.random() * 5)];
}

http.createServer(function(request, response) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;

  response.writeHead(200, 'text/plain');
  if (!query["pick"]) {
    response.write("Please make a pick.");
  } else if (!whoBeats[query["pick"]]) {
    response.write("Please make a VALID pick.");
  } else {
    var myPick = pickRandom();
    response.write("You picked " + query["pick"] + "\n");
    response.write("I picked " + myPick + "\n" );
    if (myPick === query["pick"]) {
      response.write("We tied!\n");
    } else if (whoBeats[query["pick"]][myPick]) {
      response.write("I win!\n");
    } else {
      response.write("You win!\n");
    }
  }
  response.end();
}).listen(8888);

console.log("server running on 8888");