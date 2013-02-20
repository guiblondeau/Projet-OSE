//
// * **Component:** UiTools
// * **Date:** 2013-02-19
// * **Version:** 0.1
// * **Breif:** Manage tools on ui.
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
      // DEBUG
      var contactList = [
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

      this.defaultAttrs({
        // Debug
        appSelector: '#app',

        // Selector
        searchSelector: '#searchContact',
        resyncSelector: '#resyncContact',
        addSelector: '#addContact',
        deleteSelector: '#deleteContact',
      });

      // ## <a id="events"></a> Events' list.
      var ASK_SEARCH_CONTACT = 'uiSearchContact';
      var ASK_ADD_CONTACT = 'uiAddContact';
      var ASK_REFRESH_CONTACT = 'uiRefreshContact';
      var ASK_DELETE_CONTACT = 'uiDeleteContact';

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
      // the contacts' list.
      this.resyncContact = function(evt, data) {
        this.trigger(ASK_RESYNC_CONTACT);
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
      //
      // Binding tools with tool events trigerring.
      this.after('initialize', function() {
        // Bind tools and events.
        this.on('click', {
          resyncSelector: this.resyncContact,
          addSelector: this.addContact,
          deleteSelector: this.deleteContact
        });
        this.on('keyup', { searchSelector: this.searchContact });

        // DEBUG
        this.select('appSelector').html(Mustache.render(templates.contactListTemplate,
                                               {"contactList":contactList,
                                                 "name": function() {
                                                 return this.prenom + " " + this.nom;
                                                 },
                                                 "img": function() {
                                                 return parseInt(this.id)
                                                 }}));
      });
    }
  }
);
