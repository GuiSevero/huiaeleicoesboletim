var rs = /estado\=rs/.test(window.location.href);
var sp = /estado\=sp/.test(window.location.href);

if (!rs && ! sp) {
	window.location.href = './index.html?estado=rs';
}

var estado = (rs) ? 'rs' : 'sp';

var exibeResultados = $('#resultados').size();

var exibeFundoCandidatos = false;

if (rs) {
	var exibeFundoCandidatos = true;
	var candidatos = [
		{
			id: 'ivan',
			nome: 'Ivan – Ele quebra mas faz!',
			partido: 'PHP',
			numero: '24666'
		},
		{
			id: 'gabi',
			nome: 'Gabriela Jung – Para musar por mais 4 anos!',
			partido: 'PNG',
			numero: '77777'
		},
		{
			id: 'dani',
			nome: 'Daniela Machado – A número 1 no coração do povão.',
			partido: 'PPT',
			numero: '00001'
		},
		{
			id: 'dome',
			nome: 'Domênica - Se é para dançar, vá com quem tem experiência.',
			partido: 'PSD',
			numero: '13171'
		},
		{
			id: 'bruno',
			nome: 'Bruno - Ponha o dedo na consciência e vote!',
			partido: 'ASP',
			numero: '00004'
		}
	];
} else {
	var candidatos = [
		{
			id: 'carolina',
			nome: 'Carolina Lorenzi - Simpatia nas alturas.',
			partido: 'PPT',
			numero: '21013'
		},
		{
			id: 'alexandre',
			nome: 'Alexandre Vasquez - De passinho em passinho vamos vencer essa batalha',
			partido: 'TXT',
			numero: '12345'
		},
		{
			id: 'talita',
			nome: 'Talita Hirahata - Pior que tá, não fica',
			partido: 'PDF',
			numero: '32052'
		},
		{
			id: 'jana',
			nome: 'Jana - Você não sabe, mas ela já sabe',
			partido: 'ORG',
			numero: '54321'
		},
		{
			id: 'cris',
			nome: 'Cris Samelli - Não deixa o samba morre!',
			partido: 'XLS',
			numero: '11981'
		}
	];
};

Parse.initialize(
	'BBQtIuI6B3xGuBcG4rsx05NcQsR2qIoLVqtyiKzv',
	'JDwl5YgOhwqM3FLN4QAUoVYCR1ejIT0rBtyfVYLk'
);

if (exibeResultados) {
	var resultados = new Resultado(candidatos);
} else {
	var urna = new Urna(candidatos, exibeFundoCandidatos);
};
