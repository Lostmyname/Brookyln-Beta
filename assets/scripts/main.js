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

        touchDevice = $html.hasClass('touch') ? true : false;

        // Set Dimensions
        setDimensions();

        // Skip onscroll listener if mobile device
        if (!touchDevice)
            $win.scroll(updateScrollHandler);

        // Init parallax 
        $scene.parallax();

        // Waypoint fired after / before first fold
        setWaypoints();

        //alert($('.scene .sprite').css('background-image'));
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
        
        parallaxHeight = ( !touchDevice && screen.width > mq.medium ) ? topMargin : 'auto'; 
        $parallax.css('height', parallaxHeight);

        // Don't make trail taller than parallax text
        $trail.css('max-height', $('.centered-content-parallax').height());

        // disable if touch device or greater than medium media query
        if (!touchDevice && screen.width > mq.medium )
            $header.css('top', parallaxHeight);
        else
            $header.css('top', 0);

 
    }


    function setWaypoints() {


        // Main - enable / disable parallax 
        $main.waypoint(function (direction) {

            if (direction === 'down') {
                // off
                if (parallax) {
                    $scene.parallax('disable');
                    
                    parallax = false;

                    if ( screen.width > mq.medium )
                        $scene.hide();
                    
                }
            } else {
                // on 
                if (!parallax) {
                    $scene.parallax('enable');

                    parallax = true;

                    // no need to hide / show parallax element if mobile
                    if ( screen.width > mq.medium )
                        $scene.show();
                }
            }
        });


        // disable if touch device or greater than medium media query
        if (!touchDevice && screen.width > mq.medium ){

            // Sticky Header
            $header.waypoint(function (direction) {
                if (direction === 'down')
                    $(this).css({ 'top': 0, 'position':'fixed' });
                else
                    $(this).css({ 'top': parallaxHeight, 'position':'absolute'  });
            });

            // Reveal / Hide images
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
