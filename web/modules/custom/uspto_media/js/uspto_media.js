(function($) {

  Drupal.behaviors.uspto_media = {

    attach: function(context, settings) {

      // Need arrow navigation set up first so moving from theme.
      $('.arrow-navigation li:first-child', context).once('makeActive', function () {
        $(this).addClass('active');
      });

	  $( ".view-uspto-videos .view-content .mod-json-list" ).each(function( index ) {
		   var  $classes = $('.view-content .mod-json-list:eq('+index+') li:eq(0)').attr('class');
			 $(this).addClass($classes);
         });

	  $('.arrow-navigation ul li .child').parent('li').addClass('faq-child');
		 $(".view-uspto-videos.view-display-id-filter .name").each(function(){
        if($(this).parent().parent().hasClass('child') == true) {
		  var text = $(this).text().split(',')[1];
		  if (typeof text != 'undefined') {
            $(this).replaceWith('<span class="name">'+text+'</span>');
		  } else {
		    $(this).replaceWith('<span class="name">'+$(this).text()+'</span>');
		  }
		}
       });

	   if ($('.view-uspto-videos .arrow-navigation li').hasClass('faq-child') ) {
	     $( ".arrow-navigation .faq-child" ).each(function( index ) {
             var filterclass = $(this).attr('class').split(' ')[0];
		     $('.view-content .mod-json-list li.'+filterclass+':eq(0)').closest('ul').parent().attr('data-sort',index);
         });
	   }
	   else {
	     $( ".view-uspto-videos .arrow-navigation li" ).each(function( index ) {
             var filterclass = $(this).attr('class').split(' ')[0];
		     $('.view-content .mod-json-list li.'+filterclass+':eq(0)').closest('ul').parent().attr('data-sort',index);
         });
	   }

	   $('.view-content').find('.mod-json-list').sort(function (a, b) {
         return $(a).attr('data-sort') - $(b).attr('data-sort');
       })
       .appendTo('.view-content:eq(1)');

	  $('.arrow-navigation li').on("click", function(event) {

		var ul = $(this).closest('ul');
		var hide_h3 = $(this).attr('class').split(' ')[0];

		if (hide_h3 == 'type-all-videos') {
		  $('.mod-json-list[data-count != 0]').show();
		}
		else {
		  $('.mod-json-list').hide();
	      $('.view-content ul .' + hide_h3).closest('.mod-json-list[data-count != 0]').show();

		}

        if (! $(this).hasClass('active')) {
          $('li', ul).removeClass('active');
          $(this).addClass('active');
        }
		event.preventDefault();

		$('html, body').animate({
            scrollTop: 300
        }, 500);


      });

      if (window.location.hash) {
        var hash = window.location.hash.replace('#', '');
        $('.arrow-navigation li.' + hash, context).click();
      }

	  media_counter();


      function media_counter(){
        $('.uspto-filter ul li').each(function(id, item) {
          var className = $(item).attr('class').split(' ')[0];
          if (className != 'type-all-videos') {
	        var counts =  $('.view-id-uspto_videos.view-display-id-list > .view-content .mod-json-list ul li.'+className+':visible').length;
	        $(item).find('.count').text(counts);
			$('.view-id-uspto_videos.view-display-id-list > .view-content .mod-json-list ul li.'+className).closest('.mod-json-list').attr('data-count',counts);
          }
        });
      }

	  /*pager*/
      $( '<ul class="pager all"></ul>' ).appendTo(".view-uspto-videos .view-content:eq(1)" );
	  $(".view-uspto-videos .view-content:eq(1)").pajinate({
					num_page_links_to_display : 9,
					items_per_page : 20,
					item_container_id : "ul",
					nav_panel_id : ".pager.all"
	  });



	  $('.view-uspto-videos .arrow-navigation li').click(function() {
		$('ul.pager').html('');
		var $class = $(this).attr('class').split(' ')[0];
		var con = '.mod-json-list.'+$class+' ul';
		if ($class == 'type-all-videos'){
		  $(".view-uspto-videos .view-content:eq(1)").pajinate({
					num_page_links_to_display : 9,
					items_per_page : 20,
					item_container_id : "ul",
					nav_panel_id : ".pager.all"
		  });
		}
		else {
		  $('.view-uspto-videos .view-content .mod-json-list li').show();
		  $(".view-uspto-videos .view-content:eq(1)").pajinate({
					num_page_links_to_display : 9,
					items_per_page : 20,
					item_container_id : con,
					nav_panel_id : ".pager.all"
		  });

		}

	});

		  $( ".view-uspto-videos .view-content .mod-json-list" ).each(function( index ) {
        	var $count = $('.view-uspto-videos .view-content .mod-json-list:eq('+index+') li:visible').length;
			 if($count == 0) {
			   $('.view-uspto-videos .view-content .mod-json-list:eq('+index+') h3').hide();
			 }
			 else {
			   $('.view-uspto-videos .view-content .mod-json-list:eq('+index+') h3').show();
			 }
         });

		 setInterval(function () {
		   $('.view-uspto-videos ul.pager li a, .view-uspto-videos .arrow-navigation li').once().bind('click', function () {

			 setTimeout(function () {
			 $( ".view-uspto-videos .view-content .mod-json-list" ).each(function( index ) {
        	  var $count = $('.view-uspto-videos .view-content .mod-json-list:eq('+index+') li:visible').length;
			   if($count == 0) {
			     $('.view-uspto-videos .view-content .mod-json-list:eq('+index+') h3').hide();
			   }
			   else {
			     $('.view-uspto-videos .view-content .mod-json-list:eq('+index+') h3').show();
			   }

           });

            $('html, body').animate({
              scrollTop: 300
            }, 500);

		  }, 500);
		   });

		 }, 5);


	}

  };

}(jQuery));
