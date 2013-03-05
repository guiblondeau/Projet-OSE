'use strict';

define(

  [
    'app/contactManager.js',
    'app/templateRender',
    'app/uiInteraction',
    'app/uiPrint'
  ],


  function(ContactManager, TemplateRender, UiInteraction, UiPrint) {

    function initialize() {
      ContactManager.attachTo(document);
      TemplateRender.attachTo(document);
      UiInteraction.attachTo(document);
      UiPrint.attachTo(document, { printSelector: '#app' });
    }

    return initialize;
  }
);
