
var Urna = function(candidatos, exibeFundoCandidatos) {
	this.digitos = 5;
	this.numero = '';
	this.nulo = false;
	this.branco = false;
	this.candidatos = new Candidatos(candidatos);
	this.teclas = new Teclas(this);
	this.exibeFundoCandidatos = exibeFundoCandidatos;

	this.textos = {
		legenda: $('#voto-legenda'),
		branco: $('#voto-branco'),
		nulo: $('#voto-nulo'),

		cover: $('#candidato-cover'),
		foto: $('#candidato-foto'),
		nome: $('#candidato-nome'),
		partido: $('#candidato-partido'),
	};
};

Urna.prototype = {
	numeroCompleto: function() {
		return this.numero.length >= this.digitos;
	},
	podeDigitar: function(numerico, tecla) {
		if (numerico && this.numeroCompleto()) {
			return false;
		} else if (this.numeroCompleto() && tecla === 'branco') {
			return false;
		} else if (numerico && this.branco) {
			return false;
		}
		return true;
	},
	atualiza: function() {
		this.atualizaNumero();
		for (var i in this.textos) {
			this.textos[i].stop(1, 1).hide();
		};
		if (this.nulo || this.branco || this.numeroCompleto()) {
			this.exibeCandidato();
		}
	},
	atualizaNumero: function() {
		var numeros = this.numero.split('');
		for (var i = 0; i < this.digitos; i++) {
			var numero = parseInt(numeros[i]) || '';
			numero = (numeros[i] == 0) ? '0' : numero;
			$('#candidato-numero-' + (i + 1)).text(numero);
		}
	},
	exibeCandidato: function() {
		var candidato = this.candidatos.buscaPorNumero(this.numero);
		if (this.branco) {
			this.textos.branco.fadeIn();
		} else if (!candidato) {
			this.textos.nulo.fadeIn();
			this.nulo = true;
		} else {
			if (this.exibeFundoCandidatos) {
				this.textos.cover.fadeIn().css('background-image', 'url(./img/candidatos/' + candidato.id + '_cover.jpg)');
			}
			var url = './img/candidatos/' + candidato.id + '.jpg';
			var image = new Image();
			var self = this;
			image.onload = function() {
				self.textos.foto.attr('src', url).fadeIn();
				self.textos.partido.fadeIn().text('Partido: ' + candidato.partido);
				self.textos.nome.fadeIn().text(candidato.nome);
			};
			image.src = url;
		}
		this.textos.legenda.fadeIn();
	}
};