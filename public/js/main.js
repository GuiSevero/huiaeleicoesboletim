var exibeResultados = $('#resultados').size();

var candidatos = [
	{
		id: 'ivan',
		nome: 'Ivan Aires Stumpf',
		partido: 'PHP',
		numero: 11111
	},
	{
		id: 'gabi',
		nome: 'Gabriela Jung',
		partido: 'MP3',
		numero: 22222,
	},
	{
		id: 'dani',
		nome: 'Daniela Machado',
		partido: 'XLS',
		numero: 33333
	},
	{
		id: 'dome',
		nome: 'Domênica Camatti',
		partido: 'PSD',
		numero: 44444,
	}
];

if (exibeResultados) {
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
} else {
	var urna = new Urna(candidatos);
};