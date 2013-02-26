'use strict';

define(
  function() {
    var contactListTemplate =
      '<!-- Header: Search/Add/Resynch -->\
       <div class="navbar navbar-fixed-top">\
         <div class="navbar-inner">\
           <div id="menu" class="container" >\
             <form class="navbar-form">\
               <input id="searchContact" type="text"\
                      class="search-query contactTool" placeholder="Search">\
               <button id="addContact" type="button" class="btn contactTool">\
                 <i class="icon-plus"></i>\
               </button>\
               <button id="resyncContact" type="button"\
                       class="btn btn-success  contactTool">\
                 <i class="icon-ok"></i>\
               </button>\
             </form>\
           </div>\
         </div>\
       </div>\
\
       <!-- Contact List -->\
       <div id="contactList" class="appContent">\
         <table id="contactsTable" class="table table-hover">\
           <tbody>\
             {{#contactList}}\
             <tr contactData="{{data}}" class="contactItem">\
               <td class="item">{{label}}</td>\
               <td class="img">\
                 <img src="http://dummyimage.com/64/000/fff.jpg&text={{name}}"\
                     class="img-polaroid"/>\
               </td>\
               <td class="name">{{name}}</td>\
             </tr>\
           {{/contactList}}\
           </tbody>\
         </table>\
       </div>';

    var contactPrintTemplate =
      '<!-- Header: Prec  -->\
       <div class="navbar navbar-fixed-top">\
         <div class="navbar-inner">\
           <div id="menu" class="container" >\
             <form class="navbar-form">\
               <button id="previousPage" type="button" class="btn contactTool">\
                 <i class="icon-chevron-left"></i>\
               </button>\
               <button id="editContact" type="button" contactData="{{data}}"\
                   class="btn contactTool pull-right">\
                 Modify\
               </button>\
             </form>\
           </div>\
         </div>\
       </div>\
\
       <div id="contactPrint" class="appContent">\
         <table>\
           <tbody>\
             <tr>\
               <td class="img">\
                 <img src="http://dummyimage.com/100/000/fff.jpg&text={{name}}"\
                      class="img-polaroid"/>\
               </td>\
               <td class="name">{{name}}</td>\
             </tr>\
             <tr>\
               <td class="inputLabel">First Name</td>\
               <td class="inputValue">{{nom}}</td>\
             </tr>\
             <tr>\
               <td class="inputLabel">Last Name</td>\
               <td class="inputValue">{{prenom}}</td>\
             </tr>\
             <tr>\
               <td class="inputLabel">Tel</td>\
               <td class="inputValue">{{numero}}</td>\
             </tr>\
           </tbody>\
         </table>\
       </div>';

    var contactEditTemplate =
      '<!-- Header: Search/Add/Resynch -->\
       <div class="navbar navbar-fixed-top">\
         <div class="navbar-inner">\
           <div id="menu" class="container" >\
             <form class="navbar-form">\
               <button id="previousPage" type="button" class="btn contactTool">\
                 <i class="icon-chevron-left"></i>\
               </button>\
               <button id="validEditContact" type="button"\
                    class="btn contactTool pull-right">\
                 OK\
               </button>\
             </form>\
           </div>\
         </div>\
       </div>\
\
       <div id="contactEdit" class="appContent">\
         <table>\
           <tbody>\
             <tr>\
               <td class="img">\
                 <img src="http://dummyimage.com/100/000/fff.jpg"\
                      class="img-polaroid"/>\
               </td>\
               <td class="name">{{name}}</td>\
             </tr>\
             <tr>\
               <td class="inputLabel">First Name</td>\
               <td class="inputValue"><input type="text" placeholder="{{prenom}}" /></td>\
             </tr>\
             <tr>\
               <td class="inputLabel">Last Name</td>\
               <td class="inputValue"><input type="text" placeholder="{{nom}}" /></td>\
             </tr>\
             <tr>\
               <td class="inputLabel">Tel</td>\
               <td class="inputValue"><input type="text" placeholder="{{numero}}" /</td>\
             </tr>\
           </tbody>\
         </table>\
\
         <button id="deleteContact" contactId="{{id}}"\
                 class="btn btn-large btn-block btn-danger contactTool"\
                 type="button">Delete</button>\
       </div>';

    var contactAddTemplate =
      '<!-- Header: Search/Add/Resynch -->\
       <div class="navbar navbar-fixed-top">\
         <div class="navbar-inner">\
           <div id="menu" class="container" >\
             <form class="navbar-form">\
               <button id="previousPage" type="button" class="btn contactTool previous">\
                 <i class="icon-chevron-left"></i>\
               </button>\
               <button id="validAddContact" type="button" class="btn contactTool pull-right">\
                 OK\
               </button>\
             </form>\
           </div>\
         </div>\
       </div>\
\
       <div id="contactAdd" class="appContent">\
         <table>\
           <tbody>\
             <tr>\
               <td class="img">\
                 <img src="http://dummyimage.com/100/000/fff.jpg"\
                      class="img-polaroid"/>\
               </td>\
               <td class="name"></td>\
             </tr>\
             <tr>\
               <td class="inputLabel">First Name</td>\
               <td class="inputValue"><input type="text" placeholder="Bruce" /></td>\
             </tr>\
             <tr>\
               <td class="inputLabel">Last Name</td>\
               <td class="inputValue"><input type="text" placeholder="Wayne" /></td>\
             </tr>\
             <tr>\
               <td class="inputLabel">Tel</td>\
               <td class="inputValue"><input type="text" placeholder="000-000-000" /></td>\
             </tr>\
           </tbody>\
         </table>\
       </div>';

    return {
      contactListTemplate: contactListTemplate,
      contactPrintTemplate: contactPrintTemplate,
      contactAddTemplate: contactAddTemplate,
      contactEditTemplate: contactEditTemplate
    }
  }

);