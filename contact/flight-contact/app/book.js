// **Component:** Book
//
// **Date:** 2013-03-05
//
// **Brief:** Manage all application.
//
// **Book** manages all the application. Book component is in charge
// of starting application, binding existing components with each
// others and coordinating events.
//
// The Book application offers four Pages :
//
// * All Contact Page: to print all contact.
//
// * One Contact Page: to print one specific contact.
//
// * Edit Contact Page: to edit an existing contact.
//
// * Add Contact Page: to add a new contact.
//
// **Book** uses **UiInteraction** and **ContactManager** events to
// select wich page to print. It also uses the **UiPrint** to print
// rendered pages with a specific effect.

// ## Book Code.

'use_strict';

define(
  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/templates'
  ],

  function(defineComponent, Mustache, templates) {
    return defineComponent(Book);

      function Book() {
      // ### Attributes.

      // Print effect for **UiPrint** Component.
      var FORWARD_PRINT = 'FORWARD';
      var BACKWARD_PRINT = 'BACKWARD';
      var DEFAULT_PRINT = 'PRINT';
      var allContactPrint = DEFAULT_PRINT;

      var Book;

      this.defaultAttrs({
        // Compiled templates.
        templateContacts: Mustache.compile(templates.contactListTemplate),
        templateContact: Mustache.compile(templates.contactPrintTemplate),
        templateEdit: Mustache.compile(templates.contactEditTemplate),
        templateAdd: Mustache.compile(templates.contactAddTemplate),
      });

      this.after('initialize', function() {
        Book = this;

        // ### Handlers.

        // #### Print All Contact Page.
        //
        // Before Printing All Contact Page, the Book component
        // launches a getAllContact event to get all contacts from
        // **ContactManager**. Then, on event 'getAllContactOK', the
        // All Contact page is print.
        this.on('allContactPage', function(evt, data) {
          allContactPrint = data.print;
          this.trigger('getAllContact');
        });

        // #### Print One Contact Page.
        this.on('oneContactPage', function(evt, data) {
          this.print(this.renderContact(data.contact), data.print);

          this.pushHistory({
              current: 'oneContactPage',
              extraData: undefined
          });
        });

        // #### Edit Contact Page.
        this.on('editContactPage', function(evt, data) {
          this.print(this.renderEdit(data.contact), data.print);

          this.pushHistory({
              current: 'editContactPage',
              extraData: data.contact
          });
        });

        // #### Add Contact Page.
        this.on('addContactPage', function(evt, data) {
          this.print(this.renderAdd(), data.print);

          this.pushHistory({
              current: 'addContactPage',
              extraData: undefined
          });
        });

        // ### Binding with UiInteraction.

        // #### On Contact Selected, print One Contact Page.
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

        // #### On resync contact demand, print All Contact Page.
        this.on('uiResyncContactSelected', function(evt, data) {
          this.trigger('allContactPage', {
              print: DEFAULT_PRINT
          });
        });

        // #### On edit contact demand, print Edit Contact Page.
        this.on('uiEditContactSelected', function(evt, data) {
          this.trigger('editContactPage', {
              print: FORWARD_PRINT,
              contact: data
          });
        });

        // #### On add contact demand, print Add Contact Page.
        this.on('uiAddContactSelected', function(evt, data) {
          this.trigger('addContactPage', {
              print: FORWARD_PRINT
          });
        });

        // #### On previous page demand, print Previous Page.
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

        // #### On validation of delete contact, delete him from persis layer.
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

        // #### When all contacts are getting from persis layer, print them.
        this.on('getAllContactOK', function(evt, data) {
          this.print(this.renderContacts(data.contacts), allContactPrint);
        });

        // #### After a contact is successfuly added, print All Contact Page.
        this.on('addContactOK', function(evt, data) {
          this.trigger('allContactPage', {
              print: BACKWARD_PRINT
          });
        });

        // #### After a contact is successfuly deleted, print All Contacts Page.
        this.on('deleteContactOK', function(evt, data) {
          this.trigger('allContactPage', {
              print: BACKWARD_PRINT
          });
        });

        // #### After a contact is successfuly updatetd, print All Contacts Page.
        this.on('updateContactOK',  function(evt, data) {
          this.trigger('allContactPage', {
              print: BACKWARD_PRINT
          });
        });

        // ### It back button (browser).
        window.onpopstate = this.popHistory;

        // ### Lauch app
        this.trigger('allContactPage', { print: allContactPrint });
      });


      // ### Rendering function

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
      //
      // Launch an event for **UiPrint** component.
      //
      //  * *render* is the html data to send in payloads of event.
      //  * *print* is the type of effects (BACKWARD_PRINT/
      //            FORWARD_PRINT/...)
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

      // ## Manage history

      // #### History it (save state)
      this.pushHistory = function(eventData) {
        var evt = {
          type: 'uiPreviousPageSelected',
          data: eventData
        };
        console.log("push History:");
        console.log(evt);

        history.pushState({event: evt}, eventData.current, 'index.html');
      }

      // #### Play History;
      this.popHistory = function (evt) {
        if (evt.state && evt.state.event) {
          var event = evt.state.event;
          Book.trigger(event.type, event.data);
          return false;
        }

        return true;
      }
    }
  }
);
