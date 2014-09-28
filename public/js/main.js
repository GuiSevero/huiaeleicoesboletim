var server = '/';
var socket = io && io.connect(server);

socket.on('new_candidato', function(data){
	console.log(data)
});