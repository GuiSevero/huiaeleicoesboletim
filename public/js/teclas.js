
var Teclas = function(urna) {
	this.urna = urna;
	this.presionar();
};

Teclas.prototype = {
	presionar: function() {
		var urna = this.urna,
			self = this;

		$('.teclas').on('click', function(e) {
			e.preventDefault();
			var $this = $(this),
				tecla = $this.data('tecla'),
				numerico = ! tecla.length;

			if ( ! urna.podeDigitar(numerico, tecla)) {
				return;
			}

			if (numerico) {
				urna.numero += tecla;
				urna.atualiza();
			} else {
				self[tecla]();
			}
		});
	},
	
	corrige: function() {
		this.urna.numero = '';
		this.urna.branco = false;
		this.urna.nulo = false;
		this.urna.atualiza();
	},
	
	branco: function() {
		this.urna.numero = '';
		this.urna.branco = true;
		this.urna.nulo = false;
		this.urna.atualiza();
	},

	confirma: function() {
		if (this.urna.branco || this.urna.nulo || this.urna.numeroCompleto()) {
			var confirma = new Audio('./audio/fim.mp3');
			confirma.play();
			$('#urna-elementos').hide();
			$('#fim').fadeIn();
			var voto = new Colecao_Votos();
			var candidato = ((this.urna.branco) ? 'branco' : (this.urna.nulo) ? 'nulo' : this.urna.numero);
			voto.em(candidato);
			setTimeout(function() {
				window.location.reload();
			}, 5000);
			return;
		} else {
			alert('Preencha seu voto.');
		}
		this.urna.legenda().exibe();
	}
};