var $window = $(window);
var $document = $(document);

var keyCodes = {
        UP  : 38,
        DOWN: 40
    }

var counter= 0;
(function($){

    
    $.fn.animatescroll = function(options) {
        
        // fetches options
        var opts = $.extend({},$.fn.animatescroll.defaults,options);
          
        // defines various easing effects
        $.easing['jswing'] = $.easing['swing'];
        $.extend( $.easing,
        {
                def: 'easeOutQuad',
                swing: function (x, t, b, c, d) {
                        return $.easing[$.easing.def](x, t, b, c, d);
                },
                easeInQuad: function (x, t, b, c, d) {
                        return c*(t/=d)*t + b;
                },
                easeOutQuad: function (x, t, b, c, d) {
                        return -c *(t/=d)*(t-2) + b;
                },
                easeInOutQuad: function (x, t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t + b;
                        return -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInCubic: function (x, t, b, c, d) {
                        return c*(t/=d)*t*t + b;
                },
                easeOutCubic: function (x, t, b, c, d) {
                        return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOutCubic: function (x, t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t*t + b;
                        return c/2*((t-=2)*t*t + 2) + b;
                },
                easeInQuart: function (x, t, b, c, d) {
                        return c*(t/=d)*t*t*t + b;
                },
                easeOutQuart: function (x, t, b, c, d) {
                        return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOutQuart: function (x, t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                        return -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                easeInQuint: function (x, t, b, c, d) {
                        return c*(t/=d)*t*t*t*t + b;
                },
                easeOutQuint: function (x, t, b, c, d) {
                        return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOutQuint: function (x, t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                        return c/2*((t-=2)*t*t*t*t + 2) + b;
                },
                easeInSine: function (x, t, b, c, d) {
                        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                },
                easeOutSine: function (x, t, b, c, d) {
                        return c * Math.sin(t/d * (Math.PI/2)) + b;
                },
                easeInOutSine: function (x, t, b, c, d) {
                        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                },
                easeInExpo: function (x, t, b, c, d) {
                        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                },
                easeOutExpo: function (x, t, b, c, d) {
                        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
                easeInOutExpo: function (x, t, b, c, d) {
                        if (t==0) return b;
                        if (t==d) return b+c;
                        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                },
                easeInCirc: function (x, t, b, c, d) {
                        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                },
                easeOutCirc: function (x, t, b, c, d) {
                        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                },
                easeInOutCirc: function (x, t, b, c, d) {
                        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                },
                easeInElastic: function (x, t, b, c, d) {
                        var s=1.70158;var p=0;var a=c;
                        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                        if (a < Math.abs(c)) { a=c; var s=p/4; }
                        else var s = p/(2*Math.PI) * Math.asin (c/a);
                        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                easeOutElastic: function (x, t, b, c, d) {
                        var s=1.70158;var p=0;var a=c;
                        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                        if (a < Math.abs(c)) { a=c; var s=p/4; }
                        else var s = p/(2*Math.PI) * Math.asin (c/a);
                        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                },
                easeInOutElastic: function (x, t, b, c, d) {
                        var s=1.70158;var p=0;var a=c;
                        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                        if (a < Math.abs(c)) { a=c; var s=p/4; }
                        else var s = p/(2*Math.PI) * Math.asin (c/a);
                        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                },
                easeInBack: function (x, t, b, c, d, s) {
                        if (s == undefined) s = 1.70158;
                        return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOutBack: function (x, t, b, c, d, s) {
                        if (s == undefined) s = 1.70158;
                        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOutBack: function (x, t, b, c, d, s) {
                        if (s == undefined) s = 1.70158; 
                        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                },
                easeInBounce: function (x, t, b, c, d) {
                        return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
                },
                easeOutBounce: function (x, t, b, c, d) {
                        if ((t/=d) < (1/2.75)) {
                                return c*(7.5625*t*t) + b;
                        } else if (t < (2/2.75)) {
                                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                        } else if (t < (2.5/2.75)) {
                                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                        } else {
                                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                        }
                },
                easeInOutBounce: function (x, t, b, c, d) {
                        if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
                        return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
        });
        
        if(opts.element == "html,body") {
            // Get the distance of particular id or class from top
            var offset = this.offset().top;
        
            // Scroll the page to the desired position
            $(opts.element).stop().animate({ scrollTop: offset - opts.padding}, opts.scrollSpeed, opts.easing);
        }
        else {
            // Scroll the element to the desired position
            $(opts.element).stop().animate({ scrollTop: this.offset().top - this.parent().offset().top + this.parent().scrollTop() - opts.padding}, opts.scrollSpeed, opts.easing);
        }
    };
    
    // default options
    $.fn.animatescroll.defaults = {        
        easing:"swing",
        scrollSpeed:3000,
        padding:0,
        element:"html,body"
    };   
    
}(jQuery));



var $cog = $('#cog'),
    $cog2= $('#cog2')
    $body = $(document.body),
    bodyHeight = $body.height();

$(window).scroll(function () {
    $cog.css({
        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * 360) + 'deg)'
    });
    $cog2.css({
        'transform': 'rotate(' + (-($body.scrollTop() / bodyHeight * 360) + 'deg)')

    });
});



// //Event Listeners 

//     $window.on("resize", onResize).resize();
    $window.on("mousewheel DOMMouseScroll", onMouseWheel);
    $document.on("keydown", onKeyDown);
//     $navButtons.on("click", onNavButtonClick);
//     $navGoPrev.on("click", goToPrevSlide);
//     $navGoNext.on("click", goToNextSlide);


function onMouseWheel(event)
    {
        //Normalize event wheel delta
        var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

        //If the user scrolled up, it goes to previous slide, otherwise - to next slide
        if(delta < -1)
        {
            counter+=1
        }
        else if(delta > 1)
        {
            counter= counter-1
        }

        if (counter==1){
            $(".meetwhite").animatescroll({padding:175});
            $('#connect').removeClass("active");
            $('#enhance').removeClass("active");
            $('#join').addClass("active");

        }
        else if (counter==2){
            $(".enhance").animatescroll({padding:170});
             $('#join').removeClass("active");
             $('#connect').removeClass("active");
            $('#enhance').addClass("active");
        }
        else if (counter==0){
            $(".connectwhite").animatescroll({padding:210});
             $('#connect').addClass("active");
              $('#enhance').removeClass("active");
               $('#join').removeClass("active");
        }

         if (counter > 2){
            counter = 2;
        }
        else if (counter < 0){
            counter = 0;
        }

        console.log('counter: ', counter)
        event.preventDefault();
    }

function onKeyDown(event)
    {

        var PRESSED_KEY = event.keyCode;

        if(PRESSED_KEY == keyCodes.UP)
        {
            counter= counter-1
            event.preventDefault();
        }
        else if(PRESSED_KEY == keyCodes.DOWN)
        {
             counter+=1
            event.preventDefault();
        }

        if (counter==1){
            $(".meetwhite").animatescroll({padding:175});
             $('#connect').removeClass("active");
            $('#enhance').removeClass("active");
            $('#join').addClass("active");
        }
        else if (counter==2){
            $(".enhance").animatescroll({padding:170});
            $('#join').removeClass("active");
             $('#connect').removeClass("active");
            $('#enhance').addClass("active");
        }
        
        else if (counter==0){
            $(".connectwhite").animatescroll({padding:210});
            ('#connect').addClass("active");
              $('#enhance').removeClass("active");
               $('#join').removeClass("active");
        }

        if (counter > 2){
            counter = 2;
        }
        else if (counter < 0){
            counter = 0;
        }

        console.log('counter: ', counter)


        event.preventDefault();

    }