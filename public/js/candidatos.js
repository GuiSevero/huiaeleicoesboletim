var Candidatos = function(candidatos) {
	this.candidatos = candidatos;
};

Candidatos.prototype = {
	buscaPorNumero: function(numero) {
		for (var i in this.candidatos) {
			if (this.candidatos[i].numero == numero) {
				return this.candidatos[i];
			}
		}
	}
};