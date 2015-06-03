//HTMLInspector.inspect();
function getPos( name ) {
    var offsets = document.getElementById( name ).getBoundingClientRect();
    return { x: offsets.left, y:offsets.top }
}
$(document).ready(function(){
    var $sxc_name = $('#sxc_name'),
        $sxc_tel = $('#sxc_tel'),
        $sxc_email = $('#sxc_email');
    $sxc_name.on('focusout', function(){
        $.validate_input( $sxc_name );

    });
    $sxc_tel.on('focusout', function(){
        $.validate_input( $sxc_tel );
    });
    $sxc_email.on('focusout', function(){
        $.validate_input( $sxc_email );
    });
    $.test_drive_promo_s_cross = function( form ){
        var form_errors = 0;

        if( !$.validate_input( $sxc_email ) ){
            form_errors++;
            $sxc_email.focus();
        }
        if( !$.validate_input( $sxc_tel ) ){
            form_errors++;
            $sxc_tel.focus();
        }
        if( !$.validate_input( $sxc_name ) ){
            form_errors++;
            $sxc_name.focus();
        }
        if( form_errors === 0 ){
            var data = {
                email   : $sxc_email.val(),
                name    : $sxc_name.val(),
                phone   : $sxc_tel.val(),
                source  : 's_cross-promo-home'
            };
            var precio_actual = showMeTheMoney( 's-cross');
            analytics_test_drive( 'S-Cross_home', 0.071 * precio_actual );

            $('#sxc_send').attr({disabled:'disabled'}).animate({opacity:'0.5'});
            var service_url = 'services/request/test_drive.json';


            $.ajax({
                cache       : false,
                data        : data,
                dataType    : 'json',
                type        : 'post',
                success     : function( data ){
                    if( data.status == 'ok' ){
                        $('#sxc_email_review').text( $sxc_email.val() );
                        $('.first-step').fadeOut( 300, function(){
                            $('.second-step').removeClass('hidden').hide().fadeIn();
                        });
                    }else{
                        $('#sxc_send').removeAttr(disabled).animate({opacity:'1'});
                        alert( data.message );
                    }
                },
                url     : service_url
            });
        }
    }
    $('.car-map').on('mouseover mouseout', function( e ){
        $('#menu-cars-home .item a').removeClass('over');
        if( e.type == 'mouseover' ){
            $('#menu-cars-home a').eq( $(this).index()).addClass('over');
        }
    });
    $('.get-more a').on('click', function( e ){
        e.preventDefault();
        var url = $(this).attr( 'href' );
        if( url != '') {
            $( this ).attr({ href : '' }).fadeOut( 300 );
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                contentType: 'application/json',
                success: function( data ){
                    console.log(data);
                    if( data.status == 'ok' ){
                        var h1 = $("#way-of-life-content").height();
                        $("#way-of-life-content .item").addClass('old');
                        $("#way-of-life-content").append( data.data.html );
                        $("#way-of-life-content .item:not(.old)").each(function( i ){
                            $(this).css({opacity : 0}).delay(  i * 100  ).animate({ opacity : 1 })
                        });
                        if( data.data.index > 1 ){
                            $('.get-more a').attr({ href : '/services/way_of_life/get/' +  data.data.index }).stop().hide().delay( 1500 ).fadeIn( 300 );
                        }
                    }
                }
            });
        }
    });
    var flash = $("#home-scross .full_width .flash");
    flash.css({opacity:0, display:'block'});
    $("#home-scross").hover(function(){
        flash.stop().animate({opacity:1},300);
    }, function(){
        flash.stop().animate({opacity:0},2000,function(){
            run_faros();
        });
    });
    function run_faros() {
        flash.stop().animate({opacity:1},2000, function(){
            $(this).animate({opacity:0},2000, function(){
                run_faros();
            });
        });
    }
    run_faros();
    var scross_opened = false,
        $video_home_cross = $('#video-home-scross');

    if( !checkVideoSupport() ){
        $video_home_cross.remove();
        $('.promo-video-bg').html('&nbsp;');
    }
    $.scross_video_resize = function(){
        // Acomodar el video al centro
            //width
        var w =  $(window).width();
        w = ( w > 1280 )? w : 1280;
        var  //height
            h =  w * 0.5625,
            //Margin top
            mt = ( h - 700 ) * -0.5;

            $video_home_cross
            .width( w )
            .height( h )
            .css({marginTop:mt});
    }

    $.scross_form_open = function(){
        if( !scross_opened ){
            ga('send', 'event', 'S-Cross home', 'Clic', 'Ver_detalles');
            $(".hide_s-cross").slideUp();
            $('body').animate({scrollTop:0}, '300', 'swing');
            $(".full_width").fadeOut();
            $('.s-cross_form').hide().removeClass('hidden').fadeIn(3000);
            $("#home-scross").delay(300).animate({
                height:700
            },500);
            if( checkVideoSupport() ){
                $(window).resize(function(){
                    $.scross_video_resize();
                });
                $.scross_video_resize();
                var video = $video_home_cross.get(0);
                video.play();
            }
            $("#home-scross").toggleClass('cursor-click');
            scross_opened = true;
        }
    }
    $.scross_form_close = function(){
        if( scross_opened ){
            ga('send', 'event', 'S-Cross home', 'Clic', 'Cerrar');
            $('.s-cross_form').fadeOut(300);
            $("#home-scross").animate({
                height:230
            },500);
            $('body').animate({scrollTop:0}, '500', 'swing');
            $(".full_width").delay(500).fadeIn();
            $(".hide_s-cross").delay(500).slideDown();
            $('body').delay(800).animate({scrollTop:470}, '600', function(){
                $("#home-scross").toggleClass('cursor-click');
                scross_opened = false;
            });
        }
    }
    $("#home-scross").click(function(){
        $.scross_form_open();
    });
    $(".s-cross_close,#s-cross_finish").click(function(){
        $.scross_form_close();
    });
    $("#way-of-life-content").delegate('section.wol-content.photo, section.wol-content.quote','click',function(){
        var regexp, url ,bg_url  = $(this).find('.content').css('background-image');
        bg_url  = /^url\((['"]?)(.*)\1\)$/.exec( bg_url  );
        bg_url = bg_url ? bg_url[2] : "";
        regexp = new RegExp( "http:\/\/"+document.domain );
        bg_url = bg_url.replace( regexp, '');
        $('.fancybox-thumbs').each(function(){
            url = $(this).attr('href');
            if( url == bg_url ){
                $(this).trigger('click');
                return false;
            }
        });
    });
    $('a.fancybox-thumbs').fancybox({
        arrows      : true,
        autoSize	: false,
        closeBtn    : true,
        fitToView	: true,
        height		: '70%',
        helpers : {
            title : {
                type : 'over'
            },
            thumbs : {
                width  : 50,
                height : 50
            }
        },
        maxHeight	: 600,
        maxWidth	: 800,
        nextEffect  : 'none',
        nextClick   : true,
        padding     : 0,
        prevEffect  : 'none',
        width		: '70%'
    });
    $('.play-video-fancybox').fancybox({
        autoSize	: false,
        closeClick	: false,
        closeEffect	: 'none',
        fitToView	: false,
        height		: '70%',
        maxWidth	: 800,
        maxHeight	: 600,
        openEffect	: 'none',
        padding     : 0,
        width		: '70%'
    });
    /*if( IS_MOBILE ) {

        var margin = 0;
        var menu_cars = $("#menu-cars-home");
        var num_slides = menu_cars.find(".item").length;
        var width_slider_fake = menu_cars.find(".item").width() * (num_slides - 1);
        var arrow_left = $(".slider-arrow-left");
        var arrow_right = $(".slider-arrow-right");
        $('.slider-home-arrow').on('click', function(){
            if (menu_cars.is(':animated'))
                return 0;
            var direction = $(this).attr("class").split(" ")[1];
            if (direction == "slider-arrow-left") {
                margin += 100;
            }
            else
                margin -= 100;
            menu_cars.stop().animate({
                marginLeft: margin + "%"
            }, 200, function () {
                if (parseInt(menu_cars.css("margin-left")) >= 0)
                    arrow_left.addClass("slider-arrow-hidden");
                else
                    arrow_left.removeClass("slider-arrow-hidden");
                if (parseInt(menu_cars.css("margin-left").replace("-", "")) >= width_slider_fake)
                    arrow_right.addClass("slider-arrow-hidden");
                else
                    arrow_right.removeClass("slider-arrow-hidden");
            });
        });
        $video_home_cross.remove();
        $("#slider-car4, #home-scross, .section-title.hide_s-cross").remove();
        //$("#menu-cars-home").prepend('<div id="slider-car4" class="item car-4"><div class="slider-car-sprite"></div><a href="/s-cross"><h3>S-Cross</h3></a></div>');
    }*/


});

