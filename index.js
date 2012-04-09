var http = require('http');

var options = ["rock", "paper", "scissors", "lizard", "spock"]

var pickRandom = function() {

  return options[Math.floor(Math.random() * 5)];
}

http.createServer(function(request, response) {
  response.writeHead(200, 'text/plain');
  response.write(pickRandom());
  response.end();
}).listen(8888);

console.log("server running on 8888");