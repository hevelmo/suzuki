var current_car;
function insta_drive_gaq(){
    var precio_actual = showMeTheMoney( current_car );
    ga('send', 'event', 'Instant Drive', 'Confirmacion', current_car, precio_actual * 0.071 );
}
$(document).ready(function(){
    current_car = get_car_by_url();
    var current_menu = '',
        scroll_current_section = -1,
        sections_positions = [],
        yy = 0,
        arrow_section = [ 0, -403, -239, -102, 53, 214 ],
        //hash_section = [ "", "1", "2", "3", "4", "5", "6" ],
        section_names = [ "", "home", "caracteristicas", "galeria", "versiones_precios", "accesorios", "prueba" ],
        section_timer,
        selected_concessionaire = -1;
    function switch_menus( menu ){
        if( current_menu != menu ){
            current_menu = menu;
            var new_h = ( menu == 'cars')? 50 : 95;
            $('#header-zone').stop().animate({height:new_h });
            if( menu == 'cars'){
                $('#regular-header').stop().animate({marginTop: -95 });
                $('#logo-wrapper').stop().animate({top: -95 });
            }else{
                $('#regular-header').stop().animate({marginTop: 0 });
                $('#logo-wrapper').stop().animate({top: 0 });
            }
        }
    }

    function switch_arrow( ){
        var ii = 0, arrow_y = 49,
            i_m = sections_positions.length,
            gtx,
            yyy = get_scroll_top(),
            $cars_menu_li =  $('ul.models-menu li'),
            $arrow =  $('#model-section-arrow'),
            $td_flag =  $('#model-test-drive-flag'),
            $gotoup =   $('#back-to-top-button'),
            arrow_top = parseInt( $arrow.css('top') );

        if( yyy > 0 ){
            if( arrow_top != arrow_y ){
                $gotoup.stop().hide().fadeIn();
                $td_flag.stop().animate({top: 0});
            }

        }else{
            scroll_current_section = -1;
            $td_flag.stop().animate({top: -95});
            $gotoup.stop().show().fadeOut();
            $arrow.stop().css({top:0}).hide();
            return;
        }


        while( ii < i_m ){
            if( yyy < sections_positions[ ii ] ){
                break;
            }
            ii++;
        }
        if( ii != scroll_current_section ){
            scroll_current_section = ii;
            window.clearTimeout( section_timer );
            section_timer = setTimeout(function(){
                var url = document.location + '/' + section_names[ii];
                ga('send', 'pageview', url );
            }, 2000);

            $cars_menu_li.removeClass('current');
            $cars_menu_li.eq( ii - 1).addClass('current');

            if( arrow_section [ ii ] ){
                gtx = arrow_section [ ii ];
            }else{
                gtx = 415;
            }
            if( arrow_top != arrow_y ){
                $arrow.show();
                $arrow.stop().delay(100).css({marginLeft:gtx,top:arrow_y -10,opacity:0}).animate({top:arrow_y,opacity:1 },300);
            }else{
                $arrow.stop().animate({marginLeft:gtx});
            }
        }
    }

    $.adjust_spaces = function(){
        $('a.section-separator').each( function( ii ){
            yy =  $(this).offset().top - 200 ;
            yy = ( yy > 0 )? yy : 0;
            sections_positions[ ii ] = parseInt( yy );
        });
    }

    $('body').prepend( td_id_flag );
    $('#model-test-drive-flag-link').on('click', function( e ){
        e.preventDefault();
        $.scroll_to( 'prueba-de-manejo' );
    });
    $('#model-section-arrow').hide();
    $('#back-to-top-button').hide();


    //First Arrow animation
    $.animate_arrow = function( $arrow ){
        $arrow.css( { marginTop:-82,opacity:1}).animate({marginTop:-20,opacity:0}, 1000, function(){
            $.animate_arrow( $(this) );
        });
    }
    if( $('.car-next-step').length > 0 ){
        var $arrow1 = $('.car-next-step').children('a'),
            $arrow2 =$arrow1.clone();
        $('.car-next-step').append( $arrow2 ).delegate('a','mousedown mouseup click', function( e ){
            e.preventDefault();
            $.scroll_to('caracteristicas');
        });
        $.animate_arrow( $arrow2 )
    }
    //Specifications Slider controls and functionality
    var specifications_i = 0;
    var specifications_total =  $('.specifications-wrapper .specification').length - 1;
    $('a.specifications-controls').on('click', function( e ){
        e.preventDefault();
        var direction, fake_div, copy_div;
        $('.specifications-wrapper .fake_div').remove();
        if( $(this).attr('href') == '#left' ){
            if( specifications_i > 0 ){
                specifications_i--;
            }else{
                specifications_i = specifications_total ;
                fake_div = true;
                copy_div = $('#features-wrapper .specification').eq( 0).clone();
                copy_div.addClass('fake_div');
                $('#features-wrapper').append( copy_div ).css({marginLeft: ( ( specifications_i + 1 ) * -100 )+'%' }).stop().animate({marginLeft: ( specifications_i * -100) + '%' });
            }
        }else{
            if( specifications_i < specifications_total ){
                specifications_i++;
            }else{
                fake_div = true;
                specifications_i = 0;
                copy_div = $('#features-wrapper .specification').eq( specifications_i -1  ).clone();
                $('#features-wrapper').prepend( copy_div ).css({marginLeft: '100%' }).stop();
                copy_div.addClass('fake_div').css({marginLeft:"-99%", position:"absolute", width: "100%"}).stop().animate({marginLeft:'-100%'} );
                $('#features-wrapper').animate({marginLeft: '0'});
            }
        }
        if( !fake_div ){
            $('.specifications-wrapper .specifications').stop().animate({marginLeft: ( specifications_i * -100) + '%' });
        }
    });
    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
    var $display_tables = $('.display-tables'), display_vct_class = 'prices';
    function display_versions_comparative(){
        var $div;
        $display_tables.each(function(){
            $div = $(this);
            if( display_vct_class == $div.data('display-table') ){
                $div.fadeOut().fadeIn(1000);
                modifyHeight("#comparative-space-wrapper .suzuki-table .body .row");
            }else{
                $div.hide();
            }
        });
    }
    $('a.swap-display-tables').on('click', function( e ){
        e.preventDefault();
        display_vct_class = $(this).data('display-table');
        $.scroll_to('precios');
        var timeout = setTimeout(function(){
            display_versions_comparative();
        }, 900 );
    });
    display_versions_comparative();

    modifyHeight("#features-space-wrapper .suzuki-table .body .row");



    function in_site_test_drive(){
        function goto_step( step ){
            var $step_tabs  = $('.step-tab-model'),
                $mtt        = $('.model-test-tab');
            $step_tabs.removeClass('active').removeClass('disabled');
            $step_tabs.eq( step - 1 ).addClass('active');
            $mtt.removeClass('active').removeClass('disabled');
            $mtt.eq(0).addClass('active');
            $mtt.eq(1).addClass('active');

        }

        /*function td_show_concessionaires( elements ){
            var i0 = 0, i1 = elements.length;
            var html = '';
            if( i1 > 0 ){
                while( i0 < i1 ){
                    html += Mustache.render( concessionaires_li_element, elements[i0] );
                    i0++;
                }
                html = '<ul>' + html + '</ul>';

            }else{
                html = concessionaires_no_found;
            }
            $('#input_concessionaire_models .input, #input_concessionaire_models p').hide();
            $('#concessionaires_list_models .list').html( html);
            $('#concessionaires_list_models').hide().fadeIn();

        }
        $('a.model-change-tab').on('click', function( e ){
            e.preventDefault();
            if( !$(this).parent().is('.disabled') ){
                var val = $(this).data('number');

            }
        });
        $('#concessionaires_list_models').delegate( '.td-concessionaire-button', 'click',function(){
            selected_concessionaire = $(this).data('id');
            goto_step( 2 );

        });*/

        $('#step-2-date').datepicker({
            minDate: '+1d',
            maxDate: '+1m',
            minLength: 0,
            delay: 0,
            dateFormat: 'yy-mm-dd'
        });
        var date_timeout,
            $st2_date = $('#step-2-date'),
            $st2_name = $('#step-2-name'),
            $st2_lastname = $('#step-2-lastname'),
            $st2_email = $('#step-2-email'),
            $st2_tel = $('#step-2-tel');


        $st2_date.on('focusout', function(){
            clearTimeout( date_timeout );
            date_timeout = setTimeout(function(){
                var $input = $('#htd_date');
                $.validate_input( $input );
            }, 250);
        });
        $st2_name.on('focusout', function(){
            var $input = $(this);
            $.validate_input( $input );
        });
        $st2_lastname.on('focusout', function(){
            var $input = $(this);
            $.validate_input( $input );
        });
        $st2_email.on('focusout', function(){
            var $input = $(this);
            $.validate_input( $input );
        });
        $st2_tel.on('focusout', function(){
            var $input = $(this);
            $.validate_input( $input );
        });
        $.model_td_function = function(){


            var form_errors = 0;
            if( !$.validate_input(  $st2_tel    ) ){
                form_errors++;
                $st2_tel.focus();
            }
            if( !$.validate_input(  $st2_email    ) ){
                form_errors++;
                $st2_email.focus();
            }
            if( !$.validate_input(  $st2_name    ) ){
                form_errors++;
                $st2_name.focus();
            }
            if( !$.validate_input(  $st2_lastname    ) ){
                form_errors++;
                $st2_lastname.focus();
            }
            if( !$.validate_input(  $st2_date    ) ){
                form_errors++;
                $st2_date.focus();
            }
            if( form_errors == 0 ){
                var data = {
                    car_key         : current_car.key,
                    concessionaire  : selected_concessionaire,
                    date            : $st2_date.val(),
                    email           : $st2_email.val(),
                    name            : $st2_name.val(),
                    lastname        : $st2_lastname.val(),
                    newsletter      : $('#model-newsletter:checked').length,
                    phone           : $st2_tel.val(),
                    source          : 'Model ' + current_car.name
                };

                var precio_actual = showMeTheMoney(current_car.key);
                analytics_test_drive( 'Modelos_' + current_car.key , 0.071 * precio_actual);

                var cd = get_concessionaire_data_by_id( selected_concessionaire );
                $('#step-2-concessionaire-final').html( cd.name );
                $('#step-2-mail-final').html( data.email );

                $.test_drive_form( data ,function(){
                    $('#step-2-form').hide();
                    $('#step-2-final').hide().fadeIn();
                });


            }



        };



/*
        var optionsAutocomplete = {
            types: ['geocode'],
            componentRestrictions: { country: "MX" }
        };
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('concessionaires_search_models'), optionsAutocomplete);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var gp = autocomplete.getPlace(), elements = [];
            if( ( gp ).geometry ){
//              var l = ( gp ).geometry.location;
                var location = ( gp ).geometry.location;
                var lat = location.lat();
                var lng = location.lng();
//              var ll = { latitude: l.ob, longitude: l.pb };
//              var ll = { latitude: l.nb, longitude: l.ob };

                var element, i0, i1;
                concessionaires_order_nearest( lat, lng );
                i0 = 0;
                i1 = concessionaires_data.length;
                while( i0 < i1){
                    element = concessionaires_data[ i0 ];
                    if( elements.length < 3 ){
                        if( element.distance < 0.1 ){
                            elements.push( element );
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                    i0++;
                }
            }
            td_show_concessionaires( elements );
        });*/

    }
    in_site_test_drive();



    $('.car-comparative-col div.close').on('click', function(){
        $parent = $(this).parent().parent().parent().parent().parent().parent();
        $parent.hide();
        $('#car-comparative-list').fadeIn();
        //.car-comparative-col
    });
    $('#car-comparative-list a.open').on('click', function( e ){
        e.preventDefault();
        var id = $(this).data('id'),
            $element = $('#'+id);
        $element.fadeIn();
        $(".car-comparative-col").each(function (index, Element) {
            //$(this).find(".row").eq(5).css("height", 60);
        });
        $('#car-comparative-list').hide();
        //.car-comparative-col
    });


    //Fancybox Trigger in all gallery elements
    $('a.fancybox-thumbs').on('click mouseup', function( e ){
        e.preventDefault();
    }).fancybox({
        arrows    : true,
        autoSize	: false,
        closeBtn  : true,
        fitToView	: false,
        height		: '70%',
        helpers : {
            overlay: {
                locked: false
            },
            title : {
                type : 'over'
            },
            thumbs : {
                width  : 50,
                height : 50
            }
        },
        maxHeight	: 550,
        maxWidth	: 1200,
        nextEffect  : 'none',
        nextClick   : true,
        padding     : 0,
        prevEffect  : 'none',
        width		: '70%'
    });
    if(!IS_MOBILE){
        $(".gallery-box-link.html").on('click mouseup', function( e ){
            e.preventDefault();
        }).fancybox({
                'autoScale' : false,
                'href' : $('.gallery-box-link.html').data('link'),
                'type':'iframe',
                'padding' : 0,
                 maxWidth	: 1200,
                 minWidth	: 920
            });
    }
    $('a.gallery-box-link').on('click', function( e ){
        e.preventDefault();
        var url = $(this).attr('href').trim();
        $('a.fancybox-thumbs').each(function(){
            var u = $(this).attr('href');
            if( u.trim() == url ){
                $(this).trigger('click');
                return false;
            }
        });
    });

    if (IS_MOBILE) {
        var margin = 0;
        var table = $("#versions-price-table");
        var cols = parseInt((table.attr("class").split(" ")[1]).split("-")[1]);
        var width_table = table.find(".cell").width() * (cols - 1);
        var arrow_left = $(".arrow-prices-left");
        var arrow_right = $(".arrow-prices-right");
        if ($("#features-space-wrapper .suzuki-table.cols-3, #features-space-wrapper .suzuki-table.cols-2").length) {
            $(".arrow-prices").show();
        }
        $(".arrow-prices").on('click', function(){
            if (table.is(':animated'))
                return 0;
            var direction = $(this).index();
            if (direction == 0) {
                margin += 100;
            }
            else
                margin -= 100;
            table.stop().animate({
                marginLeft: margin + "%"
            }, 200, function () {
                if (parseInt(table.css("margin-left")) >= 0)
                    arrow_left.addClass("arrow-prices-hidden");
                else
                    arrow_left.removeClass("arrow-prices-hidden");
                if (parseInt(table.css("margin-left").replace("-", "")) >= width_table)
                    arrow_right.addClass("arrow-prices-hidden");
                else
                    arrow_right.removeClass("arrow-prices-hidden");
            });
        });
    }

    $(window).resize(function() {
        $.adjust_spaces();
    });
    $(document).resize(function() {
        $.adjust_spaces();
    });
    $(window).scroll(function(){
        if( header_section == '' ){
            switch_menus( get_scroll_top() < 10 ? 'regular' : 'cars'  );
            switch_arrow();
        }
    });

    $.adjust_spaces();
    $(window).trigger('scroll');


});





