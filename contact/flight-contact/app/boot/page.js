'use strict';

define(

  [
    'app/contacts.js',
    'app/templateRender',
    'app/uiInteraction'
  ],


  function(Contacts, TemplateRender, UiInteraction) {

    function initialize() {
      Contacts.attachTo(document);
      TemplateRender.attachTo(document);
      UiInteraction.attachTo(document);
      /*
      MailItemsData.attachTo(document);
      ComposeBoxData.attachTo(document);
      MoveToData.attachTo(document);
      MailItemsUI.attachTo('#mail_items', {itemContainerSelector: '#mail_items_TB'});
      MailControlsUI.attachTo('#mail_controls');
      ComposeBoxUI.attachTo('#compose_box');
      FoldersUI.attachTo('#folders');
      MoveToSelectorUI.attachTo('#move_to_selector', {moveActionSelector: '#move_mail'});
      */
    }

    return initialize;
  }
);
