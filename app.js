var MONGOHQ_URL="mongodb://huia:aaa123@kahana.mongohq.com:10002/app30051564"

 var express = require('express')
    , http = require('http')
    , https = require("https")
    , path = require('path')
    , mongoose = require("mongoose")
    , querystring = require('querystring')
    , _ = require('underscore')
    //, io = require('socket.io')

    mongoose.connect(process.env.MONGOHQ_URL || MONGOHQ_URL);
    Candidato = mongoose.model('Candidato', 
      { 
            nome: String
          , imagem: String
          , numero: String
          , votos: [{timestamp: Date}]
      });


var app = express();


app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('diogola'));
    app.use(express.session());
    app.use(app.router);  
    app.use(express.static(path.join(__dirname, 'public')));
  });


app.get('/', function(req, res) {

   Candidato.find( {}, function(err, documents){
        if (err) res.send(500);
        res.render('index', { candidatos: documents });   
    });

});



app.post('/vote', function(req, res){
    
    var num = req.body.numero;

      Candidato.findOne( {numero: num}, function(err, doc){
        if (err) res.send(500);
        doc.votos.push({timestamp: new Date()});
        doc.save(function(err){
          if(err) res.send(500);
          res.send(doc);      
        });
      });
});

app.get('/votos', function(req, res){

  Candidato.find({}, function(err, docs){
    if (err) res.send(500, err);

    result = {
        total: _.reduce(docs, function(k, doc){return k + doc.votos.length},0)
    }

    result.candidatos = _.map(docs, function(doc){
      return {
        nome: doc.nome,
        numero: doc.numero,
        porcentagem: (doc.votos.length / result.total) * 100,
        votos: doc.votos.length
      };
    })
    
    res.send(result);
        
  });

/*
  var o = {
    map: function(){
      emit(this.nome, this.votos == undefined ? 0 : this.votos.length);
    },
    reduce: function(k, vals){
      return 200;
    }
  };
  
  Candidato.mapReduce(o, function (err, results) {
    console.log(results);
    console.log(err);
    if (err) res.send(500, err);
    res.send(results);
  });
*/

});






app.get('/add', function(req, res) {

    Candidato.find( {}, function(err, documents){
        if (err) res.send(500);
        res.render('form', { candidatos: documents });   
    });
});


app.post('/add', function(req, res) {
  var cand = new Candidato(req.body.Candidato);
  cand.save(function(err){
    if(err) res.send(500);
    Candidato.find( {}, function(err, documents){
        if (err) res.send(500);
        io.sockets.emit("new_candidato", {data: cand});
        res.render('form', { candidatos: documents });   
    });
  });
});



var sv = http.createServer(app);
var io = require('socket.io').listen(sv);
io.set('log level', 1); 

var port = process.env.PORT || 7070;
sv.listen(port, function() {
  console.log("Listening on " + port);
});

