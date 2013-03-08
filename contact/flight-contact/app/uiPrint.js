// **Component:** UiPrint
//
// **Date:** 2013-03-01
//
// **Brief:** Print data on html page with effects.
//
// **UiPrint** erase and prints data on page with different effects. It enables:
//
// * Print data with a forward slide effect.
//
// * Print data with a backward slide effect.
//
// * Print data with a no effect.
//
// Each action is tangled with an event. The events' list and their
// data is describe in [Handlers' section](#handlers).
//
// ## Handlers <a id="handlers"></a>
//
// #### On print
//
// Simply print data on html page. Event's data is the html code.
//
//     data:
//     {
//       html: "__to print code__"
//     }
//
// #### On printForward
//
// Print data with a forward slide effect. Event's data is the html code.
//
//     data:
//     {
//       html: "__to print code__"
//     }
//
// #### On printBackward
//
// Print data with a backward slide effect. Event's data is the html code.
//
//     data:
//     {
//       html: "__to print code__"
//     }

// ## UiPrint Code.

'use strict';

define(
  [
    'components/flight/lib/component'
  ],

  function(defineComponent)  {
    return defineComponent(UiPrint);

    function UiPrint() {

      this.after('initialize', function() {
        // ### Handlers

        // #### Event: print.
        //
        // Simply print data on html page. Event's data is the html
        // code.
        //
        //     data:
        //     {
        //       html: "__to print code__"
        //     }
        this.on('print', this.print);

        // #### Event printForward
        //
        // Print data with a forward slide effect. Event's data is the
        // html code.
        //
        //     data:
        //     {
        //       html: "__to print code__"
        //     }
        this.on('printForward', this.printForward);

        // #### Event printBackward
        //
        // Print data with a backward slide effect. Event's data is
        // the html code.
        //
        //     data:
        //     {
        //       html: "__to print code__"
        //     }
        this.on('printBackward', this.printBackward);
      });

      // ### Actions

      // #### Print html data.
      this.print = function(evt, data) {
        this.select('printSelector').html(data.html);
      }

      // #### Print html data with a forward slide effect.
      this.printForward = function(evt, data) {
        var print = this.select('printSelector');
        var width = parseInt(print.css('width'));

        var transfer =  jQuery('<div></div>');
        var current = jQuery('<div></div>');
        var next = jQuery('<div></div>');

        transfer.css({
            'width': (2 * width) + 'px'
        });
        current.css({
            'width': width + 'px',
            'left': '0', 'float': 'left'
        });
        next.css({
            'width': width + 'px',
            'left': width + 'px',
            'float': 'left'
        });

        current.html(print.html());
        next.html(data.html);
        transfer.append(current).append(next);

        print.html('').append(transfer);

        transfer.animate({'margin-left': '-' + width + 'px' }, 300, function() {
          print.html(data.html);
        });
      }

      // #### Print html data with a backward slide effect.
      this.printBackward = function(evt, data) {
        var print = this.select('printSelector');
        var width = parseInt(print.css('width'));

        var transfer =  jQuery('<div></div>');
        var current = jQuery('<div></div>');
        var previous = jQuery('<div></div>');

        transfer.css({
            'width': (2 * width) + 'px'
        });
        current.css({
            'width': width + 'px',
            'position': 'relative',
            'left': '-' + width + 'px',
            'float': 'left'
        });
        previous.css({
            'width': width + 'px',
            'position': 'relative',
            'left': '-' + width + 'px',
            'float': 'left'
        });

        current.html(print.html());
        previous.html(data.html);
        transfer.append(previous).append(current);

        print.html('').append(transfer);

        transfer.animate({'margin-left': width + 'px' }, 300, function() {
          print.html(data.html);
        });
      }

      // ### Attributes.
      this.defaultAttrs({
        // Id to print data. Must be setted on component
        // instanciation.
        printSelector: ''
      });
    }
  }
);
