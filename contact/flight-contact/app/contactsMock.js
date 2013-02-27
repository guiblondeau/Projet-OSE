var action = 'start';

var getAll = $.mockjax({
  url: '/contacts/getAll',
  type: 'GET',
  status: '200',
  statusText: 'OK',
  contentType: 'application/json',
  response: function() {
    var contacts;

    switch (action) {
    case 'afterAdd':
      contacts = contactsAfterAdd;
      break;
    case 'afterUpdate':
      contacts = contactsAfterUpdate;
      break;
    case 'afterDelete':
      contacts = contactsAfterDelete;
      break;
    case 'start':
    default:
      contacts = contactsStart;
    }

    this.responseText = JSON.stringify(contacts);
 }
});

var addContact = $.mockjax({
  url: '/contacts/addContact',
  type: 'POST',
  status: '201',
  statusText: 'Created',
  contentType: 'application/json',
  response: function() {
    console.log("lalala");
    action = 'afterAdd';
    this.responseText = JSON.stringify({
      "id": "03",
      "nom": "Gordon",
      "prenom": "James",
      "numero": "11-222-333"
    });
  }
});

var editContact = $.mockjax({
  url: /^\/contacts\/editContact\/([\d]+)$/,
  urlParams: ['contactID'],
  type: 'PUT',
  status: '200',
  statusText: 'OK',
  contentType: 'application/json',
  response: function () {
    action = 'afterUpdate';
    this.responseText = JSON.stringify({
      "id":     "03",
      "nom":    "GORDON",
      "prenom": "JAMES",
      "numero": "22-333-444"
    });
  }
});

var deleteContact = $.mockjax({
  url: /^\/contacts\/editContact\/([\d]+)$/,
  urlParams: ['contactID'],
  type: 'DELETE',
  status: '200',
  statusText: 'OK',
  response: function () {
    action = 'afterDelete';
  }
});

var contactsStart = [
  {
    "id": "01",
    "nom": "Wayne",
    "prenom": "Bruce",
    "numero": "11-222-331"
  },
  {
    "id": "02",
    "nom": "Kyle",
    "prenom": "Selina",
    "numero": "11-222-332"
  }
];

var contactsAfterAdd = [
  {
    "id": "01",
    "nom": "Wayne",
    "prenom": "Bruce",
    "numero": "11-222-331"
  },
  {
    "id": "02",
    "nom": "Kyle",
    "prenom": "Selina",
    "numero": "11-222-332"
  },
  {
    "id": "03",
    "nom": "Gordon",
    "prenom": "James",
    "numero": "11-222-333"
  }
];

var contactsAfterUpdate = [
  {
    "id": "01",
    "nom": "Wayne",
    "prenom": "Bruce",
    "numero": "11-222-331"
  },
  {
    "id": "02",
    "nom": "Kyle",
    "prenom": "Selina",
    "numero": "11-222-332"
  },
  {
    "id": "03",
    "nom": "GORDON",
    "prenom": "JAMES",
    "numero": "11-222-333"
  }
];

var contactsAfterDelete = [
  {
    "id": "01",
    "nom": "Wayne",
    "prenom": "Bruce",
    "numero": "11-222-331"
  },
  {
    "id": "03",
    "nom": "Gordon",
    "prenom": "James",
    "numero": "11-222-333"
  }
];
