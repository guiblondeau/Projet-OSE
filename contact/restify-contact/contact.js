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

/**
Gives all the contacts present in the book
*/
function getAll(req, res, next){
    var compteur = 0;
    for (var id in book){
	if (book[id] != null){
	    affichage[compteur]=book[id];
	    compteur++;
	}
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(affichage);
}

/**
Edits a contacts already present in the book
*/
function editContact(req, res, next){
    var contact = new Contact();
    var param = req.params;
    contact.id = param.identifiant;
    contact.nom = param.nom;
    contact.prenom = param.prenom;
    contact.numero = param.numero;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(req.params);
    book[param.identifiant] = contact;
}

/**
Adds a new contact
*/
function addContact(req, res, next) {
    console.log(req.params.nom);
    var contact = new Contact();
    var param = req.params;
    contact.id = cpt;
    contact.nom = param.nom;
    contact.prenom = param.prenom;
    contact.numero = param.numero;
    book[cpt] = contact;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(contact);
    cpt = cpt+1;
}

/**
Deletes a contact
*/
function deleteContact(req, res, next){
    book[req.params.identifiant] = null;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send ("OK");
}

/**
Permits to erase an object in a tab
*/

server.post('/contacts/addContact', addContact);
server.get('/contacts/getAll', getAll);
server.put('/contacts/editContact/:identifiant', editContact);
server.del('contacts/editContact/:identifiant',deleteContact);
server.listen(8080);
