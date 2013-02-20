var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

function Contact(){
    this.id;
    this.nom;
    this.prenom;
    this.numero;
}

var cpt = 0; // donne la valeur de l'indentifiant

var book = [];// stocke les contacts
var affichage = [];// sert au renvoi des contacts (cf function getAll)

function getAll(req, res, next){
    var compteur = 0;
    for (var id in book){
	if (book[id] != null){
	    affichage[compteur]=book[id];
	    compteur++;
	}
    }
    res.send(affichage);
}

function editContact(req, res, next){
    var contact = new Contact();
    var param = req.params;
    contact.nom = param.nom;
    contact.prenom = param.prenom;
    contact.id = param.id;
    contact.numero = param.numero;
    res.send(req.params);
    book[param.identifiant] = contact;
}

function addContact(req, res, next) {
    //var contact = JSON.parse(req.params);
    console.log(req.params.nom);
    
    var contact = new Contact();
    var param = req.params;
    contact.nom = param.nom;
    contact.prenom = param.prenom;
    contact.id = cpt;
    contact.numero = param.numero;
    book[cpt] = contact;
    res.send(contact);
    cpt = cpt+1;
}

function deleteContact(req, res, next){
    book[req.params.identifiant] = null;
    res.send ("OK");
}


server.post('/contacts/addContact', addContact);
server.get('/contacts/getAll', getAll);
server.put('/contacts/editContact/:identifiant', editContact);
server.del('contacts/editContact/:identifiant',deleteContact);
server.listen(8080);