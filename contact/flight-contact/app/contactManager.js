// **Component:** ContactManager
//
// **Date:** 2013-02-26
//
// **Brief:** Manage contacts with the persistant layer.
//
// **ContactManager** manages contacts with persistant layer. It enables:
//
// * Get all contacts.
//
// * Add a new contact.
//
// * Edit an existing contact.
//
// * Delete an existing contact.
//
// Each action is tangled with an event. The events' list and their
// data is describe in [Handlers' section](#handlers). Each action also generate
// two events if action failed or not. Description of actions (and
// triggered events) is available at [Events' section](#events).
//
// ## Handlers <a id="handlers"></a>
//
// #### On getAllContact.
//
// Try to get all contacts from persiatant layer.
//
// #### On addContact
//
// Try to add a new contact to the persistant layer. Event's data is the
// contact to add (without id).
//
//     data:
//     {
//       id: "",
//       prenom: "Bruce",
//       nom: "Wayne",
//       numero: "000-000-000"
//     }
//
// #### On deleteContact.
//
// Try to delete an existing contact. Event's data is the contact id
// to delete.
//
//     data:
//     {
//       id: "01"
//     }
//
// #### On updateContact.
//
// Try to update an existing contact. Event's data is the contact to
// update with updated values.
//
//     data:
//     {
//       id: "42",
//       prenom: "BRUCE",
//       nom: "WAYNE",
//       numero: "000-000-000"
//     }
//
// ## Events <a href="events"></a>
//
// #### Trigger getAllContact(NOT)OK
//
// Get all contacts from persistant layer success or fail. If
// everything is ok, the event 'getAllContactOK' with all contact is
// triggered. Else, the event 'getAllContactNOTOK' is triggered
//
// #### Trigger addContact(NOT)OK
//
// Added contact to persistant layer success or fail. If the add
// contact success the event 'addContactOK' is triggererd with the new
// contact added. Else the event 'addContactNOTOK' is triggered.
//
// #### Trigger deleteContact(NOT)OK
//
// Delete contact from persistant layer success or fail. If contact is
// correctly deleted, the event 'deleteContactOK' with id of deleted
// contact is triggererd. Else, the event 'deleteContactNOTOK' is
// triggered.
//
// #### Trigger updateContact(NOT)OK
//
// Update contact from persistant layer. If contact is correctly
// updatetd, the event 'updateContactOK' with updatetd contact is
// triggererd. Else, the event 'updateContactNOTOK' is triggered'.

// ## ContactManager Code

'use strict';

define(
  [
    'components/flight/lib/component'
  ],

  function(defineComponent)  {
    return defineComponent(ContactManager);

    function ContactManager() {

      this.after('initialize', function() {
        // ### Handlers

        // #### Event: getAllContact.
        //
        // Get all contacts from persiatant layer.
        //
        // If everything is ok, the event 'getAllContactOK' with all
        // contact is triggered. Else, the event 'getAllContactNOTOK'
        // is triggered
        this.on('getAllContact', this.getAllContact);

        // #### Event: addContact.
        //
        // Add a new contact to the persistant layer.
        //
        //     data:
        //     {
        //       id: "",
        //       prenom: "Bruce",
        //       nom: "Wayne",
        //       numero: "000-000-000"
        //     }
        //
        // If everything is ok, the event 'addContactOK' with added
        // contact is triggered. Else, the event 'addContactNOTOK' is
        // triggered.
        this.on('addContact', this.addContact);

        // #### Event: deleteContact.
        //
        // Delete an existing contact.
        //
        //     data:
        //     {
        //       id: "01"
        //     }
        //
        // If contact is correctly deleted, the event
        // 'deleteContactOK' with id of deleted contact is triggererd.
        // Else, the event 'deleteContactNOTOK' is triggered.
        this.on('deleteContact', this.deleteContact);

        // #### Event: updateContact
        //
        // Update an existing contact.
        //
        //     data:
        //     {
        //       id: "42",
        //       prenom: "BRUCE",
        //       nom: "WAYNE",
        //       numero: "000-000-000"
        //     }
        //
        // If contact is correctly updatetd, the event
        // 'updateContactOK' with updatetd contact is triggererd.
        // Else, the event 'updateContactNOTOK' is triggered'.
        this.on('updateContact', this.updateContact);
      });


      // ### Actions

      // #### Get all contacts.
      //
      // Get all contacts from persiatant layer. If everything is ok,
      // the event 'getAllContactOK' with all contact is triggered.
      // Else, the event 'getAllContactNOTOK' is triggered.
      this.getAllContact = function() {
        var that = this;
        var href = this.attr.root + 'contacts/getAll';

        jQuery.ajax({
          url: href,
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            that.trigger('getAllContactOK', { contacts: data });
          },
          error: function(jqXHR, textStatus, errorThrown) {
            that.trigger('getAllContactNOTOk');
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }

      // #### Add a new contact.
      //
      // Add a new contact. If everything is ok, the event
      // 'addContactOK' with added contact is triggered. Else, the
      // event 'addContactNOTOK' is triggered.
      //
      //  * contact:  The contact to add.
      this.addContact = function(evt, contact) {
        var that = this;
        var href = this.attr.root + 'contacts/addContact';

        jQuery.ajax({
          url: href,
          type: 'POST',
          data: JSON.stringify(contact),
          dataType: 'json',
          success: function(data) {
            that.trigger('addContactOK', data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            that.trigger('addContactNOTOK', contact);
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }

      // #### Delete an existing contact.
      //
      // Delete an existing contact. If contact is correctly deleted,
      // the event 'deleteContactOK' with id of deleted contact is
      // triggererd. Else, the event 'deleteContactNOTOK' is
      // triggered.
      //
      // * data: Object containig id of the contact to delete.
      this.deleteContact = function(evt, data) {
        var that = this;
        var href = this.attr.root + 'contacts/editContact/' + data.id;

        jQuery.ajax({
          url: href,
          type: 'DELETE',
          dataType: 'json',
          success: function(data) {
            that.trigger('deleteContactOK', data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            that.trigger('deleteContactNOTOK', data);
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }

      // #### Update an existing contact.
      //
      // Update an existing contact. If contact is correctly updatetd,
      // the event 'updateContactOK' with updatetd contact is
      // triggererd. Else, the event 'updateContactNOTOK' is
      // triggered'.
      //
      // * contact: The contact with updatetd values.
      this.updateContact = function(evt, contact) {
        var that = this;
        var href = this.attr.root + 'contacts/editContact/' + contact.id;

        jQuery.ajax({
          url: href,
          type: 'PUT',
          data: JSON.stringify(contact),
          dataType: 'json',
          success: function(data) {
            that.trigger('updateContactOK', data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            that.trigger('updateContactNOTOK', contact);
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }

      // ### Attributes.
      this.defaultAttrs({
        // Root url of persistant layer
        root: '/'
      });
    }
  }
);
