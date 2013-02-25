// * **Component:** UiConatctItems
// * **Date:** 2013-02-24
// * **Brief:** Manages contact items on ui.
//
// **UiContactItems** is a ui contact items manager enabeling each
// contact's item to generate events. Events represents the user action
// on ui. Event definitions is given in [events section](#events).
'use_strict';

define(
  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/templates'
  ],

  function(defineComponent, Mustache, templates) {
    return defineComponent(uiContactItems);

    function uiContactItems() {
      this.defaultAttrs({
        appSelector: '#app',
        itemSelector: 'tr.contactItem'
      });

      // ## Event's list <a id="events"></a>

      // * Selects an item. The selected item id is specified in the
      //   event body:
      //    {
      //      id: "01"
      //    }
      var SELECTED_ITEM_CONTACT = 'selectedItemContact';

      // #### Say a contact is selected.
      //
      // Trigger an event SELECTED_ITEM_CONTACT, saying a contact is
      // selected. The event body is the selected contact:
      //
      //    {
      //      id: "01",
      //      nom: "Wayne",
      //      prenom: "Bruce",
      //      num: "000-555-222"
      //    }
      this.itemSelected = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));

        this.trigger(SELECTED_ITEM_CONTACT, contactData);
      }

      // ## Print function

      // #### Print all contacts.
      this.printAllContacts = function() {
        var UiContactItems = this;

        jQuery.ajax({
          url: '/contacts/getAll',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            // Trigger resyncContactOk
            UiContactItems.trigger('resyncContactOk');

            // Print contact items
            UiContactItems.select('appSelector').html(
              Mustache.render(templates.contactListTemplate, {
                contactList: data,
                data: function() {
                  return JSON.stringify(this);
                },
                name: function() {
                  return this.prenom + " " + this.nom;
                }
              }));
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // Trigger resyncContactNotOk
            UiContactItems.trigger('resyncContactNotOk');

            // TODO: trigger event error
          }
        });
      }

      // ## Initialization

      this.after('initialize', function() {
        this.on('click', {
          itemSelector: this.itemSelected
        });

        // Print contact items.
        this.on('resyncContact', this.printAllContacts);
        this.trigger('resyncContact');
      });
    }
  }
);
