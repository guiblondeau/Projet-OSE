// **Component:** UiTools\\
// **Date:** 2013-02-19\\
// **Brief:** Manages tools on ui.\\
//
// **UiTools** is a ui tools manager enabeling each tool to generate
// events. Events represent the user action on ui. Definition of
// events is given in [events section](#events).
'use strict';

define(
  [
    'components/flight/lib/component'
  ],

  function(defineComponent)  {
    return defineComponent(uiTools);

    function uiTools() {
      // ## Events' list <a id="events"></a>.

      // ### Print page events.

      // #### Ask for searching a specific contact.
      //
      // Trigger an event 'uiAskSearchContact' on texte input and only
      // if there is, at least, two characters. The event is
      // 'uiSearchContact' and the event body is the form:
      //
      //    {
      //      query: "Wayne"
      //    }
      this.askSearchContact = function(evt, data) {
        var searchString = data.el.value;

        if (searchString.length >= 2) {
          this.trigger('uiAskSearchContact', { query: searchString });
        }
      }

      // #### Ask for resynchronize contacts' list.
      //
      // Tigger an event 'uiAskResyncContact', asking to resynchronize
      // the contacts' list. This event modify the resyncSelector
      // button to display a rotating refresh icon.
      this.askResyncContact = function(evt, data) {
        this.trigger('uiAskResyncContact');

        // Change ok-icon to resync-icone
        jQuery(data.el).find('i').
            removeClass('icon-ok icon-remove').addClass('icon-refresh');
      }

      // #### Ask to edit an existing contact.
      //
      // Trigger an event 'uiAskEditContact', asking to display the
      // formulaire in order to edit an existing contact. The event
      // object throwing durring trigger is the contact:
      //
      //    {
      //      id: "01",
      //      nom: "Wayne",
      //      prenom: "Bruce",
      //      numero: "000-000-000"
      //    }
      this.askEditContact = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiAskEditContact', contactData);
      }

      // #### Ask generate page to a add a new contact.
      //
      // Trigger an event 'uiAskAddContact', asking to display the
      // formulaire in order to add a new contact.
      this.askAddContact = function() {
        this.trigger('uiAskAddContact');
      }

      // ### Action on contact events.

      // #### Valid deletion of a contact.
      //
      // Trigger an event 'uiValidDeleteContact', validating the
      // deletion of an existing contact. The body of event containing
      // the id of contact to delete. The form is the following:
      //
      //    {
      //      id: "01"
      //    }
      this.validDeleteContact = function(evt, data) {
        var contactId = data.el.contactId;
        this.trigger('uiValidDeleteContact', { id: contactId });
      }

      // #### Valid addition of a contact.
      //
      // Trigger an event 'uiValidAddContact', validating the addition
      // of a contact. The body of event containing the contact to
      // add. The form is the following:
      //
      //    {
      //      id: "",
      //      nom: "Wayne",
      //      prenom: "Bruce",
      //      numero: "000-000-000"
      //    }
      this.validAddContact = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiValidAddContact', contactData);
      }

      // #### Valid edition of an existing contact.
      //
      // Trigger an event 'uiValidEditContact', validating the edition
      // of an existing contact. The body of event containing the
      // contact to edit. The form is the following:
      //
      //    {
      //      id: "01",
      //      nom: "WAYNE",
      //      prenom: "BRUCE",
      //      numero: "000-000-000"
      //    }
      this.validEditContact = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiValidEditContact', contactData);
      }

      // ## AOP part.

      // Befor validAddContact, set the contact object to add into
      // contactData attribute.
      //
      // TODO: Error is case of bad contact object.
      this.before('validAddContact', function(evt, data) {
        var nom = jQuery("#nom").val();
        var prenom = jQuery("#prenom").val();
        var numero = jQuery("#numero").val();

        jQuery(data.el).attr('contactData', JSON.stringify({
          'id': '',
          'nom': nom,
          'prenom': prenom,
          'numero': numero
        }));
      });

      // Befor validEditContact, set the contact object to edit into
      // contactData attribute.
      //
      // TODO: Error is case of bad contact object.
      this.before('validEditContact', function(evt, data) {
        var nom = jQuery("#nom").val();
        var prenom = jQuery("#prenom").val();
        var numero = jQuery("#numero").val();


        jQuery(data.el).attr('contactData', JSON.stringify({
          'id': '',
          'nom': nom,
          'prenom': prenom,
          'numero': numero
        }));
      });

      // ## Initialization.
      this.defaultAttrs({
        searchSelector: '#searchContact',
        resyncSelector: '#resyncContact',
        addSelector: '#addContact',
        editSelector: '#editContact',
        previousPageSelector: '#previousPage',
        validDeleteSelector: '#deleteContact',
        validAddSelector: '#validAddContact',
        validEditSelector: '#validEditContact'
      });


      // Binding ui tools with UiTools events.
      this.after('initialize', function() {
        this.on('keyup', { searchSelector: this.searchContact });
        this.on('click', {
          resyncSelector: this.askResyncContact,
          addSelector: this.askAddContact,
          editSelector: this.askEditContact,
          validDeleteSelector: this.validDeleteContact,
          validAddSelector: this.validAddContact,
          validEditSelector: this.validEditContact
          // TODO: previousPageSelector
        });

        // If resync is OK, set success button with ok-icon.
        this.on('resyncContactOk', function() {
          this.select('resyncSelector').
              removeClass('btn-danger').addClass('btn-success').
              find('i').
              removeClass('icon-refresh').addClass('icon-ok');
       });

        // If resync is not Ok, set danger button with remove icon.
        this.on('resyncContactNotOk', function() {
          this.select('resyncSelector').
              removeClass('btn-success').addClass('btn-danger').
              find('i').
              removeClass('icon-refresh').addClass('icon-remove');
        });
      });
    }
  }
);
