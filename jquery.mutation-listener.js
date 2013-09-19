(function ($) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
      observers = [];

  $.fn.add_mutation_listner = function (target_class_selector, callback_event_name) {

    return this.each(function(){
      if (typeof (MutationObserver) !== 'undefined') {
        var config = {
              attributes: true,
              childList: true,
              characterData: true
            };

            context = $(this).get(0);
            //Convert css selector
            target_class_selector = target_class_selector.split('.').join(' ').trim();

        callback = function (mutations) {
          $.each(mutations, function (index, mutation) {
            switch (mutation.type) {
              case 'childList':
                addedNodes_callback(mutation.addedNodes);
                break;
              case 'characterData':
                //
                break;
            }
          });
        },

        addedNodes_callback = function (addedNodes) {
          /**
           * Logic added to proplerly match css selector
           * Will match "matt" in "matt class" or "class matt", but not "matt2" in "matt class", or "matt class" in "matt"
           */
          var target_class_array = target_class_selector.split(' '),
              node_class_array = '',
              class_selectors_not_matching = target_class_array.length;

          $.each(addedNodes, function (index, addedNode) {
            if (typeof(addedNode.className) !== 'undefined') {
              node_class_array = addedNode.className.split(' ');

              $.each(node_class_array, function(i) {
                var node_class = node_class_array[i];
                $.each(target_class_array, function(i2) {
                  var target_class = target_class_array[i2];
                  if(node_class === target_class) {
                    class_selectors_not_matching--;
                  }
                }); 
              });
              
              if(class_selectors_not_matching === 0) {
                $(document).trigger(callback_event_name);
              }
            }
          });
        };

        observers.push(new MutationObserver(callback).observe(context, config));

      } else if (typeof (MutationEvent) !== 'undefined') {
        $(this).on('DOMNodeInserted', function (e) {
          var fn = arguments.callee;
          if ($(target_class_selector).length > 0) {
            $(document).trigger(callback_event_name);
            $(this).off('DOMNodeInserted', fn);
          }
        });
      } else {
        throw('Web Browser does not support MutationObserver API or MutationEvent API');
      }
    });
  };
})(jQuery);

