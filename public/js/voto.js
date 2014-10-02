
var Modelo_Votos = Backbone.Model.extend({
	defaults: {
		voto: ''
	}
});

var ParseVotos = Parse.Object.extend("Votos");

var Colecao_Votos = Backbone.Collection.extend({
	model: Modelo_Votos,
	localStorage: new Backbone.LocalStorage("Votos"),

	em: function(numero) {
		// colocar persistência externa aqui
		var parseVotos = new ParseVotos();
		this.create({
			voto: numero
		});
		parseVotos.set("voto", numero);
		parseVotos.save();
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