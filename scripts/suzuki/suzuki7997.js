var main_menu_available = false,
        preselected_click = null,
    menu_wait_section = null,
    header_section = '',
    menu_data = {
        models_menu : false,
        position    : 'fixed'
    },

    html_sections_html = {},
    init_hash = window.location.hash,
    concessionaires_data = null,
    concessionaire_sorted = null,
    tdh_data = null,
    fuh_data = null,
    geo_options = null,
    HAS_GEOLOCATION = true,
    HAS_INSTANTDRIVE = false,
    geo_ll = null,
    geo_timeout = null, cars_prices = null,
    $body = $('body');

var cars_data = [
    { key: 'swift-sport'    , name: 'Swift Sport'   },
    { key: 'swift'          , name: 'Swift'         },
    { key: 'sx4-crossover'  , name: 'SX4 Crossover' },
    { key: 'sx4-sedan'      , name: 'SX4 Sedán'     },
    { key: 'kizashi'        , name: 'Kizashi'       },
    { key: 'grand-vitara'   , name: 'Grand Vitara'  },
    { key: 'grand-vitara-especial'   , name: 'Grand Vitara Especial'  },
    { key: 's-cross'        , name: 'S-Cross'  }
];

function instant_drive_available_time(){
    var time = new Date().getHours();
    return ( time > 10 && time < 18 );
}
function is_model_name( str ){
    var ii = cars_data.length;
    while( ii-- ){
        if( cars_data[ii].key == str ){
            return true;
        }
    }
    return false;
}
function get_car_data( k ){
    var ii = cars_data.length;
    while( ii-- ){
        if( cars_data[ii].key == k ){
            return cars_data[ii];
        }
    }
    return null;
}
function get_car_by_url(){
    var root = window.location.pathname.split('/');
    return get_car_data( root[1] );
}
function get_car_by_hash(){
    var root = location.hash.slice(1);
    return get_car_data( root[1] );
}
function get_concessionaire_data_by_id( id ){
    var ii = concessionaires_data.length, concessionaire, dx, dy;
    while( ii-- ){
        concessionaire = concessionaires_data[ii];
        if( concessionaire.id == id ){
            return concessionaire;
        }
    }
    return false;
}
function concessionaires_order_nearest( latitude, longitude ){
    var ii = concessionaires_data.length, concessionaire, dx, dy;
    while( ii-- ){
        concessionaire = concessionaires_data[ii];
        dx = parseFloat(concessionaire.lat) - latitude;
        dy = parseFloat(concessionaire.lon) - longitude;
        concessionaire.distance = Math.sqrt( dx * dx + dy * dy );
    }
    concessionaires_data.sort( function( a , b ) {
        return a.distance - b.distance;
    });
}
function geo_select_concessionaire_callback(){
    if( geo_ll != null ){
        if( concessionaires_data ){
            if(  window.location.pathname == '/concesionarias' ){
                concessionaire_sorted = true;
                concessionaires_order_nearest( geo_ll.latitude, geo_ll.longitude );
                $.open_concessionaire_by_key( concessionaires_data[0].key , true );
            }
        }
    }
}
function get_location(){
    if( HAS_GEOLOCATION ){
        if( geo_ll!= null ){
            return geo_ll;
        }
    }
    return null;
}
function funding_core( total_pay, months ){
    var atc = months < 54 ? .1560 : .1676;
    var atc_month = atc / 12;
    var form_partial_1 = 1 - ( Math.pow( ( 1 + atc_month ) , -months ) );
    var form_partial_2 = form_partial_1 / atc_month;
    var form_partial_3 = total_pay / form_partial_2;
    return form_partial_3.toFixed( 2 );
}

