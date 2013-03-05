// **Component:** Book\\
// **Date:** 2013-02-24\\
// **Brief:** Rendering templates for ui.\\

'use_strict';

define(
  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/templates'
  ],

  function(defineComponent, Mustache, templates) {
    return defineComponent(Book);

    // ## Book Code.
    function Book() {
      var FORWARD_PRINT = 'FORWARD';
      var BACKWARD_PRINT = 'BACKWARD';
      var DEFAULT_PRINT = 'PRINT';

      var allContactPrint = DEFAULT_PRINT;

      this.after('initialize', function() {
        this.on('allContactPage', this.allContact);
        this.on('oneContactPage', this.oneContact);
        this.on('editContactPage', this.editContact);
        this.on('addContactPage', this.addContact);

        // ### Binding with UiInteraction.

        this.on('uiContactSelected', function(evt, data) {
          this.trigger('oneContactPage', {
              print: FORWARD_PRINT,
              contact: data
          });
        });

        this.on('uiSearchContactSelected', function(evt, data) {
          // TODO: Implements search.
          console.warn('NOT IMPLEMENTED');
        });

        this.on('uiResyncContactSelected', function(evt, data) {
          this.trigger('allContactPage', {
              print: DEFAULT_PRINT
          });
        });

        this.on('uiEditContactSelected', function(evt, data) {
          this.trigger('editContactPage', {
              print: FORWARD_PRINT,
              contact: data
          });
        });

        this.on('uiAddContactSelected', function(evt, data) {
          this.trigger('addContactPage', {
              print: FORWARD_PRINT
          });
        });

        this.on('uiPreviousPageSelected', function(evt, data) {
          switch(data.current) {
          case 'oneContactPage':
            this.trigger('allContactPage', { print: BACKWARD_PRINT });
            break;
          case 'editContactPage':
            this.trigger('oneContactPage', {
                print: BACKWARD_PRINT,
                contact: data.extraData
            });
            break;
          case 'addContactPage':
            this.trigger('allContactPage', { print: BACKWARD_PRINT });
            break;
          default:
            this.trigger('allContactPage', { print: DEFAULT_PRINT });
            break;
          }
        });

        this.on('uiValidDeleteContactSelected', function(evt, data) {
          this.trigger('deleteContact', data);
        });

        this.on('uiValidEditContactSelected', function(evt, data) {
          this.trigger('updateContact', data);
        });

        this.on('uiValidAddContactSelected', function(evt, data) {
          this.trigger('addContact', data);
        });

        // ### Binding with ContactManager
        //
        // What to do when persistant layer is updateted.

        this.on('getAllContactOK', function(evt, data) {
          this.print(this.renderContacts(data.contacts), allContactPrint);
        });

        this.on('addContactOK', function(evt, data) {
          this.trigger('allContactPage', {
              print: BACKWARD_PRINT
          });
        });

        this.on('deleteContactOK', function(evt, data) {
          this.trigger('allContactPage', {
              print: BACKWARD_PRINT
          });
        });

        this.on('updateContactOK',  function(evt, data) {
          this.trigger('allContactPage', {
              print: BACKWARD_PRINT
          });
        });

        // ### Lauch app

        this.trigger('allContactPage', { print: allContactPrint });
      });


      // ## Rendering function

      // #### Render page of all contacts.
      //
      // Render the page of all contacts.
      //
      //  * *contacts* The contacts' list
      //  * *return* Html page rendering from contacts' list.
      this.renderContacts = function(contacts){
        return this.attr.templateContacts({
          contactList: contacts,
          data: function() {
            return JSON.stringify(this);
          },
          name: function() {
            return this.prenom + " " + this.nom;
          }
        });
      }

      // #### Render page of a specific contact.
      //
      // Render the page of a specific contact.
      //
      //  * *contact* The contact to render.
      //  * *return* Html page rendering from contact.
      this.renderContact = function(contact) {
        return this.attr.templateContact({
            'contact': contact,
            name: function() {
              return this.contact.prenom + " " + this.contact.nom;
            },
            data: JSON.stringify(contact)
        });
      }

      // #### Render page of edition of contact.
      //
      // Render the page of edition of a contact.
      this.renderEdit = function(contact) {
        return this.attr.templateEdit({
            'contact': contact,
            name: function() {
              this.contact.prenom + " " + this.contact.nom;
            },
            data: JSON.stringify(contact)
        });
      }

      // #### Render page of addition of a contact
      //
      // Render the page of addition of a contact.
      this.renderAdd = function() {
        return this.attr.templateAdd();
      }

      // ## PrintEvent Launcher
      this.print = function(render, print) {
        var type;

        switch (print) {
        case FORWARD_PRINT:
          type = 'printForward';
          break;
        case BACKWARD_PRINT:
          type = 'printBackward';
          break;
        case DEFAULT_PRINT:
        default:
          type = 'print';
          break;
        }

        this.trigger(type, { html: render });
      }

      // ## Manage Application

      //    data:
      //    {
      //      (print: 'FORWARD/BACKWARD',)
      //    }
      this.allContact = function(evt, data) {
        allContactPrint = data.print;

        this.trigger('getAllContact');
      }

      //    data:
      //    {
      //      (print: 'FORWARD/BACKWARD',)
      //      contact: { ... }
      //    }
      this.oneContact = function(evt, data) {
        this.print(this.renderContact(data.contact), data.print);
      }

      //    data:
      //    {
      //      (print: 'FORWARD/BACKWARD',)
      //      contact: { ... }
      //    }
      this.editContact = function(evt, data) {
        this.print(this.renderEdit(data.contact), data.print);
      }

      //    data:
      //    {
      //      (print: 'FORWARD/BACKWARD')
      //    }
      this.addContact = function(evt, data) {
        this.print(this.renderAdd(), data.print);
      }

      // ## Initialization

      this.defaultAttrs({
        // Compile templates.
        templateContacts: Mustache.compile(templates.contactListTemplate),
        templateContact: Mustache.compile(templates.contactPrintTemplate),
        templateEdit: Mustache.compile(templates.contactEditTemplate),
        templateAdd: Mustache.compile(templates.contactAddTemplate),
      });

    }
  }
);
