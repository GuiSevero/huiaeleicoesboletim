
var Modelo_Votos = Backbone.Model.extend({
	defaults: {
		voto: ''
	}
});

var Colecao_Votos = Backbone.Collection.extend({
	model: Modelo_Votos,
	localStorage: new Backbone.LocalStorage("Votos"),

	agrupa: function(votos) {
		return _.groupBy(votos, function(row) {
		    return row.voto;
		});
	},

	em: function(numero) {
		var ParseVotos = Parse.Object.extend("Votos");
		var parseVotos = new ParseVotos();
		this.create({
			voto: numero
		});
		parseVotos.set("voto", numero);
		parseVotos.save();
	},

	apuracao: function(callback) {
		var self = this;
		this.fetch().done(function(votos) {
			callback('apuracaoOffline', self.agrupa(votos));
		});
	},

	apuracaoOnline: function(callback) {
		var ParseVotos = Parse.Object.extend("Votos"),
			votos = new ParseVotos(),
			self = this;
		votos.fetch(function(response) {
			callback('apuracaoOnline', self.agrupa(votos.attributes.results));
		});
	}
});