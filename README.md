jQuery Insert Mutation Listener
===============================

jQuery plugin that provides a helper function to bind to node insertions using the Mutation Observer API, with a fallback to Mutation Events API.

## Intended Use: Reacting to Dynamic Content

The intended use of this plugin is to simplify reacting to dynamic content. 

Ideally, when the dom is modified after ready or loaded states, events are triggered to broadcast mutations: 
```js
some-namespace.add_div = function() {
  $('body').append('<div class="my-div"></div>');
  $(document).trigger('my-div_added');
};
```
This allows you to react easily:
```js
$(document).on('my-div_added', function() {
  $('.my-div').addClass('modded');
});
```
However, this is not always the case. 

### Using the Plugin: 

Suppose that the div class="my-div" is added in asynchronously, after doc ready or window load, and no event is triggered when it is inserted. Here is the plugin used in this situation:

```js
// Hypothetical external code

some-namespace.add_div = function() {
  $('body').append('<div class="my-div"></div>');
};

// Your code

/**
 * Call the plugin function
 * Sytax:
 * $('context').add_mutatino_listner('.class-selector-of-node-to-watch-for', 'event-to-trigger-when-node-is-inserted')
 */
$('body').add_mutation_listner('.my.div', 'my-div_added');


// Bind to event triggered by plugin
$(document).on('my-div_added', function(e){
  $('.my-div').addClass('modded');
});
```
