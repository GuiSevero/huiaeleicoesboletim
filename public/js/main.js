var exibeResultados = $('#resultados').size();

var candidatos = [
	{
		id: 'ivan',
		nome: 'Ivan – Ele quebra mas faz!',
		partido: 'PHP',
		numero: 24666
	},
	{
		id: 'gabi',
		nome: 'Gabriela Jung – Para Musar por mais 4 anos!',
		partido: 'PNG',
		numero: 77777
	},
	{
		id: 'dani',
		nome: 'Daniela Machado – A número 1 no coração do povão.',
		partido: 'PPT',
		numero: 00001
	},
	{
		id: 'dome',
		nome: 'Domenica - Se é para dançar, vá com quem tem experiência.',
		partido: 'PSD',
		numero: 13171
	},
	{
		id: 'bruno',
		nome: 'Bruno - Ponha o dedo na consciência e vote!',
		partido: 'PDF',
		numero: 00004
	}
];

Parse.initialize(
	'BBQtIuI6B3xGuBcG4rsx05NcQsR2qIoLVqtyiKzv', 
	'JDwl5YgOhwqM3FLN4QAUoVYCR1ejIT0rBtyfVYLk'
);

if (exibeResultados) {
	var resultados = new Resultado(candidatos);
} else {
	var urna = new Urna(candidatos);
};