(function ($) {

    var $win = $(window),
        $doc = $(document),

        
        $html = $('html'),
        $parallax = $('.parallax'),
        $scene = $('.scene'),
        $main = $('.main'),
        $titles = $('.boy-girl-text'),
        $copy = $('.text'),
        $header = $('header'),
        $trail = $('.trail');

    var screen = { 	
	    	width : 0,
	    	height : 0
	    },
	    mq = {
	    	// small : 450,
	    	medium : 900
	    },
        scrollTop,
        topMargin,
        parallax = true,
        parallaxHeight,
        wayPointOffSet;

    $doc.ready(setup);
    $win.resize(setDimensions);


    function setup() {

        // Set Dimensions
        setDimensions();

        touchDevice = $html.hasClass('touch') ? true : false;

        // Skip onscroll listener if mobile device
        if (!touchDevice)
            $win.scroll(updateScrollHandler);

        // Init parallax 
        $scene.parallax();

        // Waypoint fired after / before first fold
        setWaypoints();
    }


    function updateScrollHandler() {
        scrollTop = $win.scrollTop();

        // Trail / Scene / Parallax 
        if (scrollTop < topMargin) {
            $scene.css('top', 50 - ((topMargin * scrollTop) / 20000) + '%');
            $trail.removeClass('display');
        } else if (scrollTop > topMargin) {
            $trail.css('height', (scrollTop * 1.15) - topMargin).addClass('display');
        }
    }


    function setDimensions() {

        scrollTop 		= $win.scrollTop();
        screen.height 	= $win.height();
        screen.width 	= $win.width();
        topMargin 		= screen.height - $header.height();
        wayPointOffSet 	= ( screen.height / 3 ) * 2;

        parallaxHeight = screen.width < mq.medium ? 350 : topMargin; 
        $parallax.css('height', parallaxHeight);
        $header.css('top', parallaxHeight);
    }


    function setWaypoints() {

        // Sticky Header
        $header.waypoint(function (direction) {
            if (direction === 'down')
                $header.css({
                    'top': 0,
                    'position': 'fixed'
                });
            else
                $header.css({
                    'top': parallaxHeight,
                    'position': 'absolute'
                });
        });


        // Main - enable / disable parallax 
        $main.waypoint(function (direction) {

            if (direction === 'down') {
                // off
                if (parallax) {
                    $scene.parallax('disable');
                    $scene.hide();
                    parallax = false;
                }
            } else {
                // on 
                if (!parallax) {
                    $scene.parallax('enable');
                    $scene.show();
                    parallax = true;
                }
            }
        });


        // Reveal / Hide images
        if (!touchDevice){
	        $('.centered-bg-images li').each(function () {

	            $(this).waypoint(function (direction) {

	                if (direction === 'down')
	                    $(this).addClass('reveal');
	                else
	                    $(this).removeClass('reveal');

	            }, {
	                offset: wayPointOffSet
	            });
	        });
	    }
    }

})(jQuery);