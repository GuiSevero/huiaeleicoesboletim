var server = '/';
var socket = io && io.connect(server);
//Evento de final de jogo
socket.on('new_candidato', function(data){
	console.log(data)
});