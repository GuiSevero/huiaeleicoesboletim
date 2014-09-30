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
	var resultados = new Resultado(candidatos);
} else {
	var urna = new Urna(candidatos);
};