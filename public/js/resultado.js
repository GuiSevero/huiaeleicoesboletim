
var Resultado = function(candidatos) {
	var votos = new Colecao_Votos();
	// votos.apuracao(this.adiciona);
	votos.apuracaoOnline(this.adiciona);
};

Resultado.prototype = {
	adiciona: function(origem, dados) {
		var total = 0;
		for (var i in candidatos) {
			var numero = candidatos[i].numero;
			candidatos[i].votos = (dados[numero]) ? dados[numero].length : '0';
			total += candidatos[i].votos * 1;
		};

		var votosBrancos = (dados['branco-'+estado]) ? dados['branco-'+estado].length : 0;
		candidatos.push({
			nome: 'Brancos',
			votos: votosBrancos
		});
		
		var votosNulos = (dados['nulo-'+estado]) ? dados['nulo-'+estado].length : 0;
		candidatos.push({
			nome: 'Nulos',
			votos: votosNulos
		});

		total = total + votosNulos + votosBrancos;

		candidatos = _.sortBy(candidatos, function(candidato) {
			return candidato.votos;
		}).reverse();

		var html = '';
		for (var i in candidatos) {
			var candidato = candidatos[i],
				porcentagem = Math.round((100 * candidato.votos) / total);
			html += (porcentagem ? porcentagem : 0) + '% - ' + candidato.nome + ': ' + candidato.votos + '<br />';
		};
		$('#resultados').append('<h2>' + origem + '</h2>' + html);
	}
};