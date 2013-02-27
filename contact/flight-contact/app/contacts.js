// **Component:** Contact\\
// **Date:** 2013-02-26\\
// **Brief:** Manage contacts.
//
// **Contact** manages contacts. It enables:
//  * Add a new contact.
//  * Edit an existing contact.
//  * Delete an existing contact.
//
// For each action an event is trigger. The event acting as a status
// code, i.e., OK: action success, NOTOK: action failed.
'use strict';

define(
  [
    'components/flight/lib/component'
  ],

  function(defineComponent)  {
    return defineComponent(contacts);

    function contacts() {
      // ## Events' list <a id="events"></a>.

      // #### Add a new contact.
      //
      // Add a new contact. If everything is ok, the event
      // 'addContactOK' with added contact is triggered. Else, the
      // event 'addContactNOTOK' is triggered.
      //
      //  * contact:  The contact to add.
      this.addContact = function(evt, contact) {
        var that = this;
        var href = '/contacts/addContact';

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
        var href = '/contacts/editContact/' + data.id;

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
        var href = '/contacts/editContact/' + contact.id;
        console.log(contact);
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

      // ## Initialization.

      // Binding ui tools with UiTools events.
      this.after('initialize', function() {
        this.on('uiValidAddContact', this.addContact);
        this.on('uiValidDeleteContact', this.deleteContact);
        this.on('uiValidEditContact', this.updateContact);
      });
    }
  }
);
