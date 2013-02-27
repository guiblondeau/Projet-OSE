'use strict';

define(
  function() {
    var contactListTemplate =
      '<!-- Header: Search/Add/Resynch -->\
       <div class="navbar navbar-fixed-top">\
         <div class="navbar-inner">\
           <div class="container" >\
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
       <div id="contactList">\
         <table id="contactsTable" class="table table-hover">\
           <tbody>\
             {{#contactList}}\
             <tr contactId="{{id}}">\
               <td class="item">{{label}}</td>\
               <td class="img">\
                 <img src="http://lorempixel.com/64/64/people/{{img}}" class="img-polaroid"/>\
               </td>\
               <td class="name">{{name}}</td>\
             </tr>\
           {{/contactList}}\
           </tbody>\
         </table>\
       </div>';

    var contatEditTemplate =
      '<div id="contactEdit">\
         <table>\
           <tbody>\
             <tr>\
               <td class="img">\
                 <img src="http://lorempixel.com/100/100/people/"\
                      class="img-polaroid"/>\
               </td>\
               <td class="name">{{name}}</td>\
             </tr>\
             <tr>\
               <td class="mailLabel">Mail</td>\
               <td class="mail">{{mail}}</td>\
             </tr>\
             <tr>\
               <td class="numLabel">Tel</td>\
               <td class="num">{{tel}}</td>\
             </tr>\
           </tbody>\
         </table>\
\
         <button id="deleteContact" contactId="{{id}}"\
                 class="btn btn-large btn-block btn-danger contactTool"\
                 type="button">Delete</button>\
       </div>';

    return {
      contactListTemplate: contactListTemplate,
      contatEditTemplate: contatEditTemplate
    }
  }

);
