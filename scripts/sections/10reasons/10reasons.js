function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

$(document).ready(function(){
	preload([
        '/images/sections/10reasons/prev-hover.png',
        '/images/sections/10reasons/next-hover.png',
    ]);

    var num_slide = 0;
    var prev = $("#reasons-prev");
    var next = $("#reasons-next");
    var num = $("#count");
    var margin_top = 0;
    var hash = parseInt(location.hash.split("-")[1] - 1);
    var vel = 600;
    var height_slide = (IS_MOBILE) ? 290 : 580;

    setTimeout(function() {
		$("#reasons-slides").css("visibility", "visible");
	}, 200);

    function moveSlide (direction, isHash) {
    	if (isHash) {
    		vel = 0;
    		num_slide = hash;
    	} else {
    		vel = 600;
    		num_slide += direction;
    	}
    	num.text(num_slide + 1);
    	margin_top = num_slide * -height_slide;
    	$("#reasons-slides").stop().animate({
    		marginTop: margin_top
    	}, vel);
    	if (num_slide > 0){
            prev.removeClass("reasons-disabled");
        } else {
            prev.addClass("reasons-disabled");
        }
    	if (num_slide != 9){
            next.removeClass("reasons-disabled");
        } else {
            next.addClass("reasons-disabled");
        }
        ga('send', 'pageview', '/razon-' + num_slide );
    }

    if (hash && hash > 0 && hash <= 9) {
    	moveSlide(0 ,true);
    }

    $("#reasons-navigation div img").hover(
	    function () {
	    	if ($(this).parent().hasClass("reasons-disabled"))
	    		return 0;
	        if ($(this).parent().index() == 0)
	        	$(this).attr("src", "/images/sections/10reasons/prev-hover.png");
	        else
	        	$(this).attr("src", "/images/sections/10reasons/next-hover.png");
	    },
	    function () {
	        if ($(this).parent().index() == 0)
	        	$(this).attr("src", "/images/sections/10reasons/prev.png");
	        else
	        	$(this).attr("src", "/images/sections/10reasons/next.png");
	});

	$('#reasons-navigation').delegate('div', 'click', function(){
		if ($(this).hasClass("reasons-disabled"))
	    	return 0;
        if ($(this).index() == 0)
        	moveSlide(-1, false);
        else
        	moveSlide(1, false);
    });
});