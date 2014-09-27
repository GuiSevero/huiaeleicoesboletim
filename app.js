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

//app.use(logfmt.requestLogger());

app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('diogola'));
    app.use(express.session());
    app.use(app.router);  
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
  });

/*
var gabi = new Candidato({ nome: 'Gabriela Jung', imagem: 'tababa', numero: '12020' });

gabi.save(function(err){
  if(err) console.log(err);
});
*/


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


app.get('/', function(req, res) {

   Candidato.find( {}, function(err, documents){
        if (err) res.send(500);
        res.render('index', { candidatos: documents });   
    });

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

