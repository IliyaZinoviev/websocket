var http = require("http");
var fs = require("fs");
var WebSocketServer = new require('ws');
const PORT = process.env.PORT || 3000;

var server = http.createServer(function(request, response){
    console.log(`Запрошенный адрес: ${request.url}`);
    if(request.url.startsWith("/public/")){
        var filePath = request.url.substr(1);
        fs.readFile(filePath, function(error, data){    
            if(error){
                response.statusCode = 404;
                response.end("Ресурс не найден!");
            }   
            else{
                response.end(data);
            }
            return;
        })
    }
}).listen(PORT, () => console.log(`Listening on ${ PORT }`));

// подключенные клиенты
var clients = {};

var webSocketServer = new WebSocketServer.Server({
    server: server
});

webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for (var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});