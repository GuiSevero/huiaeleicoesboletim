### Eleições Boletim para Pagamento de Prenda W3haus - 2014

### Autores
- Guilherme
- Jean
- Patrick

#### Tecnologias
- Node
- Express
- Jade Template Engine
- MongoDB
- Mongoose
- Websockets (Socket.IO)

### Manual

Para adicionar candidato
http://eleicoesboletim.herokuapp.com/add

Para ver candidatos
http://eleicoesboletim.herokuapp.com/

Para votar 
POST http://eleicoesboletim.herokuapp.com/vote 
Parametros: numero: numero_do_candidato


```javascript
$.post("http://eleicoesboletim.herokuapp.com/vote", {numero: "<NUMERO_DO_CANDIDATO>"}, callback);
```