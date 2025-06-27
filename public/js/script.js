

$(".visionaryoption .face").click(function(){

  const allSlideItems = $( '.vsSlider .slick-slide');

	var currentindex = getCurrentSlide1(allSlideItems, $(this).data("target"))
	const carouselEl = $('.vsSlider');

	if ( null !== currentindex ) {
			carouselEl.slick('slickGoTo', currentindex);
	}

})




function getCurrentSlide1(slideItems, itemid) {
	if ( !slideItems.length ) {
		 return null;
	}
	
	let slideIndex = null;
	
	for( let i = 0; i < slideItems.length; i++ ) {
		 const slideItemEl = $( slideItems[i] );
		 if (slideItemEl.attr('id') == itemid.replace("#","")) {
				slideIndex = slideItemEl.data('slick-index');
				// Make sure it's a non-negative slide
				if ( slideIndex >= 0 ) {
					 return slideIndex;
				}
		 }
	}
	
	return slideIndex;
}
