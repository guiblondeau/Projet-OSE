// * **Component:** UiConatctItem
// * **Date:** 2013-02-24
// * **Brief:** Manages a contact item on ui.
//
// **UiContactItem** is a ui contact item manager enabeling adds and
// edits a contact item. Events represents the user action
// on ui. Event definitions is given in [events section](#events).
'use_strict';

define(
  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/templates'
  ],

  function(defineComponent, Mustache, templates) {
    return defineComponent(uiContactItem);

    function uiContactItem() {
      this.defaultAttrs({
        appSelector: '#app',
      });

      // ## Event's list <a id="events"></a>

      // ## Print function

      // #### Print a contact.
      this.printContact = function(evt, data) {
        // Add name/data function for Mustache template
        data['name'] = function() {
          return this.prenom + " " + this.nom;
        };
        data['data'] = function() {
          return JSON.stringify(data);
        }

        // Print edit contact
        this.select('appSelector').slideTo(
            Mustache.render(templates.contactPrintTemplate, data));
      }

      // #### Print edition of contact.
      this.printEditContact = function(evt, data) {
        // Add name function for Mustache template
        data['name'] = function() {
          return this.prenom + " " + this.nom;
        };

        // Print edit contact
        this.select('appSelector').slideTo(
            Mustache.render(templates.contactEditTemplate, data));
      }

      // ## Initialization

      this.after('initialize', function() {
        // Print sepcific contact.
        this.on('selectedItemContact', this.printContact);
        // Print an edit of existing contact.
        this.on('editContact', this.printEditContact);
      });
    }
  }
);
