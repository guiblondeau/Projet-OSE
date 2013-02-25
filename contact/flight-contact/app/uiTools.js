// * **Component:** UiTools
// * **Date:** 2013-02-19
// * **Version:** 0.1
// * **Brief:** Manages tools on ui.
//
// **UiTools** is a ui tools manager enabeling each tool to generate
// events. Events represent the user action on ui and defiition is
// given in [events section](#events).
'use strict';

define(
  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/templates'
  ],

  function(defineComponent, Mustache, templates)  {
    return defineComponent(uiTools);

    function uiTools() {
      this.defaultAttrs({
        // Selector
        searchSelector: '#searchContact',
        resyncSelector: '#resyncContact',
        addSelector: '#addContact',
        deleteSelector: '#deleteContact',
        editSelector: '#editContact'
      });

      // ## Events' list <a id="events"></a>.

      // * Asks to refine contacts' list using a name filter. The
      //   filter is specified in the event body:
      //    {
      //      query: "Wayne"
      //    }
      var ASK_SEARCH_CONTACT = 'uiSearchContact';
      // * Ask to display the ui view for adding a new contact.
      var ASK_ADD_CONTACT = 'uiAddContact';
      // * Ask to refresh the contacts' list.
      var ASK_RESYNC_CONTACT = 'resyncContact';
      // * Ask to delete a particular contact. The event gives the id
      //   to delete in its body.
      //    {
      //      id: "01"
      //    }
      var ASK_DELETE_CONTACT = 'uiDeleteContact';
      var ASK_EDIT_CONTACT = 'editContact';
      // #### Ask for searching a specific contact.
      //
      // Trigger an event on texte input and only if there is, at
      // leats, two characters. The event is ASK_SEARCH_CONTACT and
      // the event body is the form:
      //
      //    {
      //      query: "Wayne"
      //    }
      this.searchContact = function(evt, data) {
        var searchString = data.el.value;

        if (searchString.length >= 2) {
          this.trigger(ASK_SEARCH_CONTACT, { query: searchString });
        }
      }

      // #### Ask for resynchronize contacts' list.
      //
      // Tigger an event ASK_RESYNC_CONTACT, asking to resynchronize
      // the contacts' list. This event modify the resyncSelector
      // button to display a rotating refresh icon.
      this.resyncContact = function(evt, data) {
        this.trigger(ASK_RESYNC_CONTACT);

        // Change ok-icon to resync-icone
        // TODO: Set class name with constante to template.
        jQuery(data.el).find('i').
            removeClass('icon-ok icon-remove').addClass('icon-refresh');
      }

      // #### Ask to edit an existing contact.
      //
      // Trigger an event ASK_EDIT_CONTACT, asking to display the
      // formulaire in order to edit an existing contact. The event
      // object throwing durring trigger is the contact:
      //
      //    {
      //      id: "01",
      //      nom: "Wayne",
      //      prenom: "Bruce",
      //      numero: "000-000-000"
      //    }
      this.editContact = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));

        this.trigger(ASK_EDIT_CONTACT, contactData);
      }

      // #### Ask to a add a new contact.
      //
      // Trigger an event ASK_ADD_CONTACT, asking to display the
      // formulaire in order to add a new contact.
      this.addContact = function(evt, data) {
        this.trigger(ASK_ADD_CONTACT);
      }

      // #### Ask to delete a contact.
      //
      // Trigger an event on a clickable DOM element. The element must
      // have the 'contactId' attribut with id of contact to delete.
      // The event is ASK_DELETE_CONTACT, asking to delete an existing
      // contact. The body of event containing the id of contact to
      // delete. The form is the following:
      //
      //    {
      //      id: "01"
      //    }
      this.deleteContact = function(evt, data) {
        this.trigger(ASK_DELETE_CONTACT, { id: data.el.contactId });
      }

      // ## Initialization.

      // Binding tools with tool events trigerring.
      this.after('initialize', function() {
        // Bind tools and events.
        this.on('click', {
          resyncSelector: this.resyncContact,
          addSelector: this.addContact,
          deleteSelector: this.deleteContact,
          editSelector: this.editContact
        });
        this.on('keyup', { searchSelector: this.searchContact });

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

        // If ask add contact, the current list contact his droped and
        // change with the the add contact form.
        this.on('uiAddContact', function() {
          this.select('appSelector').slideTo(
            Mustache.render(templates.contactAddTemplate));
        });
      });
    }
  }
);
