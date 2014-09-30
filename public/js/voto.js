
var Modelo_Votos = Backbone.Model.extend({
	defaults: {
		voto: ''
	}
});

var Colecao_Votos = Backbone.Collection.extend({
	model: Modelo_Votos,
	localStorage: new Backbone.LocalStorage("Colecao_Votos"),

	em: function(numero) {
		// colocar persistência externa aqui
		this.create({
			voto: numero
		});
	},

	apuracao: function(callback) {
		this.fetch().done(function(response) {
			var votos = _.groupBy(response, function(row) {
			    return row.voto;
			});
			callback(votos);
		});
	}
});