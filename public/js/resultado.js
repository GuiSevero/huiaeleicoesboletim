
var Resultado = function(candidatos) {

	var votos = new Colecao_Votos();

	votos.apuracao(function(response) {
		var total = 0;
		for (var i in candidatos) {
			var numero = candidatos[i].numero;
			candidatos[i].votos = (response[numero]) ? response[numero].length : '0';
			total += candidatos[i].votos * 1;
		};
		var votosNulos = (response['branco']) ? response['branco'].length : 0;
		var votosBrancos = (response['branco']) ? response['branco'].length : 0;
		
		candidatos.push({
			nome: 'Brancos',
			votos: votosNulos
		});
		
		candidatos.push({
			nome: 'Nulos',
			votos: votosBrancos
		});

		total = total + votosNulos + votosBrancos;

		candidatos = _.sortBy(candidatos, function(candidato) {
			return candidato.votos;
		}).reverse();

		var html = '';
		for (var i in candidatos) {
			var candidato = candidatos[i],
				porcentagem = Math.round((100 * candidato.votos) / total);
			html += porcentagem + '% - ' + candidato.nome + ': ' + candidato.votos + '<br />';
		};
		$('#resultados').html(html);
	});
};