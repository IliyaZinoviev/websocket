const HOST = location.origin.replace(/^http/, 'ws')
// создать подключение
var socket = new WebSocket(HOST);

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  socket.send(this.message.value);
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
  showMessage(event.data);
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}