var validations_regexp = {
    address : new RegExp( /^[a-zá-úüñ,#0-9. -]{2,}$/i ),
    date    : new RegExp( /^(\d{4})-(\d{1,2})-(\d{1,2})$/ ),
    email   : new RegExp( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ),
    name    : new RegExp( /^[a-zá-úüñ. ]{2,}$/i ),
    phone   : new RegExp( /^[0-9\s\-]{7,13}$/ )
};

var validation_messages = {
    date            : 'Debe ser aaaa-mm-dd',
    date_tomorrow   : 'Sólo a partir de mañana',
    email           : 'Verifica tu correo',
    general         : 'Campo no válido',
    not_config      : 'Tipo desconocido',
    not_null        : 'No puede ser nulo',
    phone           : 'Verifica que tu número sea de 10 dígitos',
    required        : 'Campo requerido'
};
/**
 * Compares a value with a rule and return a object
 * @param {String}  value           Value to compare.
 * @param {Array}   rules           Rules to validate.
 * @param {String}  required        Makes .
 * @param {String}  custom_message  Replaces output message just when is not valid.
 * @return {Object} Returns an object with: "valid" boolean  and "message": string
 */

function validate( value, rules, required, custom_message ){
    var r = { valid : false, message : '' },
        null_value = value == undefined || value === '' ,
        ii, rule;
    required = required === true ? true: false;
    if( required ){
        if( null_value ){
            r.message = validation_messages.required;
        }
    }else{
        if( null_value ){
            r.valid = true;
        }
    }
    if( !r.valid && r.message === '' ){
        ii = rules.length;
        while( ii-- ){
            rule = rules[ii];
            switch( rule ){
                case 'email':
                    if( !validations_regexp.email.test( value ) ){
                        r.message = validation_messages.email;
                    }
                    break;
                case 'name':
                    if( !validations_regexp.name.exec( value ) ){
                        r.message = validation_messages.general;
                    }
                    break;
                case 'address':
                    if( !validations_regexp.address.exec( value ) ){
                        r.message = validation_messages.general;
                    }
                    break;
                case 'car_key':
                    if(  !is_model_name( value ) ){
                        r.message = validation_messages.general;
                    }
                    break;
                case 'date':
                    if( !validations_regexp.date.exec( value ) ){
                        r.message = validation_messages.date;
                    }
                    break;
                case 'phone':
                    if( !validations_regexp.phone.exec( value ) ){
                        r.message = validation_messages.phone;
                    }
                    break;
                default:
                    r.message = validations_regexp.not_config;
                    break;
            }
        }
        if( r.message === '' ){
            r.valid = true;
        }
    }
    if( custom_message && !r.valid ){
        r.message = custom_message;
    }
    return r;
}

function enviar_newsletter(){
    var target_offset = $("#newsletter-join-form").position();
    var target_top = target_offset.top;
    $('html, body').stop().animate({scrollTop:target_top}, 1000);
    $("#newsletter_name").focus();
}
function enviar_newsletter_field_list(){
    var target_offset = $("#mc-embedded-subscribe-form").position();
    var target_top = target_offset.top;
    $('html, body').stop().animate({scrollTop:target_top}, 1000);
    $("#mce-FNAME").focus();
}
function push_ficha(modelo){
    alert(modelo);
    ga('send', 'event', 'Material de apoyo', 'Descarga', 'Ficha_' + modelo );
}
function push_social(red){
    ga('send', 'event', 'Social', 'Liga_externa', 'Pestaña_' + red );
}
function fb_pixel( id, val){
    var fb_param = {
        pixel_id    : id,
        value       : val,
        currency    : 'USD'
    };
    var fpw = document.createElement('script');
    fpw.async = true;
    fpw.src = '../connect.facebook.net/en_US/fp.js';
    var ref =  document.getElementsByTagName('script')[0];
    ref.parentNode.insertBefore(fpw, ref);
    var image = new Image(1,1);
    image.src = "https://www.facebook.com/offsite_event.php?id=" + fb_param.pixel_id + "&amp;value=" + fb_param.value + "&amp;currency="+fb_param.currency;
}
function showMeTheMoney(model_key){
    var value = 0;
    switch (model_key){
        case 'swift-sport':
            value = 259000.00;
            break;
        case 'swift':
            value = 169000.00;
            break;
        case 'sx4-crossover':
            value = 238000.00;
            break;
        case 'sx4-sedan':
            value = 219000.00;
            break;
        case 'kizashi':
            value = 319500.00;
            break;
        case 'grand-vitara':
            value = 322000.00;
            break;
        case 's-cross':
            value = 249900.00;
            break;
        default:
            break;
    }
    return value;
}
var analytics_test_drive;


//Detetar si es IE10
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.appVersion.match(/MSIE ([\d.]+)/));
if($('html').attr('data-useragent') == 'MSIE 10.0,10.0'){
    $("body").addClass('IE10');
}

//AQUI SE USA EL EXPAND LINKS termina por la linea 470

$(document).ready( function(){
    var $header_panel       =  $('#header-panel'),
        $expanded_links     = $('a.expand-header'),
        $header_wrapper     = $('.header-wrapper'),
        $header_zone        = $('#header-zone');


    analytics_test_drive = function( title, value ){
        try{
            value = parseInt( value, 10 );
            if( !value ){ value = 0; }
            ga('send', 'event', 'Prueba de Manejo', 'Confirmacion', title, value );
        }catch ( e ){
            console.log('Ocurrió un error con el evento de GA');
        }
        fb_pixel( 'UA-56368711-1', '0.01');
    }


    //Validates an input with data-validation-data attribute and displays or hide bubble meesage
    $.validate_input = function( $input ){
        if( $input.is('input') || $input.is('textarea') ){
            var val_data    = $input.data('validation-data').split('|'),
                required    = val_data.indexOf('required');
            if( required >= 0 ){
                val_data.splice(required, 1);
            }
            var value = $input.val(),
                validation = validate( value, val_data, ( required >= 0 )  );
            $.error_bubble( $input, !validation.valid, validation.message );
            return validation.valid;
        }else{
            var is_valid = !( $input.val() === null );
            $.error_bubble( $input, !is_valid, validation_messages.required );
            return is_valid;
        }
    };
    // Show or hide menu patch when scrolls
    $.adjust_menu_patch = function(){
        $('.menu-patch:hidden').show();
        if( !menu_data.models_menu ){
            if( header_section != '' &&  menu_data.position == 'absolute' ){
                var pane_h = $header_panel.height();
                if( ( get_scroll_top() - pane_h ) > 0 ){
                    $('.menu-patch').hide();
                }
            }
        }
    };
    //Sets menu position
    $.$header_panel_directives = function(){
        var min_h   = $header_panel.height() + 100;
        var win_h   = $(window).height();
        if( min_h < win_h ){
            menu_data.position = 'fixed';
        }else{
            menu_data.position = 'absolute';
            menu_wait_section = header_section;
            if (!IS_MOBILE) {
                $('html,body').stop().animate({ scrollTop : 0 }, 300 , 'easeOutSine', function(){
                    if( menu_wait_section ){
                        if( header_section == '' ){
                            $.openPanel( menu_wait_section );
                            menu_wait_section = false;
                        }

                    }

                });
            }
        }
        $header_panel.css({
            position    : menu_data.position,
            top         : '0'
        });
        $(window).trigger('scroll').scroll( function(  ){
            $.adjust_menu_patch();
        });
    };
    $(window).resize(function() {
        $.$header_panel_directives();
    });
    //Add action to all header's close butons
    $header_panel.delegate('.close-menu-box a', 'click', function( e ) {
        e.preventDefault();
        $.openPanel('');
    });

    //Adjust content to window height
    if( $('.window-adaptable').length > 0 ){
        $.adjust_auto_height = function(){
            var min_h, hh, h_w;
            if( get_car_by_url() == null ){
                h_w = $(window).height() - 95;
            }else{
                h_w = $(window).height() - 50;
            }
            $('.window-adaptable').each( function(){
                try{
                    min_h = parseInt( $( this ).attr("data-min-height") );
                }catch( e ){
                    min_h = 600;
                }
                hh = min_h;
                if( hh >= min_h ){
                    if( hh < h_w){
                        hh = h_w;
                    }
                }else{
                    hh = min_h;
                }
                $(this).height( hh );
            });
        };
        $(window).resize(function() {
            $.adjust_auto_height();
        });
        $(document).resize(function() {
            $.adjust_auto_height();
        });
        $.adjust_auto_height();
    }
    //animates all transitions (needs an "a" element whit "name attrubute")
    $.scroll_to = function( target_name ){
        var target, dest, header_height = $('#header-wrapper').height();
        if( target_name != 'top' ){
            target = $( 'a[name="' + target_name + '"]' );
            dest = target.offset().top - header_height - 35;
            if (IS_MOBILE) {
                dest += 75;
            }
        }else{
            dest = 0;
        }
        $('html,body').stop().animate({ scrollTop : dest}, 800 , 'easeOutSine');
    };
    //Auto asigns scroll_to functions to a.scroll-in-site elements
    $('a.scroll-in-site').on('click', function( e ){
        e.preventDefault();
        var target_name =  $(this).attr("href").replace( /^#/, '' );
        $.scroll_to( target_name );
    });

    //Open's header magic
    //Available section = 'test-drive' | 'models' | 'financing' | 'owners' | 'before-buy'
    var bar_offset =  { marginLeft:0, width:0};
    $.openPanel = function( section, options ){

//        Esconder pleca azul de geolocalización
        if($("#geolocation-fixed")){
            if($( "#geolocation-fixed" ).hasClass( "active" )){
                $("#geolocation-fixed").slideUp(100);
            }
        }

        $('html, body').animate({scrollTop: '0px'}, 400);
        if(  $('#geolocation-fixed.active').length > 0 ){
            clearTimeout( geo_timeout );
            $('#geolocation-fixed').removeClass('active');
        }
        if ( !main_menu_available ) {
            if (  section != 'loading' ){
                preselected_click = [ section , options ];
                $.openPanel('loading');
                return false;
            }
        }
        bar_offset =  { marginLeft:0, width:0};
        var header_button = null,
            height = 0;

        switch( section ){
            case 'test-drive':
                header_button = $('#header-test-drive-button');
                height = 700;
                bar_offset = { marginLeft:0, width:0};
                break;
            case 'models':
                header_button = $('#header-models-button');
                height = 325;
                bar_offset = { marginLeft:-331, width:124};
                break;
            case 'financing':
                header_button = $('#header-financing-button');
                height = 555;
                bar_offset = { marginLeft:-62, width:182};
                break;
            case 'owners':
                header_button = $('#header-owners-button');
                height = 300;
                bar_offset = { marginLeft:121, width:136};
                break;
            case 'before-buy':
                header_button = $('#header-before-buy-button');
                height = 300;
                bar_offset = { marginLeft:258, width:221};
                break;
            case 'loading':
                header_button = $('#loading');
                height = 150;
                bar_offset = { marginLeft:0, width:0};
                break;
            case 'vacio':
                header_button = $('#vacio');
                height = 150;
                bar_offset = { marginLeft:0, width:0};
                break;
            default:
                header_section = '';
                section = '';
                break;
        }

        $expanded_links.removeClass('active');
        $header_wrapper.removeClass('shadow');
        if( header_section != section ){
            $header_wrapper.removeClass('shadow');
            $header_zone.removeClass('opened');
            header_button.addClass('active');
            header_section = section;

            $header_panel.stop().hide().fadeIn();
            $.$header_panel_directives();

            var div_html, data, $header_sections, ii;
            data = {
                html : $.get_header_html( section )
            };
            div_html = Mustache.render( header_section_wrapper_template , data );


            $('#header-sections-wrapper').append( div_html );
            $('.menu-patch').css( bar_offset ).stop().hide().delay( 300 ).fadeIn( );
            $header_sections = $('#header-sections-wrapper .header-section')
            ii = $header_sections.length;
            ii--;
            $header_sections.each(function( i ){
                if( i != ii ){
                    $(this).remove();
                }else{
                    $(this).hide().delay( 200 ).fadeIn( 300 );
                }
            });
            $.start_header_listeners( section, options );
        }else{
            header_section  = '';
            height = 0;
            $header_panel.stop().animate( { height : 'auto' }, 200, function(){
                $( '#header-sections-wrapper .header-section' ).remove();
                $header_panel.hide();
            });
            $('.menu-patch').stop().show().fadeOut(function(){
                $(this).width( 0 );
            });
            setTimeout(function(){
                $(window).trigger('scroll')
            }, 500);
            //Mostrar la pleca azul de geolocalización
            if($("#geolocation-fixed")){
                if($( "#geolocation-fixed" ).hasClass( "active" )){
                    $("#geolocation-fixed").stop().slideDown(300);
                }
            }
        }
        $('.header-links-list').delegate('a', 'click', function(){
            $.openPanel('');
            var href_link_attr = $(this).attr("href").split("#")[1];
            var href_now = $(location).attr('href').split("#")[0];
            var href_link = "http://" + $(location).attr('host') + $(this).attr("href").split("#")[0];
            if (href_now == href_link) {
                if (href_link_attr == "ordinaria" || href_link_attr == "extendida") {
                    if (href_link_attr == "ordinaria") {
                        $('.main-buttons a').eq(0).trigger("click");
                    } else {
                        $('.main-buttons a').eq(1).trigger("click");
                    }
                }
                $.scroll_to(href_link_attr);
            }
        });
    };



    $("#header-panel").resize(function(){
        var _this = $(this);
        $('#header-spacer').stop().animate({height: _this.height()}, 300);
    });

    $('a.expand-header').on('click',function( e ){
        e.preventDefault();
        var section = $(this).attr('href').split('#').join('');
        var params = null;
        switch( section ){
            case 'prueba-de-manejo':    section = 'test-drive'; break;
            case 'modelos':             section = 'models'; break;
            case 'financiamiento':      section = 'financing'; break;
            case 'propietarios':        section = 'owners'; break;
            case 'antes-de-comprar':    section = 'before-buy'; break;
            default: return; break;
        }
        if( section == 'test-drive' || section == 'financing' ){
            var data = get_car_by_url();
            if( data ){
                params = data;
            }else{
                params =  get_car_by_hash();
            }
        }
        $.openPanel( section, params );
    });
    $('body').prepend( patch_bar );

    // Open / close the mobile menu
    if (IS_MOBILE) {
        $("#header-mobile i").click(function () {
            $(this).toggleClass("header-mobile-icon-active");
            openCloseMenu();
        });

        if (window.addEventListener){
            window.addEventListener('orientationchange', checkMenu, false);
        } else if (window.attachEvent){
            window.attachEvent('orientationchange', checkMenu);
        }


//        if (!window.addEventListener) {
//            window.attachEvent("orientationchange", function() {
//                checkMenu();
//            }, false);
//        }
//        else {
//            window.addEventListener("orientationchange", function() {
//                checkMenu();
//            }, false);
//        }



        $("#mobile-menu a").click(function (e) {
            var idx = $(this).parent().index();
            var link = "";
            switch (idx) {
                case 1:
                    link = "#header-models-button";
                    break;
                case 3:
                    link = "#header-financing-button";
                    break;
                case 4:
                    link = "#header-owners-button";
                    break;
                case 5:
                    link = "#header-before-buy-button";
                    break;
                case 6:
                    link = "#header-test-drive-button";
                    break;
            }
            openCloseMenu();
            $(link).trigger("click");
            $("#header-mobile i").removeClass("header-mobile-icon-active");
        });

        $("#footer-content .row-1 .footer-column").click(function () {
            $(".footer-column .links").slideUp();
            $(".footer-column i").text("+");
            if ($(this).find(".links").css("display") != "block") {
                $(this).find(".links").slideDown();
                $(this).find("i").text("-");
            }
        });

        function openCloseMenu () {
            $("body").toggleClass("open-body");
            $("#mobile-menu").toggleClass("open-mobile-menu");
            checkMenu();
        }

        function checkMenu() {
            if ($("#mobile-menu").hasClass("open-mobile-menu") && window.orientation == 0) {
                $("body").css("overflow", "hidden");
            }
            else {
                $("body").css("overflow", "visible");
            }
        }
    }

    //Returns HTML for each header's section and adds a Close button if is required
    $.get_header_html = function( section ){
        var html = '';
        switch( section ){
            case 'test-drive':
                html = header_close_button + html_sections_html.test_drive;
                break;
            case 'models':
                html = header_close_button + html_sections_html.models;
                break;
            case 'financing':
                html = header_close_button + html_sections_html.financing;
                break;
            case 'owners':
                html = (IS_MOBILE) ? header_close_button + html_sections_html.owners : html_sections_html.owners;
                break;
            case 'before-buy':
                html = (IS_MOBILE) ? header_close_button +  html_sections_html.before_buy : html_sections_html.before_buy;
                break;
            case 'loading':
                html = header_loading_screen;
                break;
            /*case 'vacio':
                html =  header_vacio_screen;
                break;*/
            default:
                break;
        }
        return html;
    };

    //Add change tabs controls for test drive and founding
    var $panelTabsNav = null, $panelTabs = null, current_tab = -1;
    function slide_tabs( ii, disable ){
        ii = parseInt( ii ) - 1;
        if( ii != current_tab ){
            current_tab = ii;
            $panelTabsNav.removeClass('active');
            $panelTabsNav.each(function( i ){
                var $item = $(this);
                if( i < ii ){
                    $item.removeClass('disabled');
                }
                if( disable ){
                    if( i > ii ){
                        $item.addClass('disabled');
                    }
                }

            });
            $panelTabsNav.eq( ii).removeClass('disabled').addClass('active');
            $panelTabs.removeClass('active');
            $panelTabs.eq( ii ).addClass('active').css({opacity:0}).animate({opacity:1});
        }
    }

    //Service to add test drives
    $.test_drive_form = function( data , callback ){
        //car_key         : ''
        //concessionaire  : ''
        //date            : ''
        //email           : ''
        //name            : ''
        //lastname        : ''
        //newsletter      : ''
        //phone           : ''
        //source          : ''
        var service_url = 'services/request/test_drive.json';
        $("#header_send_td").attr('disabled','disabled').css({opacity:0.3});
        $("#models_send_td").attr('disabled','disabled');
        $.ajax({
            cache       : false,
            data        : data,
            dataType    : 'json',
            type        : 'post',
            success     : function( data ){
                if( data.status == 'ok' ){
                    if( callback ){
                        callback();
                    }
                }else{
                    alert( data.message );
                }
                $("#header_send_td").removeAttr('disabled').css({opacity:1});
                $("#models_send_td").removeAttr('disabled');
            },
            url     : service_url
        });
    }
    $.test_drive_header_form = function( ){
        if( tdh_data ){
            var form_errors = 0;
            if( !$.validate_input(  $('#htd_tel')    ) ){
                form_errors++;
                $('#htd_tel').focus();
            }
            if( !$.validate_input(  $('#htd_email')    ) ){
                form_errors++;
                $('#htd_email').focus();
            }
            if( !$.validate_input(  $('#htd_name')    ) ){
                form_errors++;
                $('#htd_name').focus();
            }
            if( !$.validate_input(  $('#htd_lastname')    ) ){
                form_errors++;
                $('#htd_lastname').focus();
            }
            if( !$.validate_input(  $('#htd_date')    ) ){
                form_errors++;
                $('#htd_date').focus();
            }
            if( form_errors == 0 ){
                var data = {
                    car_key         : tdh_data.key,
                    concessionaire  : tdh_data.concessionaire_id,
                    date            : $('#htd_date').val(),
                    email           : $('#htd_email').val(),
                    name            : $('#htd_name').val(),
                    lastname        : $('#htd_lastname').val(),
                    newsletter      : $('#chk-newsletter:checked').length,
                    phone           : $('#htd_tel').val(),
                    source          : 'Header menu'
                };
                $.test_drive_form( data ,function(){

                    var precio_actual = showMeTheMoney(tdh_data.key);
                    analytics_test_drive( 'Header_' + tdh_data.key, 0.071 * precio_actual );
                    $('#test_drive_form').hide();
                    $('#test_drive_resume').fadeIn();
                    $('html, body').animate({scrollTop: '0px'}, 400);
                });
                $('#tdr_email').html( data.email );
                $('#tdr_concessionaire').attr({
                    href: '/concesionarias/suzuki-' + tdh_data.concessionaire_key
                }).text( tdh_data.concessionaire_name );
                $('#tdd_date').html();
                $('#tdd_name').html();
                $('#tdd_email').html();
                $('#tdd_tel').html();
                $('#').html();
                $('li.td-nav-tabs').addClass('disabled');
                $('#tdr_email').html( data.email );

            }
        }
    }

    //Adds javascript actions to header section
    $.start_header_listeners = function( section, options ){
        if( options === undefined || options === null  ){
            options = {};
        }
        switch( section ){
            case 'test-drive':
                var default_data = {
                    concessionaire_id : 0,
                    key     : ''
                };
                tdh_data = $.extend( {}, default_data, options );

                //Adds concessionaires items
            function td_show_concessionaires( elements ){
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
                $('#input_concessionaire .input').hide();
                $('#concessionaires_list .list').html( html);
                $('#concessionaires_list').hide().fadeIn();







            }
            function goto_step( step, disable  ){
                var ii, $divinput;
                slide_tabs( step, disable );
                if( step == 2 ){
                    if( tdh_data.concessionaire_id != 0 ){
                        ii = concessionaires_data.length;
                        while( ii-- ){
                            if( concessionaires_data[ii].id == tdh_data.concessionaire_id   ){
                                td_show_concessionaires( [ concessionaires_data[ii] ] );
                                break;
                            }
                        }
                        $('#input_concessionaire .input').hide();
                    }else{
                        $('#input_concessionaire .input').hide().fadeIn();
                        $('#concessionaires_search').val('').focus();
                    }

                }
            }
            function td_select_concessionaire( id ){
                var ii, html, concessionaire;
                tdh_data.concessionaire_id = id;
                ii = concessionaires_data.length;
                while( ii-- ){
                    concessionaire = concessionaires_data[ii];
                    if( concessionaire.id == tdh_data.concessionaire_id   ){
                        tdh_data.concessionaire_key =  concessionaire.key;
                        tdh_data.concessionaire_name = concessionaire.name;
                        html = '<ul>' + Mustache.render( concessionaires_li_element, concessionaire )+'</ul>';
                        $('#form_concessionaire_selected .list').html( html );
                        break;
                    }
                }
            }
            //Tabs
            $panelTabsNav   = $('li.td-nav-tabs');
            $panelTabs      = $('.td-tab');

                $('li.td-nav-tabs a').on('click', function( e ){
                    e.preventDefault();
                    if( !$(this).parent().is('.disabled') ){
                        goto_step( $(this).data('number') )
                    }
                });

                //Select car at first screen or auto select it
                $.test_drive_select_car = function( k ){
                    var car_data    = get_car_data( k ),
                        $icons      = $('#car_select_preview .car_thumb_160 .car, #td_concessionaire_car .car_thumb_60 .car, #td_form_car .car_thumb_60 .car, #td_final_car .car_thumb_60 .car'),
                        $car_texts  = $('#car_select_name h3, #td_concessionaire_car h3, #td_form_car h3, #td_final_car h3'),
                        $input_car_text = $('#fr_model_car');


                    tdh_data.key = k;
                    tdh_data.name = car_data.name;
                    $car_texts.text( tdh_data.name );
                    $input_car_text.val( tdh_data.name );


                    $icons.removeClass();
                    $icons.addClass('car ' + tdh_data.key );

                    $('#car_select_list li').removeClass('active');
                    $('#car_select_list li.' + k).addClass('active');

                };
                current_tab = -1;

                $('#car_select_list').delegate('a','click', function( e ){
                    e.preventDefault();
                    $.test_drive_select_car( $(this).data('key') );
                    if (IS_MOBILE) {
                        $("#car_select_list").hide();
                        $("#car_select_name, #car_select_preview").fadeIn();
                    }
                });
                if( tdh_data.key == '' ){
                    $('#car_select_list a').eq(0).trigger('click');
                    if (IS_MOBILE) {
                        $("#car_select_name, #car_select_preview").hide();
                        $("#car_select_list").fadeIn();
                    }
                    goto_step( 1, true );
                }else{
                    $.test_drive_select_car( tdh_data.key );
                    goto_step( 2, true );
                }
                $("#change-car-test").on('click', function( e ){
                    e.preventDefault();
                    $("#car_select_name, #car_select_preview").hide();
                    $("#car_select_list").fadeIn();
                });
                //Just go to other step when button was clicked
                $('a.test-drive-goto').on('click', function( e ){
                    e.preventDefault();
                    if (IS_MOBILE) {
                        if ($(this).data('step') == "1") {
                            $("#car_select_name, #car_select_preview").hide();
                            $("#car_select_list").fadeIn();
                        }
                    }
                    goto_step( $(this).data('step') );
                });

                $('#concessionaires_list').delegate('.td-concessionaire-button','click',function( e ){
                    e.preventDefault();
                    ga('send', 'event', 'Prueba de Manejo', 'Paso_3', 'Header_Fecha_Datos' );
                    td_select_concessionaire( $(this).data('id') );
                    goto_step( 3 );
                });
                $('#resetConcessionaire').on('click', function(e){
                    e.preventDefault();
                    $('#concessionaires_list .list').html('');
                    $('#input_concessionaire .input').hide().fadeIn();
                    $('#concessionaires_search').val('').focus();
                });
                $('#tdr_end').on('click', function(e){
                    e.preventDefault();
                    $.openPanel('');
                });
                $('#htd_date').datepicker({
                    minDate: '+1d',
                    maxDate: '+1m',
                    minLength: 0,
                    delay: 0,
                    dateFormat: 'yy-mm-dd'
                });
                var date_timeout;
                $('#htd_date').on('focusout', function(){
                    clearTimeout( date_timeout );
                    date_timeout = setTimeout(function(){
                        var $input = $('#htd_date');
                        $.validate_input( $input );
                    }, 250);
                });
                $('#htd_name').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('#htd_lastname').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('#htd_email').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('#htd_tel').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });

                var optionsAutocomplete = {
                    types: ['geocode'],
                    componentRestrictions: { country: "MX" }
                };
                var autocomplete = new google.maps.places.Autocomplete(document.getElementById('concessionaires_search'), optionsAutocomplete);
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    var gp = autocomplete.getPlace(), elements = [];
                    if( ( gp ).geometry ){
//                        var l = ( gp ).geometry.location;
                        var location = ( gp ).geometry.location;
                        var lat = location.lat();
                        var lng = location.lng();
//                        var ll = { latitude: l.ob, longitude: l.pb };
//                        var ll = { latitude: l.nb, longitude: l.ob };

                        var element, i0, i1;
                        concessionaires_order_nearest( lat, lng );
                        i0 = 0;
                        i1 = concessionaires_data.length;
                        while( i0 < i1){
                            element = concessionaires_data[ i0 ];
                            if( elements.length < 5 ){
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
                });
                break;
            case 'financing':
                var car_d = null,
                    funding_data = {
                        engagement  : 0,
                        months      : 0,
                        price       : 0
                    };
                var conce_d = null;

                var default_data = {
                    car_version : 0,
                    key         : ''

                };

                fuh_data = $.extend( {}, default_data, options );

            function goto_step( step, disable  ){
                var ii, $divinput;
                slide_tabs( step, disable );
                if( step == 3 ){


                }
            }

                //Tabs
                $panelTabsNav   = $('li.step-nav-tabs.funding');
                $panelTabs      = $('.step-nav-tab.funding');

                $panelTabsNav.children('a').on('click', function( e ){
                    e.preventDefault();
                    if( !$(this).parent().is('.disabled') ){
                        goto_step( $(this).data('number') )
                    }
                });
                $.funding_adjust_calc = function(  ){
                    var f_amount        = funding_data.price * ( funding_data.engagement / 100 ),
                        total_pay       =  funding_data.price -  f_amount,
//                        total_pay       =  funding_data.price -  f_amount,
                        f_monthly_pay   = funding_core( total_pay, funding_data.months  );
                    $('#live-engagement,#funding_result_engagement,#funding_resume_engagement').html( moneyFormat( f_amount ) );
                    $('#fr_car_engagement').val(moneyFormat( f_amount ));
                    $('#live-months,#funding_result_months,#funding_resume_months').html( funding_data.months + ' meses' );
                    $('#fr_car_months').val(funding_data.months + ' meses');
                    $('#live-price,#funding_result_price,#funding_resume_price').html(  moneyFormat(  funding_data.price ) );
                    $('#fr_car_price').val(moneyFormat(  funding_data.price ));
                    $('#funding_result_monthly_payment,#funding_resume_monthly_payment').html(  moneyFormat(  f_monthly_pay ) );
                    $('#fr_car_monthly_payment').val(moneyFormat(  f_monthly_pay ));
                }
                $.funding_select_version = function( ii ){
                    var $elements;
                    $elements               = $('#funding-versions-tabs li a');
                    $elements.removeClass('active');
                    $elements.eq( ii ).addClass('active');
                    funding_data.engagement = $("#car_engagement_slider").slider( 'value' ) ;
                    funding_data.months     = $("#car_months_slider").slider( 'value');
                    funding_data.price      = car_d.versions[ ii ].price;
                    fuh_data.car_version    = car_d.versions[ ii ].key;
                    $.funding_adjust_calc();
                }
                $.funding_select_car = function( k ){
                    var car_data    = get_car_data( k ),
                        $icons      = $('#car_select_preview .car_thumb_160 .car, #fu_adjust_car .car_thumb_60 .car, #funding_result_data .car_thumb_60 .car, #funding-resume-car .car_thumb_60 .car'),
                        $car_texts  = $('#car_select_name h3, #step-nav-tab h3, #fu_adjust_car h3, #funding_result_data h3, #funding-resume-car h3'),
                        $input_car_text = $('#fr_model_car');

                    fuh_data.key = k;
                    var anio = '2015';
//                    if(car_data.key == 'swift-sport'){
//                        anio = '2013';
//                    }
                    fuh_data.name = car_data.name + ' ' + anio;

                    $("#car_engagement_slider").slider({value: 20}) ;
                    $("#car_months_slider").slider({value: 6});

                    $car_texts.text( fuh_data.name );
                    $input_car_text.val( fuh_data.name );
                    $icons.removeClass();
                    $icons.addClass('car ' + fuh_data.key );
                    var i0 = cars_prices.length, versions = null, i1, i2, tab_data;
                    while( i0-- ){
                        if( cars_prices[i0].key == fuh_data.key ){
                            car_d = cars_prices[i0];
                            versions = car_d.versions;
                            var i1 = 0, i2 = versions.length, tabs_data = {versions:[]};
                            if( i2 > 1 ){
                                $('#funding-versions').show();
                            }else{
                                $('#funding-versions').hide();
                            }
                            while( i1 < i2 ){
                                tab_data = {
                                    i       : i1,
                                    name    : versions[i1].name
                                }
                                tabs_data.versions.push( tab_data );
                                i1++;
                            }
                            var html = Mustache.render( funding_tab, tabs_data );
                            $("#funding-versions-tabs").html( html );
                            $.funding_select_version( 0 );
                            break;
                        }
                    }
                };


                $.send_funding = function(){
                    var extended =  $('input[name="hfu_drive"]:checked').val(),
                        $model_car   = $('#fr_model_car'),
                        $car_price   = $('#fr_car_price'),
                        $car_engagement   = $('#fr_car_engagement'),
                        $fr_car_monthly_payment   = $('#fr_car_monthly_payment'),
                        $fr_car_months   = $('#fr_car_months'),
                        $name   = $('#hfu_name'),
                        $lastname  = $('#hfu_lastname'),
                        $email  = $('#hfu_email'),
                        /*$state  = $('#hfu_state_chzn_chzn'),
                        $concessionaire  = $('#hfu_concessionaire_chzn'),*/
                        $tel    = $('#hfu_tel'),
                        form_errors = 0;

                    if( !$.validate_input( $email ) ){
                        form_errors++;
                        $name.focus();
                    }
                    if( !$.validate_input( $name ) ){
                        form_errors++;
                        $name.focus();
                    }
                    if( !$.validate_input( $lastname ) ){
                        form_errors++;
                        $name.focus();
                    }
                    /*if( !$.validate_input( $state ) ){
                        form_errors++;
                        $name.focus();
                    }
                    if( !$.validate_input( $state ) ){
                        form_errors++;
                        $name.focus();
                    }*/
                    if( !$.validate_input( $concessionaire ) ){
                        form_errors++;
                        $name.focus();
                    }
                    if( extended > 0 ){

                        if( !$.validate_input( $tel ) ){
                            form_errors++;
                            $tel.focus();
                        }

                    } else{

                        if( conce_d == null ){
                            console.log(conce_d);
                            form_errors++;
                            /*$.error_bubble( $('#tdcss'), true);*/
                            /*
                             if(  ){

                             chzn-container
                             $('#tdcss, #tdcss #tdcs').css({
                             width: 'auto!important'
                             });

                             }*/
                            /*$('#tdcs .chzn-container a').trigger('click').focus();*/
                        } else {
                            /*$.error_bubble( $('#tdcss'), false );*/
                        }
                        $.error_bubble( $tel, false );
                        //
                    }
                    if( form_errors == 0){
                        var data = {
                            car_key     : fuh_data.key,
                            car_version : fuh_data.car_version,
                            email       : $email.val(),
                            engagement  : funding_data.engagement,
                            months      : funding_data.months,
                            name        : $name.val(),
                            /*lastname    : $lastname.val(),
                            state       : $state.val(),*/
                            concessionaire       : $concessionaire.val(),
                            newsletter  : ('#funding-newsletter:checked').length,
                            source      : 'Funding'
                        }


                        $('#funding_resume_email').html( data.email );
                        $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );
                        data.concessionaire_key = conce_d.key;

                        if( extended > 0 ){
                            data.phone = $tel.val();
                            $('#funding_resume_concessionaire').text( conce_d.name).attr({href:'/concesionarias/suzuki-'+conce_d.key});
                            ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Header_' + fuh_data.key, 0.012 * funding_data.price );
                        }else{
                            ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Header_' + fuh_data.key, 0.012 * funding_data.price );
                        }
                        var service_url = 'services/request/financing.json';
                        $.ajax({
                            cache       : false,
                            data        : data,
                            dataType    : 'json',
                            type        : 'post',
                            success     : function( data ){
                                if( data.status == 'ok' ){
                                    $('#funding_form').hide();
                                    $('#funding_resume').fadeIn();

                                }else{
                                    alert( data.message );
                                }

                            },
                            url     : service_url
                        });



                    }

                };


                $('#hfu_name').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('#hfu_lastname').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('#hfu_email').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                /*$('#tdcs select#hfu_state_chzn_chzn').delegate('select, change', function( e ){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('#tdcs select#hfu_concessionaire_chzn').delegate('select, change', function( e ){
                    var $input = $(this);
                    $.validate_input( $input );
                });*/
                $('#hfu_tel').on('focusout', function(){
                    var $input = $(this);
                    $.validate_input( $input );
                });
                $('input[name="hfu_drive"]').on('change, click', function( e ){
                    if( $(this).val() > "No deseas manejarlo" ){
                        $('.funding-hidden-inputs').show();
                    }else{
                        $('.funding-hidden-inputs').hide();
                    }
                });
                $('input[name="funding-newsletter"]').on('change, click', function( e ){
                    if( $('input[name="funding-newsletter"]').is(':checked') ){
                        $('input[name="funding-newsletter"]').val('on');
                    }else{
                        $('input[name="funding-newsletter"]').val('off');
                    }
                });
                $('#drive_no').trigger('click');
                $('#tdr_end').on('click', function(){
                    $.openPanel('');
                });
                /*$('#tdcs').concessionaire_selector({
                    callback: function( data ){
                        conce_d = {
                            key: this.id,
                            name: this.name
                        };
                        $.error_bubble( $('#tdcss'), false, 'Elije tu concesionaria' );
                    }
                });
                $('#tdcs').delegate('select','change',function(){
                    if( $('#tdcs select').length > 0 ){
                        if( $('#tdcs select').length > 1 ){
                            $('#error_state').css({marginLeft:0});
                        }
                        console.log($('#tdcs select'));
                        console.log($('#error_state'));
                    }

                })
                $('#tdcs').delegate('select','change',function(){
                    if( $('#tdcs select').length > 0 ){
                        if( $('#tdcs select').length > 1 ){
                            $('#error_concessionaire').css({marginLeft:250});
                        }
                        console.log($('#tdcs select'));
                        console.log($('#error_concessionaire'));
                    }

                })*/

                $("#car_engagement_slider").slider({
                    change  : function( event, ui ) {
                        funding_data.engagement = ui.value;
                        $.funding_adjust_calc();
                    },
                    max     : 80,
                    min     : 20,
                    slide   : function( event, ui ) {
                        funding_data.engagement = ui.value;
                        $.funding_adjust_calc();
                        $(this).parent().children(".star").html(ui.value+"%");
                    },
                    step    : 5,
                    value   : 20

                });
                $("#car_months_slider").slider({
                    change  : function( event, ui ) {
                        funding_data.months = ui.value;
                        $.funding_adjust_calc();
                    },
                    max     : 60,
                    min     : 6,
                    slide   : function( event, ui ) {
                        funding_data.months = ui.value;
                        $.funding_adjust_calc();
                        $(this).parent().children(".star").html(ui.value);
                    },
                    step    : 6,
                    value   : 6

                });


                current_tab = -1;
                $('#funding-versions-tabs').delegate('a','click', function( e ){
                    e.preventDefault();
                    $.funding_select_version( parseInt( $(this).data('version') ) );
                });
                $('#car_select_list').delegate('a','click', function( e ){
                    e.preventDefault();
                    $.funding_select_car( $(this).data('key') );
                    if (IS_MOBILE) {
                        $("#car_select_list").hide();
                        $("#car_select_name, #car_select_preview").fadeIn();
                    }
                });
                if( fuh_data.key == '' ){
                    $('#car_select_list a').eq(0).trigger('click');
                    if (IS_MOBILE) {
                        $("#car_select_name, #car_select_preview").hide();
                        $("#car_select_list").fadeIn();
                    }
                    goto_step( 1, true );
                }else{
                    $.funding_select_car( fuh_data.key );
                    goto_step( 2, true );
                }
                $("#change-car-test").on('click', function( e ){
                    e.preventDefault();
                    $("#car_select_name, #car_select_preview").hide();
                    $("#car_select_list").fadeIn();
                });
                $('a.funding-goto').on('click', function( e ){
                    e.preventDefault();
                    if (IS_MOBILE) {
                        if ($(this).data('step') == "1") {
                            $("#car_select_name, #car_select_preview").hide();
                            $("#car_select_list").fadeIn();
                        }
                    }
                    goto_step( $(this).data('step') );
                });
                if (IS_MOBILE) {
                    $("#fake-calculate").on('click', function( e ){
                        e.preventDefault();
                        $("#header-financiamiento .option-2, #fake-calculate").hide();
                        $(".funding-live-results, #modify-calc, #header-financiamiento .funding-goto").css("display", "block");
                    });
                    $("#modify-calc").on('click', function( e ){
                        e.preventDefault();
                        $(".funding-live-results, #modify-calc, #header-financiamiento .funding-goto").hide();
                        $("#header-financiamiento .option-2, #fake-calculate").css("display", "block");
                    });
                }
                break;
            default:
                break;
        }
    };
    //Display Input errors
    $.error_bubble = function( $label, show, message ){
        var $p = $label.parent().children('p.invalid-message');
        if( show ){
            if( message ){
                $p.html( message + '<span>&nbsp;</span>' ).stop().hide().fadeIn();
            }else{
                $p.stop().hide().fadeIn();
            }
        }else{
            $p.hide();
        }
    }
    ////Newsletter form
    var $newsletter_name = $('#newsletter_name');
    var $newsletter_email = $('#newsletter_email');

    $newsletter_name.on('focusout', function(){
        $.validate_input( $newsletter_name );
    });
    $newsletter_email.on('focusout', function(){
        $.validate_input( $newsletter_email );
    });

    $.newsletter_join_form = function(){

        var form_errors = 0;
        if( !$.validate_input( $newsletter_email ) ){
            form_errors++;
            $newsletter_email.focus();
        }
        if( !$.validate_input( $newsletter_name ) ){
            form_errors++;
            $newsletter_name.focus();
        }

        if( form_errors == 0 ){
            var data = {
                email       : $newsletter_email.val(),
                name        : $newsletter_name.val(),
                source      : 'Footer'
            };
            var service_url = 'services/request/newsletter.json';
            $.ajax({
                cache       : false,
                data        : data,
                dataType    : 'json',
                type        : 'post',
                success     : function( data ){
                    if( data.status == 'ok' ){
                        $newsletter_email.val('');
                        $newsletter_name.val('');
                        ga('send', 'event', 'Newsletter', 'Confirmacion', 'Footer', 600 );
                    }
                    alert( data.message );
                },
                url     : service_url
            });
        }

    }
    ////Newsletter form2
    var $FNAME = $('#mce-FNAME');
    var $EMAIL = $('#mce-EMAIL');

    $FNAME.on('focusout', function(){
        $.validate_input( $FNAME );
    });
    $EMAIL.on('focusout', function(){
        $.validate_input( $EMAIL );
    });

    $.mc_embedded_subscribe_form = function(){

        var form_errors = 0;
        if( !$.validate_input( $EMAIL ) ){
            form_errors++;
            $EMAIL.focus();
        }
        if( !$.validate_input( $FNAME ) ){
            form_errors++;
            $FNAME.focus();
        }

        if( form_errors == 0 ){
            var data = {
                email       : $EMAIL.val(),
                name        : $FNAME.val(),
                source      : 'Footer'
            };
            var service_url = 'services/request/newsletter.json';
            $.ajax({
                cache       : false,
                data        : data,
                dataType    : 'json',
                type        : 'post',
                success     : function( data ){
                    if( data.status == 'ok' ){
                        $EMAIL.val('');
                        $FNAME.val('');
                        ga('send', 'event', 'Newsletter', 'Confirmacion', 'Footer', 600 );
                    }
                    alert( data.message );
                },
                url     : service_url
            });
        }

    }



    //Loads html_sections_html contents
    $.ajax({
        url : '/services/templates/header_contents',
        success : function(data){
            main_menu_available = true;
            html_sections_html = data.data;
            if( preselected_click != null ){
                $.openPanel( preselected_click[0], preselected_click[1] );
                preselected_click = null;
            }
        }
    });
    //Loads concessionaires data
    $.ajax({
        url : '/services/concessionaires/all',
        success : function(data){
            concessionaires_data = data.data;
            if( geo_select_concessionaire_callback ){
                geo_select_concessionaire_callback();
            }
        }
    });
    $.ajax({
        url : '/services/financing/car_prices',
        success : function(data){
            cars_prices = data.data;
        }
    });

    //Saves geo data preferences in local storage
    function init_geo_core(){
        var today = new Date(),
            geo_timeout,
            now_time = today.getTime(),
            geo_data = amplify.store( "geodata" );
        if( !geo_data ){
            geo_data = { time: 0, ll: null };
            amplify.store( "geo_data" , geo_data );
        }

        try{

            // Creating an instance of the geolocation utility.
            var gl = new util.geolocator();
            // Callback. Fires to ask permissions
            gl.onHasGeolocationAPI = function() {

                geo_timeout = setTimeout( function(){
                    clearTimeout( geo_timeout );
                    $('body').prepend( geo_alert );
                    var geo_listener = function(){
                        var top = get_scroll_top();
                        if( top > 0 ){
                            $('#geolocation-fixed').removeClass('active');
                        }else{
                            $('#geolocation-fixed').addClass('disabled');
                        }
                    }
                    $('#geolocalization-button').on('click', function( e ){
                        e.preventDefault();
                        $('#geolocation-fixed').removeClass('disable');
                        var tomorrow = new Date();
                        tomorrow.setDate(today.getDate()+1);
                        var tomorrow_time = new Date( tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0).getTime();
                        geo_data.time = tomorrow_time;
                        amplify.store( "geo_data" , geo_data );
                        $(window).off( 'scroll', geo_listener );
                    });
                    $(window).scroll( geo_listener );
                    $(window).trigger('scroll');
                }, 5000 );
            };

            // Callback. Fires if the user has *not* a geolocation API.
            gl.onHasNotGeolocationAPI = function() {
                clearTimeout( geo_timeout );
                if( $('#geolocation-fixed').length ){
                    $('#geolocation-fixed').remove();
                }
                //Poner código de Analytics para Decir que no existe Geolocalización.
            };
            // Callback. Fires if the geolocation API was not successful
            gl.onFailedToLocate = function() {
                clearTimeout( geo_timeout );
                clearTimeout( geo_timeout );
                if( $('#geolocation-fixed').length ){
                    $('#geolocation-fixed').remove();
                }
                //Poner código de Analytics para Decir que no aceptó Geolocalización.
            };
            // Callback. Fires if the geolocation API succeeded.
            gl.onSuccess = function( response ) {
                clearTimeout( geo_timeout );
                if( $('#geolocation-fixed').length ){
                    $('#geolocation-fixed').remove();
                }
                HAS_GEOLOCATION = true;
                geo_ll = {
                    latitude    : response.coords.latitude,
                    longitude   : response.coords.longitude
                }
                if( geo_select_concessionaire_callback ){
                    geo_select_concessionaire_callback();
                }



                function check_td( res ) {
                    if (typeof res.data != 'undefined') {
                        // Walking over each concessionaire.
                        var con, con_pol, inside, ii = res.data.length;
                        while ( ii-- ) {
                            con = res.data[ii];
                            // This is the enclosed.
                            con_pol = area.getPolygon( con.geometry );
                            inside  = area.isInsideArea( ll, con_pol );
                            if ( inside ) {
                                HAS_INSTANTDRIVE = true;
                            }
                        };
                        //We are always inside Instant Drive Area for testing
                        //HAS_INSTANTDRIVE = true;
                        if( HAS_INSTANTDRIVE ){
                            if( get_car_by_url() != null ){
                                $('#model-test-drive-flag').css({backgroundImage:'url("/images/template/models/test-drive.png")'});
                                var $ids = $('#instant-drive-section'),
                                    $tds =  $('#text-drive-section');
                                $('#test-drive-open').on('click', function( e ){
                                    e.preventDefault();
                                    $ids.hide();
                                    $tds.hide().fadeIn();
                                    $.scroll_to('prueba-de-manejo')
                                });
                                $ids.show();
                                $tds.hide();
                            }
                        }
                    };
                };
                var area = new util.area(),
                    COMPANY_ID = '5176797fb3035b047f000001',
                    api = new util.api(),
                    ll = new google.maps.LatLng( geo_ll.latitude, geo_ll.longitude );
                api.concessionaireList(COMPANY_ID, check_td);
            };
            var is_in_id =  (window.location.pathname.split('/'))[0] == 'instantdrive';
            if( !is_in_id ){
                if( instant_drive_available_time() ){
                    if( now_time > geo_data.time ){
                        // Fine, now that we defined all our callbacks we may proceed with geolocation.
                        gl.locate();
                    }
                }
            }

        }catch( error ){
            console.warn('  No hay Instant Drive =(')
        }
    }
    init_geo_core();
//    $('body').append( preload_header_assets ).append( dummy_alerts );


    //Auto animates if a hash param exists
    if( init_hash ){
        init_hash = init_hash.split('#').join('');
        if( $('a[name="'+init_hash+'"]').length > 0){

            setTimeout(function(){
                $.scroll_to( init_hash );
            }, 1000);
        }else if(init_hash == 'prueba-de-manejo'){
            //alert(init_hash);
            //$.openPanel('test-drive');
        }else if(init_hash == 'modelos'){
            $.openPanel('models');
        }
    }

    if (IS_MOBILE) {
        $("body").on("click", ".header-column", function () {
            if (!$(this).hasClass("header-column-open")) {
                $('html, body').animate({scrollTop: '0px'}, 400);
                $(".header-links-list").addClass("header-links-open");
                $(this).siblings().hide();
                $(this).addClass("header-column-open");
                $(this).find("ul").fadeIn();
            }
        });

        $("body").on("click", ".back-list-arrow", function () {
            var header_column_open = $(".header-column-open");
            $(".header-links-list").removeClass("header-links-open");
            header_column_open.removeClass("header-column-open");
            $(".links-list").hide();
            $(".header-column").fadeIn();
        });
    }

    //hash para abrir el menu de mi suzuki automáticamente
    if(window.location.hash == '#mi-suzuki') {
        console.log(window.location.hash);
        $('#header-owners-button').trigger('click');
    };
    //$('#header-owners-button').trigger('click');
});
