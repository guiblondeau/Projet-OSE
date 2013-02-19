var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

function Contact(){
    this.id = 0;
    this.nom = "Doe";
    this.prenom = "John";
    this.numero = 0;
}

var book = [];

function getAll(req, res, next){
    res.send(book);
    return book;
}

function editContact(){
}

function addContact(req, res, next) {
    //var contact = JSON.parse(req.params);
    console.log(req.params.nom);
    res.send(req.params);
    var contact = new Contact();
    var param = req.params;
    contact.nom = param.nom;
    contact.prenom = param.prenom;
    contact.id = param.id;
    contact.numero = param.numero;
    book.push(contact);
}

server.post('/book/addContact', addContact);
server.post('/book/getAll', getAll);
server.post('/book/editContact', editContact);

server.listen(8080);