'use strict';

define(

  [
    'app/contactManager.js',
    'app/uiInteraction',
    'app/uiPrint',
    'app/book'
  ],


  function(ContactManager, UiInteraction, UiPrint, Book) {

    function initialize() {
      ContactManager.attachTo(document);
      UiInteraction.attachTo(document);
      UiPrint.attachTo(document, { printSelector: '#app' });
      Book.attachTo(document);
    }

    return initialize;
  }
);
