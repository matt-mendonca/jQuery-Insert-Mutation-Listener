/*
Test code
*/
(function($) {
  $('body').add_mutation_listner('.class.matt', 'matt_class_added');
  
  $('body').add_mutation_listner('.matt2', 'matt2_class_added');

  $(document).on('matt_class_added', function(e){
    console.log('matt div added');
  });
  
  $(document).on('matt2_class_added', function(e){
    console.log('matt2 div added');
  });

  $(function() {
    $('body').append('<div class="matt class"></div>');
    $('body').append('<div class="matt2 class"></div>');
  });
})(jQuery);