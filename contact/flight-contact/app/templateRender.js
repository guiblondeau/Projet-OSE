// **Component:** TemplateRender\\
// **Date:** 2013-02-24\\
// **Brief:** Rendering templates for ui.\\
//
// **Template Render** is a ui template render enabeling:
//  * Render all contacts.
//  * Render a specific contact.
//  * Render edition of a contact.
//  * Render addition of a contact.
'use_strict';

define(
  [
    'components/flight/lib/component',
    'components/mustache/mustache',
    'app/templates'
  ],

  function(defineComponent, Mustache, templates) {
    return defineComponent(TemplateRender);

    function TemplateRender() {
      // ## Event's list <a id="events"></a>

      // ## Print function

      // #### Print all contacts.
      this.printAllContacts = function(evt) {
        var UiPrintItem = this;
        var href = '/contacts/getAll';

        jQuery.ajax({
          url: href,
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            // Trigger resyncContactOk
            UiPrintItem.trigger('resyncContactOk');

            // Render template
            UiPrintItem.select('appSelector').html(
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
            UiPrintItem.trigger('resyncContactNotOk');
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }

      // #### Print a specific contact.
      this.printContact = function(evt, data) {
        // Add name/data function for Mustache template
        data['name'] = function() {
          return this.prenom + " " + this.nom;
        };
        data['data'] = function() {
          return JSON.stringify(data);
        }

        // Render template
        this.select('appSelector').html(
            Mustache.render(templates.contactPrintTemplate, data));
      }

      // #### Print edition of contact.
      this.printEditContact = function(evt, data) {
        // Add name function for Mustache template
        data['name'] = function() {
          return this.prenom + " " + this.nom;
        };

        // Render template
        this.select('appSelector').html(
            Mustache.render(templates.contactEditTemplate, data));
      }

      // #### Print addition of a contact
      this.printAddContact = function(evt, data) {
        this.select('appSelector').html(
            Mustache.render(templates.contactAddTemplate));
      }

      // ## Initialization
      this.defaultAttrs({
        appSelector: '#app',
      });

      this.after('initialize', function() {
        // Print all contacts
        this.on('uiAskResyncContact', this.printAllContacts);
        this.on('addContactOK', this.printAllContacts);
        this.on('deleteContactOK', this.printAllContacts);
        this.on('updateContactOK', this.printAllContacts);

        // Print sepcific contact
        this.on('uiSelectedItemContact', this.printContact);

        // Print edition of an existing contact
        this.on('uiAskEditContact', this.printEditContact);

        // Print addition of a contact
        this.on('uiAskAddContact', this.printAddContact);

        // Print all contact at first.
        this.trigger('uiAskResyncContact');
      });
    }
  }
);
