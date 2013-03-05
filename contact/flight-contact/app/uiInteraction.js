// **Component:** UiInteraction\\
// **Date:** 2013-02-19\\
// **Brief:** Manage user interactions.
//
// **UiInteraction** is a "user interaction with ui" manager enabling
// tool and elements to generate events. Events represent the user
// action on ui. Definition of events is given in [Events'
// section](#events).
//
// ## Events <a id="events"></a>
//
// #### Trigger uiContactSelected.
//
// Trigger an event 'uiContactSelected' shows the selection of a
// contact by the user. The event data containing the selected
// contact.
//
//    data:
//    {
//      id: "01",
//      nom: "Wayne",
//      prenom: "Bruce",
//      numero: "000-000-000"
//    }
//
// #### Trigger uiSearchContactSelected.
//
// Trigger an event 'uiSearchContactSelected' showing the user
// intention to filter the contacts' list. The event's data containing
// the filter.
//
//    data:
//    {
//      query: "Wayne"
//    }
//
// #### Trigger uiResyncContactSelected.
//
// Trigger an event 'uiResyncContactSelected', asking to resynchronize
// the contacts' list.
//
// #### Trigger uiEditContactSelected
//
// Trigger an event 'uiEditContactSelected' showing the user intention
// to display the form in order to edit an existing contact. The
// event object throwing during trigger is the contact to edit.
//
//    data:
//    {
//      id: "01",
//      nom: "Wayne",
//      prenom: "Bruce",
//      numero: "000-000-000"
//    }
//
// #### Trigger uiAddContactSelected
//
// Trigger an event 'uiAddContactSelected' showing the user intention
// display the form in order to add a new contact.
//
// #### Trigger uiPreviousPageSelected
//
// Trigger an event 'uiPreviousPageSelected' showing the user
// intention to display the previous page. The content of data is the
// current page where previousPage event is triggered and extra data.
//
//    data:
//    {
//      current: "Current Page Name",
//      extraData: { ... }
//    }
//
// ### Trigger uiValidDeleteContactSelected
//
// Trigger an event 'uiValidDeleteContactSelected', validating the
// user intention to delete an existing contact. The body of event
// containing the id of contact to delete.
//
//    data:
//    {
//      id: "01"
//    }
//
// #### Trigger uiValidEditContactSelected
//
// Trigger an event 'uiValidEditContactSelected' validating the user
// intention to edit an existing contact. The body of event containing
// the contact to edit with updated values.
//
//    data:
//    {
//      id: "01",
//      nom: "WAYNE",
//      prenom: "BRUCE",
//      numero: "000-000-000"
//    }
//
// #### Trigger uiValidAddContactSelected
//
// Trigger an event 'uiValidAddContactSelected', validating the user
// intention to add a new contact. The body of event containing the
// contact to add (__not that id is not setted__).
//
//    {
//      id: "",
//      nom: "Wayne",
//      prenom: "Bruce",
//      numero: "000-000-000"
//    }
//

'use strict';

define(
  [
    'components/flight/lib/component'
  ],

  function(defineComponent)  {
    return defineComponent(UiInteraction);

    // ## UiInteraction Code.
    function UiInteraction() {

      // ### Actions

      // #### Say a contact is selected.
      this.contactSelected = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiContactSelected', contactData );
      }

      // #### Ask for filtering contacts' list.
      this.searchContactSelected = function(evt, data) {
        var searchString = jQuery(data.el).val();

        if (searchString.length >= 2) {
          this.trigger('uiSearchContactSelected', { query: searchString });
        }
      }

      // #### Ask for resynchronize contacts' list.
      this.resyncContactSelected = function(evt, data) {
        this.trigger('uiResyncContactSelected');
      }

      // #### Ask to edit an existing contact.
      this.editContactSelected = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiEditContactSelected', contactData);
      }

      // #### Ask generate page to a add a new contact.
      this.addContactSelected = function(evt, data) {
        this.trigger('uiAddContactSelected');
      }

      // #### Ask generate the previous page.
      this.previousPageSelected = function(evt, data) {
        var btn = jQuery(data.el);

        var page = btn.attr('page');
        var extraData;

        switch (page) {
        case 'editContactPage':
          var contactData = JSON.parse(btn.attr('contactData'));
          extraData = contactData;
          break;
        case 'addContactPage':
        case 'oneContactPage':
        default:
          break;
        }

        this.trigger('uiPreviousPageSelected', {
            'current': page,
            'extraData': extraData
        });
      }

      // #### Valid deletion of a contact.
      this.validDeleteContactSelected = function(evt, data) {
        var contactId = jQuery(data.el).attr('contactId');
        this.trigger('uiValidDeleteContactSelected', { id: contactId });
      }

      // #### Valid edition of an existing contact.
      this.validEditContactSelected = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiValidEditContactSelected', contactData);
      }

      // #### Valid addition of a contact.
      this.validAddContactSelected = function(evt, data) {
        var contactData = JSON.parse(jQuery(data.el).attr('contactData'));
        this.trigger('uiValidAddContactSelected', contactData);
      }

      // ## AOP part.

      // Before validEditContact, set the contact object to edit into
      // contactData attribute.
      //
      // TODO: Error in case of bad contact object.
      this.before('validEditContactSelected', function(evt, data) {
        var id = jQuery("#contact").attr('contactId');
        var nom = jQuery("#nom").val();
        var prenom = jQuery("#prenom").val();
        var numero = jQuery("#numero").val();


        jQuery(data.el).attr('contactData', JSON.stringify({
          'id': id,
          'nom': nom,
          'prenom': prenom,
          'numero': numero
        }));
      });

      // Before validAddContact, set the contact object to add into
      // contactData attribute.
      //
      // TODO: Error in case of bad contact object.
      this.before('validAddContactSelected', function(evt, data) {
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

      // #### UiSelector (html tools).
      this.defaultAttrs({
        searchSelector: '#searchContact',
        resyncSelector: '#resyncContact',
        addSelector: '#addContact',
        editSelector: '#editContact',
        previousPageSelector: '#previousPage',
        validDeleteSelector: '#deleteContact',
        validAddSelector: '#validAddContact',
        validEditSelector: '#validEditContact',
        contactSelector: 'tr.contactItem'
      });

      // #### Binding UiSelectors with UiTools events.
      this.after('initialize', function() {
        this.on('click', {
          contactSelector: this.contactSelected,
          resyncSelector: this.resyncContactSelected,
          editSelector: this.editContactSelected,
          addSelector: this.addContactSelected,
          previousPageSelector: this.previousPageSelected,
          validDeleteSelector: this.validDeleteContactSelected,
          validEditSelector: this.validEditContactSelected,
          validAddSelector: this.validAddContactSelected
        });
        this.on('keyup', {
          searchSelector: this.searchContactSelected
        });
      });
    }
  }
);
