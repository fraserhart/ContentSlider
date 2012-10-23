/*
 * jQuery Content Slider v1.0
 * http://www.fraser-hart.co.uk
 *
 * Copyright 2012, Fraser Hart
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
    $.fn.subSlider = function(options) {
    	//default settings
    	var settings = $.extend( {
	      'speed' : 200,
	      'addClasses' : "" 
	    }, options);
	    
        var elems = this.find("ul").first().find("li");
        this.addClass('subSlider').wrap('<div class="subSliderWrapper '+settings.addClasses+'" style="height: '+this.css('height')+'; width: '+this.css('width')+'; float: left; position: relative" />');
        var numberOfSlides = parseInt(elems.length),
			eachWidth = parseInt(elems.css("width").replace("px", "")),
			eachBorder = parseInt(elems.css("border-right-width"))+parseInt(elems.css("border-left-width")),
			eachPadding = parseInt(elems.css("padding-right"))+parseInt(elems.css("padding-left")),
			totalItemWidth = eachWidth+eachBorder+eachPadding,
			totalWidth = totalItemWidth*numberOfSlides;
		
		function showHideNav(elementToMove){
			if (elementToMove.css("margin-left") == "0px"){
				elementToMove.parent().parent().find('.subSliderNav').not('.next').hide();
			} else {
				elementToMove.parent().parent().find('.subSliderNav').not('.next').show();
			};
			
			var overlap = totalWidth-elementToMove.parent().width();
			if (parseInt(elementToMove.css("margin-left").replace('px','')) <= -overlap){
				elementToMove.parent().parent().find('.subSliderNav.next').hide();
			} else {
				elementToMove.parent().parent().find('.subSliderNav.next').show();
			}
		}
		$(this).parent().prepend('<div class="subSliderNav"></div><div class="subSliderNav next"></div>');
		$(this).parent().find('ul').width(totalWidth);
		$(this).parent().on("click", ".subSliderNav", function(){
			var direction = $(this).hasClass('next')?"-":"+";
			var elementToMove = $(this).parent().find('.subSlider ul');
			elementToMove.animate({
				"margin-left": direction+"="+totalItemWidth
			}, settings.speed, function(){
				showHideNav(elementToMove);
			});
		});
		showHideNav($(this).find('ul'));
    };
})( jQuery );