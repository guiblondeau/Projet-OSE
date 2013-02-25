'use strict';

define(

  [
    'app/uiContactItems',
    'app/uiContactItem',
    'app/uiTools'
  ],


  function(UiContactItems, UiContactItem, UiTools) {

    function initialize() {
      UiContactItems.attachTo(document);
      UiContactItem.attachTo(document);
      UiTools.attachTo(document);
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
