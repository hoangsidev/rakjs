///////////////////////Focus tai vị tri cuoi
jQuery.fn.putCursorAtEnd = function() {

    return this.each(function() {

        // Cache references
        var $el = $(this),
            el = this;

        // Only focus if input isn't already
        if (!$el.is(":focus")) {
            $el.focus();
        }

        // If this function exists... (IE 9+)
        if (el.setSelectionRange) {

            // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
            var len = $el.val().length * 2;

            // Timeout seems to be required for Blink
            setTimeout(function() {
                el.setSelectionRange(len, len);
            }, 1);

        } else {

            // As a fallback, replace the contents with itself
            // Doesn't work in Chrome, but Chrome supports setSelectionRange
            $el.val($el.val());

        }

        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Chrome)
        this.scrollTop = 999999;

    });

};


$( document ).ready(function() {
	
///////////////////////Focus///////////////

$(".search-input")
  .putCursorAtEnd() // should be chainable
  .on("focus", function() { // could be on any event
    $(".search-input").putCursorAtEnd()
});
	
	
	////////////////////////////////
		$('#search_del_data').click(function(){
			$('#search').val(''); 
			$('#search').focus();
	   });
	
	$('.toogle-nav').click(function(){
		$('.primary-navigation').slideToggle();
	});
	
	
	$('.deletedata').click(function(){
		$(this).closest(".search").find(".search-input").val("");
		$(this).closest(".search").find(".search-input").focus();
	});
	
	
	///////////////////////////////////////

		 if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				  $(".search-group-child").addClass("active_trans");
				  $(".search-group-child2-wrap").addClass("active_trans2 search-group-child2-plus");
				  
					$(".regis-btn, .sign-in-btn, .signout-btn, .signinadmin-btn").css("z-index","1");
				   
				} else {
					$(".search-group-child").removeClass("active_trans");
					$(".search-group-child2-wrap").removeClass("active_trans2 search-group-child2-plus");
					
					$(".regis-btn, .sign-in-btn, .signout-btn, .signinadmin-btn").css("z-index","800");
				}
		
		$( window ).scroll(function() {
		  
				 if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				  $(".search-group-child").addClass("active_trans");
				  $(".search-group-child2-wrap").addClass("active_trans2 search-group-child2-plus");
				  
					$(".regis-btn, .sign-in-btn, .signout-btn, .signinadmin-btn").css("z-index","1");
				   
				} else {
					$(".search-group-child").removeClass("active_trans");
					$(".search-group-child2-wrap").removeClass("active_trans2 search-group-child2-plus");
					
					$(".regis-btn, .sign-in-btn, .signout-btn, .signinadmin-btn").css("z-index","800");
				}
		  
		});
		
		/////////////////not click//////
			
			$("a.notclick").click(function(event) {
         		event.preventDefault(); 
          });
		  
	/////////Ve kanji////////////////////
	
	$( ".search-draw-kanji" ).on( "click", function() {  
	
		 $(".form_draw .kanji-draw-wrap").show();
		  
		 InitThis();
		 
    });
	
	$( ".search-draw-kanji1" ).on( "click", function() {  
		 
		 $(".form_draw1 .kanji-draw-wrap").show();
		  
		 InitThis1();
		 
    });
		
	
	$(".close-kanji-draw").click(function(){
		$(".kanji-draw-wrap").hide();
	});
	
	
	
	
	/* Mẫu câu */
	$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
	
	$(".see_detail_btn").click(function(){
		 $(this).closest(".bhoechie-tab-item").find(".bhoechie-tab-item-content").toggle();
	});
	
	/*End  Mẫu câu */
	
		

});//end document









