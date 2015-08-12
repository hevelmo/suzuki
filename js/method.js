/*
  In this file will be present most of the hard programming and performance of
  The web application, here is the hard logic, handlers methods of the
  DOM elements events.
  This section is used to declare global variables, with values used Throughout
  The system, especially those that keeps session variable values from php
*/
/* ------------------------------------------------------ *\
 [Variables] 'Zone'
\* ------------------------------------------------------ */
    var lugar = '';

    var sections;
    var height = 0;
    var header_section = '';
    var init_hash = window.location.hash,
        concessionaires_data = null,
        concessionaire_sorted = null,
        geo_options = null,
        HAS_GEOLOCATION = false,
        HAS_INSTANTDRIVE = false,
        geo_ll = null,
        geo_timeout = null;

    var concessionaires;
    var map;
    var map_markers = [];
    var title_box = null;
    var concessionaire_preselected = 0;
    var concessionaire_preselected_n = 0;
    var concessionaire_detail_selected = false;
    var concessionaire_detail_selected_n = false;
    var current_concessionaire = '', current_concessionaire_id = -1, concessionaire_open = false;

    var current_menu = '',
        scroll_current_section = -1,
        sections_positions = [],
        yy = 0,
        arrow_section = [ 0, -403, -239, -102, 53, 214 ],
        //hash_section = [ "", "1", "2", "3", "4", "5", "6", "7" ],
        section_names = [ "", "home", "caracteristicas", "galeria", "versiones_precios", "accesorios", "prueba" ],
        section_timer,
        selected_concessionaire = -1;
    var td_id_flag ='<div id="model-section-arrow"><span>&nbsp;</span></div><div id="model-test-drive-flag"><a href="#prueba-de-manejo" id="model-test-drive-flag-link"><span>Prueba de Manejo</span></a></div>';
    var patch_bar ='<div class="menu-patch" id="patch">&nbsp;</div>';
    var current_car;
    var $display_tables = $('.display-tables'), display_vct_class = 'prices';
    var cars_prices = null;
    var $panelTabsNav = null, $panelTabs = null, current_tab = -1, fuh_data = null;
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
    var cars_data = [
        { key: 'swift-sport'    , name: 'Swift Sport'   },
        { key: 'swift'          , name: 'Swift'         },
        { key: 'sx4-crossover'  , name: 'SX4 Crossover' },
        { key: 'sx4-sedan'      , name: 'SX4 Sedán'     },
        { key: 'kizashi'        , name: 'Kizashi'       },
        { key: 'grand-vitara'   , name: 'Grand Vitara'  },
        { key: 's-cross'        , name: 'S-Cross'       },
        { key: 'ciaz'           , name: 'Ciaz'          }
    ];
    // TEST DRIVE SELECT CONCESSIONAIRES
    var default_data = {
        concessionaire_id : 0,
        key     : ''
    };
/* ------------------------------------------------------ *\
 [functions] 'Zone'
 function nameFunction (arg) {
 }
\* ------------------------------------------------------ */
/* ------------------------------------------------------ *\
 [functions] instant_drive_available_time
\* ------------------------------------------------------ */
    function instant_drive_available_time(){
        var time = new Date().getHours();
        return ( time > 10 && time < 18 );
    }
/* ------------------------------------------------------ *\
 [functions] moneyFormat
\* ------------------------------------------------------ */
    function moneyFormat( num ) {
        var n = Number( num ),
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = "." ,
            t = "," ,
            s = n < 0 ? "$ -" : "$ ",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }
/* ------------------------------------------------------ *\
 [functions] analytics_test_drive
\* ------------------------------------------------------ */
    analytics_test_drive = function( title, value ){
        try{
            value = parseInt( value, 10 );
            if( !value ){ value = 0; }
            ga('send', 'event', 'Prueba de Manejo', 'Confirmacion', title, value );
            //console.log("ga('send', 'event', 'Prueba de Manejo', 'Confirmacion: ', " + title, value + ")");
        }catch ( e ){
            //console.log('Ocurrió un error con el evento de GA');
        }
        //fb_pixel( '6016795700971', '0.01');
    }
    /*function insta_drive_gaq(){
        var precio_actual = showMeTheMoney( current_car );
        //ga('send', 'event', 'Instant Drive', 'Confirmacion', current_car, precio_actual * 0.071 );
        //console.log("ga('send', 'event', 'Instant Drive', 'Confirmacion', "+current_car, precio_actual * 0.071+")");
    }*/
/* ------------------------------------------------------ *\
 [functions] validateEmail
\* ------------------------------------------------------ */
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\., ;:\s@\"] + (\.[^<>()[\]\\., ;:\s@\"] + )*)|(\". + \"))@((\[[0-9] {1, 3}\.[0-9] {1, 3}\.[0-9] {1, 3}\.[0-9] {1, 3}\])|(([a-zA-Z\-0-9] + \.) + [a-zA-Z] {2, }))$/;
        //return re.test(email);
        return true;
    }
/* ------------------------------------------------------ *\
 [functions] showMeTheMoney
\* ------------------------------------------------------ */
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
            case 'ciaz':
                value = 194900.00;
                break;
            default:
                break;
        }
        return value;
    }
/* ------------------------------------------------------ *\
 [functions] insta_drive_gaq
\* ------------------------------------------------------ */
    function insta_drive_gaq(){
        var precio_actual = showMeTheMoney( current_car );
        ga('send', 'event', 'Instant Drive', 'Confirmacion', current_car, precio_actual * 0.071 );
    }
/* ------------------------------------------------------ *\
 [functions] modifyHeight
\* ------------------------------------------------------ */
    function modifyHeight(selector){
        $(selector).each(function (index, Element) {
            var cell_array = new Array(2);
            var cell_height = 0;
            $(this).find(".cell").each(function (index, Element) {
                var val_cell = ($(this).height.length > 0) ? $(this).height() : 0;
                cell_array[index] = val_cell;
            });
            cell_height = Math.max.apply( Math, cell_array );
            $(this).find(".cell").css("height", cell_height);
        });
    }
/* ------------------------------------------------------ *\
 [functions] switch_menus
\* ------------------------------------------------------ */
    function switch_menus( menu ){
        if( current_menu != menu ){
            current_menu = menu;
            var new_h = ( menu == 'cars') ? 50 : 95;
            //console.log(menu);
            if (lugar === 'modelos') {
                $('#header-zone').stop().animate({height:new_h });
                if( menu == 'cars'){
                    //console.log('Menu Cars');
                    $('#regular-header').stop().animate({marginTop: -95 });
                    $('#logo-wrapper').stop().animate({top: -95 });
                }else{
                    //console.log('No Cars');
                    $('#regular-header').stop().animate({marginTop: 0 });
                    $('#logo-wrapper').stop().animate({top: 0 });
                }
            } else {
                $('#header-zone').removeAttr( "style" );
                $('#regular-header').removeAttr( "style" );
                $('#logo-wrapper').removeAttr( "style" );
            }

        }
    }
/* ------------------------------------------------------ *\
 [functions] switch_arrow
\* ------------------------------------------------------ */
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
            /*window.clearTimeout( section_timer );
            section_timer = setTimeout(function(){
                var url = document.location + '/' + section_names[ii];
                ga('send', 'pageview', url );
            }, 2000);*/
            $cars_menu_li.removeClass('current');
            $cars_menu_li.eq( ii - 1).addClass('current');

            if( arrow_section [ ii ] ){
                gtx = arrow_section [ ii ];
                //console.log(gtx);
            }else{
                gtx = 415;
                //console.log(gtx);
            }
            if( arrow_top != arrow_y ){
                $arrow.show();
                $arrow.stop().delay(100).css({marginLeft:gtx,top:arrow_y -10,opacity:0}).animate({top:arrow_y,opacity:1 },300);
            }else{
                $arrow.stop().animate({marginLeft:gtx});
            }
        }
    }
/* ------------------------------------------------------ *\
 [functions] scroll_to
\* ------------------------------------------------------ */
    //animates all transitions (needs an "a" element whit "name attrubute")
    $.scroll_to = function( target_name ){
        var target, dest, header_height = $('#header-wrapper').height();
        if( target_name != 'top' ){
            target = $( 'a[name="' + target_name + '"]' );
            dest = target.offset().top - header_height - 35;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                dest += 75;
            }
        }else{
            dest = 0;
        }
        $('html,body').stop().animate({ scrollTop : dest}, 800 , 'easeOutSine');
    };
/* ------------------------------------------------------ *\
 [functions] animate_arrow
\* ------------------------------------------------------ */
    //First Arrow animation
    $.animate_arrow = function( $arrow ){
        $arrow.css( { marginTop:-82,opacity:1}).animate({marginTop:-20,opacity:0}, 1000, function(){
            $.animate_arrow( $(this) );
        });
    }
/* ------------------------------------------------------ *\
 [functions] adjust_spaces
\* ------------------------------------------------------ */
    $.adjust_spaces = function(){
        $('a.section-separator').each( function( ii ){
            yy =  $(this).offset().top - 200 ;
            yy = ( yy > 0 )? yy : 0;
            sections_positions[ ii ] = parseInt( yy );
        });
    }
/* ------------------------------------------------------ *\
 [functions] display_versions_comparative
\* ------------------------------------------------------ */
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
/* ------------------------------------------------------ *\
 [functions] resetAlert
\* ------------------------------------------------------ */
    //It performs whit alertify libary an css
    function resetAlert () {
        alertify.set({
            labels : {
                ok     : "OK",
                cancel : "Cancel"
            },
            delay : 5000,
            buttonReverse : false,
            buttonFocus   : "ok"
        });
    }
/* ------------------------------------------------------ *\
 [functions] slide_tabs
\* ------------------------------------------------------ */
    //Add change tabs controls for test drive and founding
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
/* ------------------------------------------------------ *\
 [functions] goto_step_financing
\* ------------------------------------------------------ */
    function goto_step_financing( step, disable  ){
        var ii, $divinput;
        slide_tabs( step, disable );
        if( step == 3 ){
        }
    }
/* ------------------------------------------------------ *\
 [functions] funding_core
\* ------------------------------------------------------ */
    function funding_core( total_pay, months ){
        var atc = months < 54 ? .1560 : .1676;
        var atc_month = atc / 12;
        var form_partial_1 = 1 - ( Math.pow( ( 1 + atc_month ) , -months ) );
        var form_partial_2 = form_partial_1 / atc_month;
        var form_partial_3 = total_pay / form_partial_2;
        return form_partial_3.toFixed( 2 );
    }
/* ------------------------------------------------------ *\
 [functions] get_car_data
\* ------------------------------------------------------ */
    function get_car_data( k ){
        var ii = cars_data.length;
        while( ii-- ){
            if( cars_data[ii].key == k ){
                return cars_data[ii];
            }
        }
        return null;
    }
/* ------------------------------------------------------ *\
 [functions] is_model_name
\* ------------------------------------------------------ */
    function is_model_name( str ){
        var ii = cars_data.length;
        while( ii-- ){
            if( cars_data[ii].key == str ){
                return true;
            }
        }
        return false;
    }
/* ------------------------------------------------------ *\
 [functions] get_concessionaire_data_by_id
\* ------------------------------------------------------ */
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
/* ------------------------------------------------------ *\
 [functions] concessionaires_order_nearest
\* ------------------------------------------------------ */
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
/* ------------------------------------------------------ *\
 [functions] geo_select_concessionaire_callback
\* ------------------------------------------------------ */
    function geo_select_concessionaire_callback(){
        if( geo_ll != null ){
            if( concessionaires_data ){
                if(  window.location.pathname == '/concesionarias' ){
                    concessionaire_sorted = true;
                    concessionaires_order_nearest( geo_ll.latitude, geo_ll.longitude );
                    $.open_concessionaire_by_key( concessionaires_data[0].key , true );
                    //console.log(concessionaires_data);
                }
            }
        }
    }
/* ------------------------------------------------------ *\
 [functions] geo_select_concessionaire_callback
\* ------------------------------------------------------ */
    function get_location(){
        if( HAS_GEOLOCATION ){
            if( geo_ll!= null ){
                return geo_ll;
            }
        }
        return null;
    }
/* ------------------------------------------------------ *\
 [functions] 'Zone'
 var Method = {
 function_name : function(event) {}
 }

 for event name event handlers methods use indicate the name
 of the event and the element afected
\* ------------------------------------------------------ */
/*Make a group of methods for each url defined in room.js, in order to control the elements events,
  and the porformance of  each section.
  Depending on the complexity of the url, could be more than one group of methods.
  Could exist some group of general methods*/
/* ------------------------------------------------------ *\
    [Metodos] Favicon
\* ------------------------------------------------------ */
    var favicon = {
        load_favicon: function() {
            favicon.change("img/favicon.ico");
        },
        change: function(iconURL, optionalDocTitle) {
            if (arguments.length == 2) {
              document.title =  optionamDocTitle;
            }
            this.addLink(iconURL, "shortcur icon");
        },
        addLink: function(iconURL, relValue) {
            var link = document.createElement("link");
            link.type = "image/x-icon";
            link.rel = relValue;
            link.href = iconURL;
            this.removeLinkIfExists(relValue);
            this.docHead.appendChild(link);
        },
        removeLinkIfExists: function(relValue) {
            var links = this.docHead.getElementsByTagName("link");
            for (var i=0; i<links .length; i++) {
              var link = links[i];
              if (link.type=="image/x-icon" && link.rel==relValue) {
                this.docHead.removeChild(link);
                return; // Assuming only one match at most.
              }
            }
        },
        docHead:document.getElementsByTagName("head")[0]
    }
/* ------------------------------------------------------ *\
 [Methods] detectNavigatorMethods
\* ------------------------------------------------------ */
    var detectNavigatorMethods = {
        IE10 : function() {
            //Detectar si es IE10
            var doc = document.documentElement;
            doc.setAttribute('data-useragent', navigator.appVersion.match(/MSIE ([\d.]+)/));
            if($('html').attr('data-useragent') == 'MSIE 10.0,10.0'){
                $("body").addClass('IE10');
            }
        }
    }
/* ------------------------------------------------------ *\
 [Methods] cleanStyle
\* ------------------------------------------------------ */
    var cleanStyleMethods = {
        cleanAttrHome : function () {
            $('head .link-home').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrGroup : function () {
            $('head .link-group').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrCatalog : function () {
            $('head .link-catalog').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrConcessionaries : function () {
            $('head .link-concessionaries').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrContact : function () {
            $('head .link-contact').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrTestDriveSelection : function () {
            $('head .link-test-drive-selection').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrLegals : function () {
            $('head .link-legals').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModels : function () {
            $('head .link-models').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_swift_sport : function () {
            $('head .link-swift-sport').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_swift : function () {
            $('head .link-swift').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_sx4_crossover : function () {
            $('head .link-sx4-crossover').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_sx4_sedan : function () {
            $('head .link-sx4-sedan').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_kizashi : function () {
            $('head .link-kizashi').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_grand_vitara : function () {
            $('head .link-grand-vitara').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_s_cross : function () {
            $('head .link-s-cross').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrModel_ciaz : function () {
            $('head .link-ciaz').remove();
            $('head #meta-model').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrWarranty : function () {
            $('head .link-warranty').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        },
        cleanAttrReasons : function () {
            $('head .link-reasons').remove();
            $('#patch').remove();
            $('#model-section-arrow').remove();
            $('#model-test-drive-flag').remove();
        }
    }
/* ------------------------------------------------------ *\
 [Methods] addStyle
\* ------------------------------------------------------ */
    var addStylesMethods = {
        addStyleIndex : function () {
            linkIndexAttributes = [
                ['link', {'id': 'content-add-styles-home', 'rel': 'stylesheet', 'class': 'link-home', 'href': 'css/sections/home.css'}, '', 0],
                ['link', {'id': 'content-add-styles-models-home', 'rel': 'stylesheet', 'class': 'link-home', 'href': 'css/sections/models-home.css'}, '', 0]
            ];
            SUK.appendMulti('head', linkIndexAttributes);
            $('body').prepend( patch_bar );
        },
        addStyleGroup : function () {
            linkCatalogsAttributes = {'id': 'content-add-styles-group', 'rel': 'stylesheet', 'class': 'link-group', 'href': 'css/sections/warranty.css'}
            SUK.appendOne('head', 'link', linkCatalogsAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleConcessionaries : function () {
            linkConcessionariesAttributes = {'id': 'content-add-styles-concessionaries', 'rel': 'stylesheet', 'class': 'link-concessionaries', 'href': 'css/sections/concessionaires.css'}
            SUK.appendOne('head', 'link', linkConcessionariesAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleCatalogs : function () {
            linkCatalogsAttributes = {'id': 'content-add-styles-catalog', 'rel': 'stylesheet', 'class': 'link-catalog', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', linkCatalogsAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleContact : function () {
            linkContactAttributes = [
                ['link', {'id': 'content-add-styles-contact', 'rel': 'stylesheet', 'class': 'link-contact', 'href': 'css/sections/contact.css'}, '', 0],
                ['link', {'id': 'content-add-styles-contact-shosen', 'rel': 'stylesheet', 'class': 'link-contact', 'href': 'css/plugins/jquery.chosen/chosen.css'}, '', 0]
            ];
            SUK.appendMulti('head', linkContactAttributes);
            $('body').prepend( patch_bar );
        },
        addStyleTestDriveSelection : function () {
            linkTestDriveSelectionAttributes = {'id': 'content-add-styles-test-drive-selection', 'rel': 'stylesheet', 'class': 'link-test-drive-selection', 'href': 'css/sections/test-drive-selection.css'}
            SUK.appendOne('head', 'link', linkTestDriveSelectionAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleLegals : function () {
            linkLegalsAttributes = {'id': 'content-add-styles-legals', 'rel': 'stylesheet', 'class': 'link-Legals', 'href': 'css/sections/legals.css'}
            SUK.appendOne('head', 'link', linkLegalsAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleModels : function () {
            linkModelsAttributes = {'id': 'content-add-styles-models_gama', 'rel': 'stylesheet', 'class': 'link-models_gama', 'href': 'css/sections/models_gama.css'}
            SUK.appendOne('head', 'link', linkModelsAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleModel_swift_sport : function () {
            seo_elements_swift_sport_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'autos.suzuki.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Diseño deportivo, movilidad veloz. La combinación perfecta de un auto deportivo y uno urbano. '}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'Swift Sport'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/swift-sport/exterior/04.png'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $254,000 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_swift_sport_elements);

            link_swift_sport_Attributes = {'id': 'content-add-styles-swift-sport', 'rel': 'stylesheet', 'class': 'link-swift-sport', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_swift_sport_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_swift : function () {
            seo_elements_swift_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'autos.suzuki.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Aerodinámico y divertido para ti que buscas diseño y agilidad en un solo auto. '}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'Swift'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/swift/exterior/06.png.jpeg'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $174,000 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_swift_elements);

            link_swift_Attributes = {'id': 'content-add-styles-swift', 'rel': 'stylesheet', 'class': 'link-swift', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_swift_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_sx4_crossover : function () {
            seo_elements_sx4_crossover_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Gdl'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Gdl'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'suzukigdl.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Ágil y liviano, siente la vida cuando todo marcha en cuatro ruedas.'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'SX4 Crossover'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/sx4-crossover/exterior/foto-05.png'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $238,000 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratiss'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_sx4_crossover_elements);

            link_sx4_crossover_Attributes = {'id': 'content-add-styles-sx4-crossover', 'rel': 'stylesheet', 'class': 'link-sx4-crossover', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_sx4_crossover_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_sx4_sedan : function () {
            seo_elements_sx4_sedan_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Gdl'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Gdl'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'suzukigdl.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Fusión de confort y desempeño. El tamaño perfecto. '}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'SX4 Sedán'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/sx4-sedan/exterior/foto-05.png'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $219,000 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_sx4_sedan_elements);

            link_sx4_sedan_Attributes = {'id': 'content-add-styles-sx4-sedan', 'rel': 'stylesheet', 'class': 'link-sx4-sedan', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_sx4_sedan_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_kizashi : function () {
            seo_elements_kizashi_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'autos.suzuki.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'&quot;Algo grande está por venir&quot;. Imponente diseño con finos acabados que roban miradas. '}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'Kizashi'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/kizashi/exterior/foto-10.png'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $354,500 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_kizashi_elements);

            link_kizashi_Attributes = {'id': 'content-add-styles-kizashi', 'rel': 'stylesheet', 'class': 'link-kizashi', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_kizashi_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_grand_vitara : function () {
            seo_elements_grand_vitara_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'autos.suzuki.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Seguridad, control y poder. El balance perfecto en una SUV.'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'Grand Vitara'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/grand-vitara/exterior/07.png'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $312,000 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_grand_vitara_elements);

            link_grand_vitara_Attributes = {'id': 'content-add-styles-grand-vitara', 'rel': 'stylesheet', 'class': 'link-grand-vitara', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_grand_vitara_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_s_cross : function () {
            seo_elements_s_cross_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'autos.suzuki.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Fuerza, elegancia  y confort en cualquier condición.'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'S-Cross'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'img/sections/models/gallery/s-cross/exterior/foto-05.png'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $239,900 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_s_cross_elements);

            link_s_cross_Attributes = {'id': 'content-add-styles-s-cross', 'rel': 'stylesheet', 'class': 'link-s-cross', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_s_cross_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleModel_ciaz : function () {
            seo_elements_ciaz_elements = [
                ['meta', {'id':'meta-model', 'name':'twitter:card', 'content':'product'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:site', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:creator', 'content':'@Suzuki_Mex'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:domain', 'content':'autos.suzuki.com.mx'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:description', 'content':'Diseño perfecto con el equipamiento ideal. La revolución sedán está aquí.'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:title', 'content':'Ciaz'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:image', 'content':'images/sections/models/gallery/ciaz/exterior/foto-07.jpg'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label1', 'content':'Varios colores, modelos y accesorios disponibles'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data1', 'content':'Hazlo tuyo desde $199,990 MXN'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:label2', 'content':'Disponible en línea o en tu concesionaria'}, '', 0],
                ['meta', {'id':'meta-model', 'name':'twitter:data2', 'content':'Prueba de manejo gratis'}, '', 0]
            ];
            SUK.appendMulti('head', seo_elements_ciaz_elements);

            link_ciaz_Attributes = {'id': 'content-add-styles-ciaz', 'rel': 'stylesheet', 'class': 'link-ciaz', 'href': 'css/sections/models.css'}
            SUK.appendOne('head', 'link', link_ciaz_Attributes, '', 0);

            $('body').prepend( patch_bar );
            $('body').prepend( td_id_flag );
        },
        addStyleWarranty : function () {
            linkWarrantyAttributes = {'id': 'content-add-styles-warranty', 'rel': 'stylesheet', 'class': 'link-warranty', 'href': 'css/sections/warranty.css'}
            SUK.appendOne('head', 'link', linkWarrantyAttributes, '', 0);
            $('body').prepend( patch_bar );
        },
        addStyleReasons : function () {
            linkReasonsAttributes = {'id': 'content-add-styles-reasons', 'rel': 'stylesheet', 'class': 'link-reasons', 'href': 'css/sections/10reasons.css'}
            SUK.appendOne('head', 'link', linkReasonsAttributes, '', 0);
            $('body').prepend( patch_bar );
        }
    }
/* ------------------------------------------------------ *\
 [Methods] razones
\* ------------------------------------------------------ */
    var reasonsMethods = {
        reasons: function() {
            closePanelMenuMethods.closePanelBeforeBuy();
            preload([
                'img/sections/10reasons/prev-hover.png',
                'img/sections/10reasons/next-hover.png',
            ]);
            var num_slide = 0;
            var prev = $("#reasons-prev");
            var next = $("#reasons-next");
            var num = $("#count");
            var margin_top = 0;
            var hash = parseInt(location.hash.split("-")[1] - 1);
            var vel = 600;
            var height_slide = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 290 : 580;

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
                //ga('send', 'pageview', '/razon-' + num_slide );
            }

            if (hash && hash > 0 && hash <= 9) {
                moveSlide(0 ,true);
            }

            $("#reasons-navigation div img").hover(
                function () {
                    if ($(this).parent().hasClass("reasons-disabled"))
                        return 0;
                    if ($(this).parent().index() == 0)
                        $(this).attr("src", "img/sections/10reasons/prev-hover.png");
                    else
                        $(this).attr("src", "img/sections/10reasons/next-hover.png");
                },
                function () {
                    if ($(this).parent().index() == 0)
                        $(this).attr("src", "img/sections/10reasons/prev.png");
                    else
                        $(this).attr("src", "img/sections/10reasons/next.png");
            });

            $('#reasons-navigation').delegate('div', 'click', function(){
                if ($(this).hasClass("reasons-disabled"))
                    return 0;
                if ($(this).index() == 0)
                    moveSlide(-1, false);
                else
                    moveSlide(1, false);
            });
        }
    }
    function preload(arrayOfImages) {
        $(arrayOfImages).each(function(){
            $('<img/>')[0].src = this;
        });
    }
/* ------------------------------------------------------ *\
 [Methods] garantia
\* ------------------------------------------------------ */
    var warrantyMethods = {
        warranty: function(index) {
            $('#go-warranty-ordinary').attr('href','#/garantia-suzuki/ordinaria');
            $('#go-warranty-extended').attr('href','#/garantia-suzuki/extendida');
            warrantyMethods.auto_open();
            closePanelMenuMethods.closePanelOwners();
        },
        auto_open: function() {
            var auto_open = ( window.location.hash ).split('#')
            if( auto_open.length > 0 ){
                if( auto_open[1] == 'extendida' ){
                    $('.main-buttons a').eq(1).trigger('click');

                }else  if( auto_open[1] == 'ordinaria' ){
                    $('.main-buttons a').eq(0).trigger('click');
                }
            }
        },
        main_buttons: function(event) {
            event.preventDefault();
            var index = $(this).index();
            if( previous_index != index ){
                if( $('.hidden-content:visible').length ){
                    $('.hidden-content:visible').slideUp(500, function(){
                        appears( index );
                    });
                }else{
                    appears( index );
                }
            }else{
                $('a.close-warranty-button').trigger('click');
            }
        },
        close_warranty_button: function(event) {
            event.preventDefault();
            $('.hidden-content:visible').slideUp(500);
            previous_index = -1;
            $.scroll_to( 'top' );
        }
    }
    var previous_index = -1;
    function appears( index ){
        $('.hidden-content').addClass('hidden');
        $('.hidden-content').eq( index ).removeClass('hidden').stop().hide().slideDown(500);
        previous_index = index;
        $.scroll_to( index == 1 ? 'ordinaria': 'extendida' );
    }
/* ------------------------------------------------------ *\
 [Methods] catalog
\* ------------------------------------------------------ */
    var catalogMethods = {
        addAttrCatalog: function() {
            // EVENTS FOOTER
            $('ul.links_catalog li a#footer-data-swift').attr('href','#/catalogos/swift');
            $('ul.links_catalog li a#footer-data-swift-sport').attr('href','#/catalogos/swift-sport');
            $('ul.links_catalog li a#footer-data-kizashi').attr('href','#/catalogos/kizashi');
            $('ul.links_catalog li a#footer-data-s-cross').attr('href','#/catalogos/s-cross');
            $('ul.links_catalog li a#footer-data-grand-vitara').attr('href','#/catalogos/grand-vitara');
            $('ul.links_catalog li a#footer-data-ciaz').attr('href','#/catalogos/ciaz');
            //EVENT LIST CATALOG
            $('div.catalog_car a#data-swift').attr('href','#/catalogos/swift');
            $('div.catalog_car a#data-swift-sport').attr('href','#/catalogos/swift-sport');
            $('div.catalog_car a#data-kizashi').attr('href','#/catalogos/kizashi');
            $('div.catalog_car a#data-s-cross').attr('href','#/catalogos/s-cross');
            $('div.catalog_car a#data-grand-vitara').attr('href','#/catalogos/grand-vitara');
            $('div.catalog_car a#data-ciaz').attr('href','#/catalogos/ciaz');
        },
        pageTransition : function () {
            $('.catalog_car').css('cursor','pointer');
            catalogMethods.addAttrCatalog();
        },
        clickGo_catalogs: function(event) {
            Finch.navigate('/catalogos');
        },
        preventDefault_data_swift_sport: function(event) {
            //event.preventDefault();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 112}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 0}, 800 , 'easeOutSine');
            }
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            //console.log('click_catalog_swift_sport');
        },
        preventDefault_data_swift: function(event) {
            //event.preventDefault();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 255}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 655}, 800 , 'easeOutSine');
            }
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            //console.log('click_catalog_swift');
        },
        preventDefault_data_kizashi: function(event) {
            //event.preventDefault();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 398}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 1310}, 800 , 'easeOutSine');
            }
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            //console.log('click_catalog_kizashi');
        },
        preventDefault_data_s_cross: function(event) {
            //event.preventDefault();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 541}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 1965}, 800 , 'easeOutSine');
            }
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            //console.log('click_catalog_s_cross');
        },
        preventDefault_data_grand_vitara: function(event) {
            //event.preventDefault();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 668}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 2620}, 800 , 'easeOutSine');
            }
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            //console.log('click_catalog_grand_vitara');
        },
        preventDefault_data_ciaz: function(event) {
            //event.preventDefault();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 812}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 3275}, 800 , 'easeOutSine');
            }
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            //console.log('click_catalog_ciaz');
        },
        footer_preventDefault_data_swift_sport: function(event) {
            //event.preventDefault();
            catalogMethods.clickGo_catalogs();
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 112}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 0}, 800 , 'easeOutSine');
            }
            //console.log('click_catalog_swift_sport');
        },
        footer_preventDefault_data_swift: function(event) {
            //event.preventDefault();
            catalogMethods.clickGo_catalogs();
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 255}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 655}, 800 , 'easeOutSine');
            }
            //console.log('click_catalog_swift');
        },
        footer_preventDefault_data_kizashi: function(event) {
            //event.preventDefault();
            catalogMethods.clickGo_catalogs();
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 398}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 1310}, 800 , 'easeOutSine');
            }
            //console.log('click_catalog_kizashi');
        },
        footer_preventDefault_data_s_cross: function(event) {
            //event.preventDefault();
            catalogMethods.clickGo_catalogs();
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 541}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 1965}, 800 , 'easeOutSine');
            }
            //console.log('click_catalog_s_cross');
        },
        footer_preventDefault_data_grand_vitara: function(event) {
            //event.preventDefault();
            catalogMethods.clickGo_catalogs();
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 668}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 2620}, 800 , 'easeOutSine');
            }
            //console.log('click_catalog_grand_vitara');
        },
        footer_preventDefault_data_ciaz: function(event) {
            //event.preventDefault();
            catalogMethods.clickGo_catalogs();
            $('.catalog_car').removeClass('active');
            $(this).parent('.catalog_car').addClass('active');
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                //console.log('You are using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 812}, 800 , 'easeOutSine');
            } else {
                //console.log('You are not using a mobile device!');
                $('html,body').stop().animate({ scrollTop : 3275}, 800 , 'easeOutSine');
            }
            //console.log('click_catalog_ciaz');
        }
    }
/* ------------------------------------------------------ *\
 [Methods] actionMenuBars
\* ------------------------------------------------------ */
    var actionMenuBarsMethods = {
        removeCleanPanelMenu : function () {
            $('#header-spacer').css('height','0px');
            $('.header_section').css({
                'display':'none',
                'opacity':'0'
            });
            if ($(this).hasClass('active')) {
                $('a.expand-header').removeClass('active');
                $(domEl.div_header_panel).removeClass('header_panel_active');
            } else {
                $('a.expand-header').removeClass('active');
                $(domEl.div_header_panel).addClass('header_panel_active');
                $(this).addClass('active');
            }
            SUK.setHTML(domEl.div_recurrent_panel_menu, '');
        },
        clickReturnIndex : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
            //console.log('Click index');
        },
        clixkGoGroup : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/grupo');
            //console.log('Click group');
        },
        clickGoConcesinary : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/concesionarias');
            //console.log('Click concesionarias');
        },
        clickGoCatalogs : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/catalogos');
            $('.et-section').addClass('et-page-current');
            //console.log('Click catalogos');
        },
        clickGoContactUs : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/contactanos');
            //console.log('Click contactanos');
        },
        clickGoPrivacy : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/aviso-de-privacidad');
            //console.log('Click aviso de privacidad');
        },
        clickGoLegalTerms : function (event) {
            actionMenuBarsMethods.removeCleanPanelMenu();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/terminos-legales');
            //console.log('Click Terminos Legales');
        }
    }
/* ------------------------------------------------------ *\
 [Methods] addDelegate
\* ------------------------------------------------------ */
    var addDelegatMethods = {
        transitions : function () {
            //addDelegatMethods.delegate();
        },
        delegate : function () {

            var PageTransition = ( function( options ) {
                var prev_slide = 'prev_slide';
                var next_slide = 'next_slide';
                var wrapper = options.wrapper;
                //console.log(options);

                this.transitions = {
                    'next': {
                        'init': options.next_in_transition,
                        'end': options.next_out_transition
                    },
                    'prev': {
                        'init': options.prev_in_transition,
                        'end': options.prev_out_transition
                    }
                }

                this.pages  = $(options.wrapper).children('.et-section');
                this.current_page = this.pages[ (options.init_page ) ];
                $( this.current_page ).addClass('et-page-current');
                $( this.current_page ).prevAll('.et-section').addClass('after');
                $( this.current_page ).nextAll('.et-section').addClass('after');
            });

            PageTransition.prototype.move_to = function( div ){
                var current_page = this.current_page;
                var next_page = div;
                //console.log(current_page);
                //console.log(next_page);

                if( ! $(next_page).hasClass('et-page-current') ){

                    if( $(next_page).hasClass( 'after' ) ) {
                        direction = 'next';
                    } else if( $(next_page).hasClass( 'before' ) ) {
                        direction = 'prev';
                    }

                    if( ! Modernizr.csstransitions) {

                        in_transition = ( direction == 'next' ) ? this.transitions.next.init : this.transitions.prev.init;
                        out_transition = ( direction == 'next' ) ? this.transitions.next.end : this.transitions.prev.end;

                        $('.et-section').removeClass('before after');

                        $( current_page ).removeClass().addClass('item et-section et-page-current '+'pt-page-'+out_transition);
                        $( next_page ).addClass('et-page-current '+'pt-page-'+in_transition).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                            $( current_page ).removeClass().addClass('item et-section');
                            $( next_page ).prevAll('.et-section').addClass('before');
                            $( next_page ).nextAll('.et-section').addClass('after');
                        });
                        this.current_page = next_page;
                        //console.log(this.current_page);

                    } else {

                        $('.et-section').removeClass('before after');
                        $( current_page ).removeClass().addClass('item et-section et-page-current');
                        $( next_page ).addClass('et-page-current').stop().animate({
                            bottom: 0
                        }, 600, 'linear', function(){
                            $( current_page ).removeClass().addClass('item et-section');
                            $( next_page ).prevAll('.et-section').addClass('before');
                            $( next_page ).nextAll('.et-section').addClass('after');
                        });

                        this.current_page = next_page;
                        //console.log(this.current_page);

                    }
                }
            };
            var pages = new PageTransition({
                wrapper:             document.getElementById('catalog-wrapper'),
                init_page:           init_slide_load,

                prev_in_transition:  'moveFromTop',
                prev_out_transition: 'moveToBottom ontop',

                next_in_transition:  'moveFromBottom',
                next_out_transition: 'moveToTop ontop'
            });
            //console.log(pages);

            var init_slide_load = location.hash.slice(1);
            //console.log(location.hash.slice(0));
            //console.log(location.hash);
            $('.catalog_cars_wrapper').find('.catalog_car').each(function( index ) {
                if( $(this).hasClass(init_slide_load) )
                    init_slide_load = index;
                    //console.log(init_slide_load);
            });
            $(domEl.div_recurrent).delegate('a.switch-catalog', 'click', '.catalog_cars_wrapper', function( e ){
                e.preventDefault();
                var car_key = $(this).data('key');
                var slide = $("#catalog-"+ car_key);
                $('.catalog_car').removeClass('active');
                $(this).parent('.catalog_car').addClass('active');
                pages.move_to( slide );
                //console.log(car_key);
                //console.log(slide);
            });
        }
    }
/* ------------------------------------------------------ *\
 [Methods] openPanelMenu
\* ------------------------------------------------------ */
    var openPanelMenuMethods = {
        clickPanel_general : function (event) {
            openPanelMenuMethods.animatePanelMenu();
            if ($(this).hasClass('active')) {
                $('a.expand-header').removeClass('active');
                $(domEl.div_header_panel).removeClass('header_panel_active');
            } else {
                $('a.expand-header').removeClass('active');
                $(domEl.div_header_panel).addClass('header_panel_active');
                $(this).addClass('active');
            }
        },
        clickModelsPanel : function (event) {
            /*if ($(this).hasClass('active')) {
                var sukModelData;
                $('#header-spacer').css('height','325px');
                $('.header_section').css({
                    'display':'block',
                    'opacity':'1'
                });
                sukModelData = SUK.getInternalJSON(urlsApi.addGamaModelos);
                SUK.loadTemplate(tempsNames.tmp_panel_menu_models, domEl.div_recurrent_panel_menu, sukModelData);
            } else {
                $('#header-spacer').css('height','0px');
                $('.header_section').css({
                    'display':'none',
                    'opacity':'0'
                });
                SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            }*/
            closePanelMenuMethods.closePanelFinancing();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/modelos');
        },
        clickFinnacingPanel : function (event) {
            /*if ($(this).hasClass('active')) {
                $('#header-spacer').css('height','426px');
                $('.header_section').css({
                    'display':'block',
                    'opacity':'1'
                });
                SUK.loadTemplate(tempsNames.tmp_panel_menu_financing, domEl.div_recurrent_panel_menu);
            } else {
                $('#header-spacer').css('height','0px');
                $('.header_section').css({
                    'display':'none',
                    'opacity':'0'
                });
                SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            }*/
            closePanelMenuMethods.closePanelFinancing();
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento');
        },
        clickOwnersPanel : function (event) {
            if ($(this).hasClass('active')) {
                $('#header-spacer').css('height','340px');
                $('.header_section').css({
                    'display':'block',
                    'opacity':'1'
                });
                SUK.loadTemplate(tempsNames.tmp_panel_menu_owners, domEl.div_recurrent_panel_menu);
            } else {
                $('#header-spacer').css('height','0px');
                $('.header_section').css({
                    'display':'none',
                    'opacity':'0'
                });
                SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            }
        },
        clickBeforeByPanel : function (event) {
            if ($(this).hasClass('active')) {
                $('#header-spacer').css('height','419px');
                $('.header_section').css({
                    'display':'block',
                    'opacity':'1'
                });
                SUK.loadTemplate(tempsNames.tmp_panel_menu_before_buy, domEl.div_recurrent_panel_menu);
            } else {
                $('#header-spacer').css('height','0px');
                $('.header_section').css({
                    'display':'none',
                    'opacity':'0'
                });
                SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            }
        },
        animatePanelMenu : function () {
            $(domEl.div_recurrent_panel_menu).stop().hide().fadeIn();
        }
    }
/* ------------------------------------------------------ *\
 [Methods] closePanelMenu
\* ------------------------------------------------------ */
    var closePanelMenuMethods = {
        cleanHeight : function () {
            $('#header-spacer').css('height','0px');
        },
        closePanelModels : function (event) {
            $(domEl.action_model_expand_header).removeClass('active');
            $(domEl.div_header_panel).removeClass('header_panel_active');
            SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            closePanelMenuMethods.cleanHeight();
        },
        closePanelFinancing : function (event) {
            $(domEl.action_financing_expand_header).removeClass('active');
            $(domEl.div_header_panel).removeClass('header_panel_active');
            SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            closePanelMenuMethods.cleanHeight();
        },
        closePanelOwners : function (event) {
            $(domEl.action_owners_expand_header).removeClass('active');
            $(domEl.div_header_panel).removeClass('header_panel_active');
            SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            closePanelMenuMethods.cleanHeight();
        },
        closePanelBeforeBuy : function (event) {
            $(domEl.action_before_buy_expand_header).removeClass('active');
            $(domEl.div_header_panel).removeClass('header_panel_active');
            SUK.setHTML(domEl.div_recurrent_panel_menu, '');
            closePanelMenuMethods.cleanHeight();
        }
    }
/* ------------------------------------------------------ *\
 [Methods] panelMenuModels
\* ------------------------------------------------------ */
    var panelMenuModelsByModel = {
        clickGoSwiftSport : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/swift-sport');
        },
        clickGoSwift : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/swift');
        },
        clickGoSx4Crossover : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/sx4-crossover');
        },
        clickGoSx4Sedan : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/sx4-sedan');
        },
        clickGoKizashi : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/kizashi');
        },
        clickGoGrandVitara : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/grand-vitara');
        },
        clickGoSCross : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/s-cross');
        },
        clickGoCiaz : function (event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            closePanelMenuMethods.closePanelModels();
            Finch.navigate('/ciaz');
        }
    }
/* ------------------------------------------------------ *\
 [Functions] display_versions_comparative
\* ------------------------------------------------------ */
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
/* ------------------------------------------------------ *\
 [Methods] FancyBox
\* ------------------------------------------------------ */
    var fancyBoxMethods = {
        onClickGalery: function(event) {
            event.preventDefault();
            var url = $(this).attr('href').trim();
            $('a.fancybox-thumbs').each(function(){
                var u = $(this).attr('href');
                if( u.trim() == url ){
                    $(this).trigger('click');
                    return false;
                }
            });
        }
    }
/* ------------------------------------------------------ *\
 [Methods] modelsMenu
\* ------------------------------------------------------ */
    var modelsMenuMethods = {
        preventDefault_flag_link: function(event) {
            event.preventDefault();
            $.scroll_to( 'prueba-de-manejo' );
        },
        preventDefault_test_drive: function(event) {
            event.preventDefault();
            $.scroll_to( 'prueba-de-manejo' );
        },
        preventDefault_accesories:  function(event) {
            event.preventDefault();
            $.scroll_to( 'accesorios' );
        },
        preventDefault_galery:  function(event) {
            event.preventDefault();
            $.scroll_to( 'galeria' );
        },
        preventDefault_prices:  function(event) {
            event.preventDefault();
            $.scroll_to( 'precios' );
        },
        preventDefault_characterics:  function(event) {
            event.preventDefault();
            $.scroll_to( 'caracteristicas' );
        },
        preventDefault_class_top:  function(event) {
            event.preventDefault();
            $.scroll_to( 'inicio' );
        },
        preventDefault_id_top:  function(event) {
            event.preventDefault();
            $.scroll_to( 'inicio' );
        },
        preventDefaultSwapDisplayTables: function(event) {
            e.preventDefault();
            display_vct_class = $(this).data('display-table');
            $.scroll_to('precios');
            var timeout = setTimeout(function(){
                display_versions_comparative();
            }, 900 );
        },
        carComparativeCol_close: function(event) {
            $parent = $(this).parent().parent().parent().parent().parent().parent();
            $parent.hide();
            $('#car-comparative-list').fadeIn();
            //.car-comparative-col
        },
        carComparativeList_open: function(event) {
            event.preventDefault();
            var id = $(this).data('id'),
                $element = $('#'+id);
            $element.fadeIn();
            $(".car-comparative-col").each(function (index, Element) {
                //$(this).find(".row").eq(5).css("height", 60);
            });
            $('#car-comparative-list').hide();
            //.car-comparative-col
        },
        car_next_step : function() {
            if( $('.car-next-step').length > 0 ){
                var $arrow1 = $('.car-next-step').children('a'),
                    $arrow2 = $arrow1.clone();
                $('.car-next-step').append( $arrow2 ).delegate('a','mousedown mouseup click', function( e ){
                    e.preventDefault();
                    $.scroll_to('caracteristicas');
                });
                $.animate_arrow( $arrow2 )
            }
        },
        changeNameModel : function (menu) {
            var car_main_model;
            switch (section) {
                case 'swift-sport':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('swift-sport');
                    $('.car').addClass('swift-sport');
                    $('.secondary-title.thumb-name').append('Swift Sport');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");


                    input_hidden_test_drive_swift_sport_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'swift-sport'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_swift_sport_Attributes);
                    //console.log(input_hidden_test_drive_swift_sport_Attributes);
                break;
                case 'swift':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('swift');
                    $('.car').addClass('swift');
                    $('.secondary-title.thumb-name').append('Swift');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_swift_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'swift'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_swift_Attributes);
                    //console.log(input_hidden_test_drive_swift_Attributes);
                break;
                case 'sx4-crossover':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('sx4-crossover');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_sx4_crossover_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'sx4-crossover'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_sx4_crossover_Attributes);
                    //console.log(input_hidden_test_drive_sx4_crossover_Attributes);
                break;
                case 'sx4-sedan':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('sx4-sedan');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_sx4_sedan_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'sx4-sedan'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_sx4_sedan_Attributes);
                    //console.log(input_hidden_test_drive_sx4_sedan_Attributes);
                break;
                case 'kizashi':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('kizashi');
                    $('.car').addClass('kizashi');
                    $('.secondary-title.thumb-name').append('Kizashi');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_kizashi_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'kizashi'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_kizashi_Attributes);
                    //console.log(input_hidden_test_drive_kizashi_Attributes);
                break;
                case 'grand-vitara':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('grand-vitara');
                    $('.car').addClass('grand-vitara');
                    $('.secondary-title.thumb-name').append('Grand Vitara');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_grand_vitara_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'grand-vitara'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_grand_vitara_Attributes);
                    //console.log(input_hidden_test_drive_grand_vitara_Attributes);
                break;
                case 's-cross':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('s-cross');
                    $('.car').addClass('s-cross');
                    $('.secondary-title.thumb-name').append('S-Cross');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_s_cross_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'s-cross'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_s_cross_Attributes);
                    //console.log(input_hidden_test_drive_s_cross_Attributes);
                break;
                case 'ciaz':
                    $("#versions-price-table").find(".pdf-download:gt(2)").css("visibility", "hidden");
                    $('#change-model').addClass('ciaz');
                    $('.car').addClass('ciaz');
                    $('.secondary-title.thumb-name').append('Ciaz');
                    modelsMenuMethods.car_next_step();
                    $('#model-section-arrow').hide();
                    $('#back-to-top-button').hide();
                    modelsMenuMethods.scrollSwitchMethod();
                    switch_menus( menu );
                    switch_arrow( );
                    display_versions_comparative();
                    modifyHeight("#features-space-wrapper .suzuki-table .body .row");

                    input_hidden_test_drive_ciaz_Attributes = [
                        ['input', {'id':'test_drive_model_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_modelo', 'value':'ciaz'}, '', 0],
                        ['input', {'id':'test_drive_model_concesionaria', 'type':'hidden', 'name':'suk_gdl_test_drive_model_concesionaria', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'id':'test_drive_model_image_modelo', 'type':'hidden', 'name':'suk_gdl_test_drive_model_image_modelo', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_subscription', 'type':'hidden', 'name':'suk_gdl_test_drive_model_subscription', 'value':''}, '', 0],
                        ['input', {'id':'test_drive_model_auto', 'type':'hidden', 'name':'suk_gdl_test_drive_model_auto', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#fields_hidden', input_hidden_test_drive_ciaz_Attributes);
                    //console.log(input_hidden_test_drive_ciaz_Attributes);
                break;
                case 'financing':
                    hidden_elements_funding_general_elements = [
                        ['input', {'type':'hidden', 'class':'fr_data', 'name':'suk_gdl_financing_general_model_car', 'id':'financing_general_model_car', 'value':'Swift Sport 2015'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_data-key', 'name':'suk_gdl_financing_general_model_key', 'id':'financing_general_model_key', 'value':'swift-sport'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_data-car-version', 'name':'suk_gdl_financing_general_model_car_verison', 'id':'financing_general_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_price', 'name':'suk_gdl_financing_general_car_price', 'id':'financing_general_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_engagement', 'name':'suk_gdl_financing_general_car_engagement', 'id':'financing_general_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_monthly_payment', 'name':'suk_gdl_financing_general_car_monthly_payment', 'id':'financing_general_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_months', 'name':'suk_gdl_financing_general_car_months', 'id':'financing_general_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_concesionarie', 'name':'suk_gdl_financing_general_concesionarie', 'id':'financing_general_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_image_model', 'name':'suk_gdl_financing_general_image_model', 'id':'financing_general_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_subscription', 'name':'suk_gdl_financing_general_subscription', 'id':'financing_general_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_general_elements);
                break;
                case 'financing_swift_sport':
                    $('#promocion-financing_by_model').addClass('swift-sport-bg');
                    $('.description_title').append(' Swift Sport 2015');
                    hidden_elements_funding_by_model_elements = [
                        ['input', {'type':'hidden', 'class':'fr_bm_data', 'name':'suk_gdl_financing_by_model_model_car', 'id':'financing_by_model_model_car', 'value':'Swift Sport 2015'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-key', 'name':'suk_gdl_financing_by_model_model_key', 'id':'financing_by_model_model_key', 'value':'swift-sport'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-car-version', 'name':'suk_gdl_financing_by_model_model_car_verison', 'id':'financing_by_model_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_price', 'name':'suk_gdl_financing_by_model_car_price', 'id':'financing_by_model_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_engagement', 'name':'suk_gdl_financing_by_model_car_engagement', 'id':'financing_by_model_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_monthly_payment', 'name':'suk_gdl_financing_by_model_car_monthly_payment', 'id':'financing_by_model_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_months', 'name':'suk_gdl_financing_by_model_car_months', 'id':'financing_by_model_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_concesionarie', 'name':'suk_gdl_financing_by_model_concesionarie', 'id':'financing_by_model_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_image_model', 'name':'suk_gdl_financing_by_model_image_model', 'id':'financing_by_model_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_subscription', 'name':'suk_gdl_financing_by_model_subscription', 'id':'financing_by_model_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_by_model_elements);
                break;
                case 'financing_swift':
                    $('#promocion-financing_by_model').addClass('swift-bg');
                    $('.description_title').append(' Swift 2015');
                    hidden_elements_funding_by_model_elements = [
                        ['input', {'type':'hidden', 'class':'fr_bm_data', 'name':'suk_gdl_financing_by_model_model_car', 'id':'financing_by_model_model_car', 'value':'Swift 2015'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-key', 'name':'suk_gdl_financing_by_model_model_key', 'id':'financing_by_model_model_key', 'value':'swift'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-car-version', 'name':'suk_gdl_financing_by_model_model_car_verison', 'id':'financing_by_model_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_price', 'name':'suk_gdl_financing_by_model_car_price', 'id':'financing_by_model_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_engagement', 'name':'suk_gdl_financing_by_model_car_engagement', 'id':'financing_by_model_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_monthly_payment', 'name':'suk_gdl_financing_by_model_car_monthly_payment', 'id':'financing_by_model_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_months', 'name':'suk_gdl_financing_by_model_car_months', 'id':'financing_by_model_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_concesionarie', 'name':'suk_gdl_financing_by_model_concesionarie', 'id':'financing_by_model_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_image_model', 'name':'suk_gdl_financing_by_model_image_model', 'id':'financing_by_model_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_subscription', 'name':'suk_gdl_financing_by_model_subscription', 'id':'financing_by_model_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_by_model_elements);
                break;
                case 'financing_kizashi':
                    $('#promocion-financing_by_model').addClass('kizashi-bg');
                    $('.description_title').append(' Kizashi');
                    hidden_elements_funding_by_model_elements = [
                        ['input', {'type':'hidden', 'class':'fr_bm_data', 'name':'suk_gdl_financing_by_model_model_car', 'id':'financing_by_model_model_car', 'value':'Kizashi 2015'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-key', 'name':'suk_gdl_financing_by_model_model_key', 'id':'financing_by_model_model_key', 'value':'kizashi'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-car-version', 'name':'suk_gdl_financing_by_model_model_car_verison', 'id':'financing_by_model_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_price', 'name':'suk_gdl_financing_by_model_car_price', 'id':'financing_by_model_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_engagement', 'name':'suk_gdl_financing_by_model_car_engagement', 'id':'financing_by_model_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_monthly_payment', 'name':'suk_gdl_financing_by_model_car_monthly_payment', 'id':'financing_by_model_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_months', 'name':'suk_gdl_financing_by_model_car_months', 'id':'financing_by_model_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_concesionarie', 'name':'suk_gdl_financing_by_model_concesionarie', 'id':'financing_by_model_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_image_model', 'name':'suk_gdl_financing_by_model_image_model', 'id':'financing_by_model_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_subscription', 'name':'suk_gdl_financing_by_model_subscription', 'id':'financing_by_model_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_by_model_elements);
                break;
                case 'financing_grand_vitara':
                    $('#promocion-financing_by_model').addClass('grand-vitara-bg');
                    $('.description_title').append(' Grand Vitara 2015');
                    hidden_elements_funding_by_model_elements = [
                        ['input', {'type':'hidden', 'class':'fr_bm_data', 'name':'suk_gdl_financing_by_model_model_car', 'id':'financing_by_model_model_car', 'value':'Grand Vitara 2015'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-key', 'name':'suk_gdl_financing_by_model_model_key', 'id':'financing_by_model_model_key', 'value':'grand-vitara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-car-version', 'name':'suk_gdl_financing_by_model_model_car_verison', 'id':'financing_by_model_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_price', 'name':'suk_gdl_financing_by_model_car_price', 'id':'financing_by_model_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_engagement', 'name':'suk_gdl_financing_by_model_car_engagement', 'id':'financing_by_model_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_monthly_payment', 'name':'suk_gdl_financing_by_model_car_monthly_payment', 'id':'financing_by_model_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_months', 'name':'suk_gdl_financing_by_model_car_months', 'id':'financing_by_model_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_concesionarie', 'name':'suk_gdl_financing_by_model_concesionarie', 'id':'financing_by_model_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_image_model', 'name':'suk_gdl_financing_by_model_image_model', 'id':'financing_by_model_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_subscription', 'name':'suk_gdl_financing_by_model_subscription', 'id':'financing_by_model_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_by_model_elements);
                break;
                case 'financing_scross':
                    $('#promocion-financing_by_model').addClass('s-cross-bg');
                    $('.description_title').append(' S-Cross 2015');
                    hidden_elements_funding_by_model_elements = [
                        ['input', {'type':'hidden', 'class':'fr_bm_data', 'name':'suk_gdl_financing_by_model_model_car', 'id':'financing_by_model_model_car', 'value':'S-Cross 2015'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-key', 'name':'suk_gdl_financing_by_model_model_key', 'id':'financing_by_model_model_key', 'value':'s-cross'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-car-version', 'name':'suk_gdl_financing_by_model_model_car_verison', 'id':'financing_by_model_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_price', 'name':'suk_gdl_financing_by_model_car_price', 'id':'financing_by_model_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_engagement', 'name':'suk_gdl_financing_by_model_car_engagement', 'id':'financing_by_model_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_monthly_payment', 'name':'suk_gdl_financing_by_model_car_monthly_payment', 'id':'financing_by_model_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_months', 'name':'suk_gdl_financing_by_model_car_months', 'id':'financing_by_model_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_concesionarie', 'name':'suk_gdl_financing_by_model_concesionarie', 'id':'financing_by_model_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_image_model', 'name':'suk_gdl_financing_by_model_image_model', 'id':'financing_by_model_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_subscription', 'name':'suk_gdl_financing_by_model_subscription', 'id':'financing_by_model_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_by_model_elements);
                break;
                case 'financing_ciaz':
                    $('#promocion-financing_by_model').addClass('ciaz-bg');
                    $('.description_title').append(' Ciaz 2016');
                    hidden_elements_funding_by_model_elements = [
                        ['input', {'type':'hidden', 'class':'fr_bm_data', 'name':'suk_gdl_financing_by_model_model_car', 'id':'financing_by_model_model_car', 'value':'Ciaz 2016'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-key', 'name':'suk_gdl_financing_by_model_model_key', 'id':'financing_by_model_model_key', 'value':'ciaz'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_data-car-version', 'name':'suk_gdl_financing_by_model_model_car_verison', 'id':'financing_by_model_model_car_verison', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_price', 'name':'suk_gdl_financing_by_model_car_price', 'id':'financing_by_model_car_price', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_engagement', 'name':'suk_gdl_financing_by_model_car_engagement', 'id':'financing_by_model_car_engagement', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_monthly_payment', 'name':'suk_gdl_financing_by_model_car_monthly_payment', 'id':'financing_by_model_car_monthly_payment', 'value':'$ 0.00'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_months', 'name':'suk_gdl_financing_by_model_car_months', 'id':'financing_by_model_car_months', 'value':'0 meses'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_concesionarie', 'name':'suk_gdl_financing_by_model_concesionarie', 'id':'financing_by_model_concesionarie', 'value':'Suzuki Autos Guadalajara'}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_image_model', 'name':'suk_gdl_financing_by_model_image_model', 'id':'financing_by_model_image_model', 'value':''}, '', 0],
                        ['input', {'type':'hidden', 'class':'fr_bm_subscription', 'name':'suk_gdl_financing_by_model_subscription', 'id':'financing_by_model_subscription', 'value':''}, '', 0]
                    ];
                    SUK.appendMulti('#funding_fields_hidden', hidden_elements_funding_by_model_elements);
                break;
                default:
                break;
            }
        },
        scrollSwitchMethod : function() {
            $('#suk_gdl_test_drive_date').datepicker({
                minDate: '+1d',
                maxDate: '+1m',
                minLength: 0,
                delay: 0,
                dateFormat: 'yy-mm-dd'
            });
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
        }
    }
/* ------------------------------------------------------ *\
 [Methods] inputVal
\* ------------------------------------------------------ */
    var inputValMetdods = {
        isIntegerKP: function (event) {
            return /\d/.test(String.fromCharCode(event.keyCode));
        }
    }
/* ------------------------------------------------------ *\
 [Methods] validations_regexp
\* ------------------------------------------------------ */
    var validations_regexp = {
        address : new RegExp( /^[a-zá-úüñ,#0-9. -]{2,}$/i ),
        date    : new RegExp( /^(\d{4})-(\d{1,2})-(\d{1,2})$/ ),
        email   : new RegExp( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ),
        name    : new RegExp( /^[a-zá-úüñ. ]{2,}$/i ),
        phone   : new RegExp( /^[0-9\s\-]{7,13}$/ )
    }
/* ------------------------------------------------------ *\
 [Methods] validation_messages
\* ------------------------------------------------------ */
    var validation_messages = {
        date            : 'Debe ser aaaa-mm-dd',
        date_tomorrow   : 'Sólo a partir de mañana',
        email           : 'Verifica tu correo',
        general         : 'Campo no válido',
        not_config      : 'Tipo desconocido',
        not_null        : 'No puede ser nulo',
        phone           : 'Verifica que tu número sea de 10 dígitos',
        required        : 'Campo requerido',
        empty           : 'Campo vacío'
    }
/* ------------------------------------------------------ *\
 [Methods] validate
\* ------------------------------------------------------ */
    var validateMethods = {
        validate : function(value, rules, required, custom_message) {
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
        },
        //Display Input errors
        error_bubble : function( $label, show, message ){
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
        },
        validate_input : function(event) {
            var target = $(event.target);
            //console.log(target);
            if( target.is('input') || target.is('textarea') ){
                var valid_data = target.data('validation-data');
                var val_data    = valid_data.split('|'),
                    required    = val_data.indexOf('required');
                if( required >= 0 ){
                    val_data.splice(required, 1);
                }
                var value = target.val(),
                    validation = validateMethods.validate( value, val_data, ( required >= 0 )  );
                validateMethods.error_bubble( target, !validation.valid, validation.message );
                return validation.valid;
            }else{
                var is_valid = !( target.val() === null );
                validateMethods.error_bubble( target, !is_valid, validation_messages.required );
                return is_valid;
            }
        }
    }
/* ------------------------------------------------------ *\
 [Methods] formTestDrive general
\* ------------------------------------------------------ */
/* ------------------------------------------------------ *\
 [Methods] formTestDrive
\* ------------------------------------------------------ */
    var formTestDriveMethods = {
        init_datepicker: function() {
            $('#test_drive_model_date').datepicker({
                minDate: '+1d',
                maxDate: '+1m',
                minLength: 0,
                delay: 0,
                dateFormat: 'yy-mm-dd'
            });
        },
        addDataFormTestDrive: function() {
            var dataFormTestDriveModel;
            dataFormTestDriveModel = $('#test_drive').serializeFormJSON();

            dataFormTestDriveModel['suk_gdl_test_drive_model_newsletter'] = (dataFormTestDriveModel['suk_gdl_test_drive_model_newsletter'] == 'on')
                ? dataFormTestDriveModel['suk_gdl_test_drive_model_newsletter'] : 'off';

            //console.log(dataFormTestDriveModel);
            //console.log(dataFormTestDriveModel['suk_gdl_test_drive_model_newsletter']);

            return SUK.postalService(urlsApi.sendTestDriveModel, dataFormTestDriveModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormTestDriveModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_test_drive_model_date',
                'suk_gdl_test_drive_model_name',
                'suk_gdl_test_drive_model_lastname',
                'suk_gdl_test_drive_model_email',
                'suk_gdl_test_drive_model_tel'
            ];
            dataFormTestDriveModel = $('#test_drive').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormTestDriveModel, validFieldItems);
            $('#suk_test_dirve_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormTestDriveModel, validFieldItems);
            $('#suk_test_dirve_model_submit').attr('disabled', isEmpty);*/

            //console.log($('#test_drive').serializeFormJSON());
        },
        refreshForm: function() {
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            formTestDriveMethods.init_datepicker();
            modelsMenuMethods.changeNameModel();
            $('#suk_test_dirve_model_submit').attr('disabled', true);
            //console.log('entra form-contact');
        },
        resetForm: function() {
            SUK.resetForm('#test_drive');
            formTestDriveMethods.init_datepicker();
            $('#suk_test_dirve_model_submit').attr('disabled', true);
            //console.log('entra form-contact');
        },
        reset_pre_loader: function() {
            SUK.setHTML('.form-loader', '');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formTestDriveMethods.fillingControl();
        },
        sendTestDriveForm: function(event) {
            formTestDriveMethods.fillingControl();
            var $test_drive_model_date           = $('#test_drive_model_date'),
                $test_drive_model_name           = $('#test_drive_model_name'),
                $test_drive_model_lastname       = $('#test_drive_model_lastname'),
                $test_drive_model_email          = $('#test_drive_model_email'),
                $test_drive_model_tel            = $('#test_drive_model_tel');

            val_news = SUK.getValue('#test_drive_model_newsletter');
            val_auto = SUK.getValue('#test_drive_model_modelo');
            current_car = SUK.getValue('#test_drive_model_modelo');
            selected_concessionaire = SUK.getValue('#test_drive_model_concesionaria');

            SUK.setValue('#test_drive_model_image_modelo', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#test_drive_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#test_drive_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $test_drive_model_date ) ){
                form_errors++;
                $test_drive_model_date.change();
            }
            if( validateMethods.validate_input( $test_drive_model_name ) ){
                form_errors++;
                $test_drive_model_name.focusout();
            }
            if( validateMethods.validate_input( $test_drive_model_lastname ) ){
                form_errors++;
                $test_drive_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $test_drive_model_email ) ){
                form_errors++;
                $test_drive_model_email.focusout();
            }
            if( validateMethods.validate_input( $test_drive_model_tel ) ){
                form_errors++;
                $test_drive_model_tel.focusout();
            }
            if ( form_errors != 0 ) {
                var data = {
                    car_key         : current_car,
                    concessionaire  : selected_concessionaire,
                    date            : $test_drive_model_date.val(),
                    email           : $test_drive_model_email.val(),
                    name            : $test_drive_model_name.val(),
                    lastname        : $test_drive_model_lastname.val(),
                    newsletter      : $('#test_drive_model_newsletter:checked').length,
                    phone           : $test_drive_model_tel.val(),
                    source          : 'Model ' + current_car
                }
                var precio_actual = showMeTheMoney(current_car),
                    precio_cal = 0.071 * precio_actual,
                    precio_total = moneyFormat( precio_cal );

                analytics_test_drive( 'Modelos: ' + current_car , precio_cal );
                var cd = selected_concessionaire;

                $('#step-2-concessionaire-final').html( cd );
                $('#step-2-mail-final').html( data.email );

                $('#step-2-form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var testDriveModelPromise = formTestDriveMethods.addDataFormTestDrive();

                        testDriveModelPromise.success(function (data) {
                            //console.log('Datos Enviados');
                        });
                        testDriveModelPromise.error(function (data) {
                            formTestDriveMethods.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 1000);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#step-2-form').hide();
                        $('#step-2-final').hide().fadeIn();
                    }, 3000);
                });

                //console.log(data);
                //console.log(moneyFormat(precio_actual));
                //console.log(cd);

            }
        }
    }
/* ------------------------------------------------------ *\
 [Methods] formContact
\* ------------------------------------------------------ */
    var formContactMethods = {
        addDataFormContact: function() {
            var dataFormContact;
            dataFormContact = $('#form-contact').serializeFormJSON();

            dataFormContact['suk_gdl_contact_news'] = (dataFormContact['suk_gdl_contact_news'] == 'on')
                ? dataFormContact['suk_gdl_contact_news'] : 'off';

            //console.log(dataFormContact);
            //console.log(dataFormContact['suk_gdl_contact_news']);

            return SUK.postalService(urlsApi.sendContact, dataFormContact);
        },
        fillingControl: function() {
            var validFieldItems, dataFormContact, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_contact_name', 'suk_gdl_contact_lastname',
                'suk_gdl_contact_email', 'suk_gdl_contact_department',
                'suk_gdl_contact_car', 'suk_gdl_contact_message'
            ];

            dataFormContact = $('#form-contact').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormContact, validFieldItems);
            $('#suk_contact_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormContact, validFieldItems);
            $('#suk_contact_submit').attr('disabled', isEmpty);*/

            //console.log($('#form-contact').serializeFormJSON());
        },
        refreshForm : function() {
            SUK.loadTemplate(tempsNames.tmp_form_contact, domEl.div_content_section_form_contact);
            $('.seleccionar').chosen();
            $('#contact-newsletter').attr('checked', true);
            $('#suk_contact_submit').attr('disabled', true);
            //console.log('entra form-contact');
        },
        resetForm : function() {
            SUK.resetForm('#form-contact');
            $('.seleccionar').chosen();
            $('#contact-newsletter').attr('checked', true);
            $('#suk_contact_submit').attr('disabled', true);
            //console.log('refresca todo');
        },
        reset_pre_loader: function() {
            SUK.setHTML('.form-loader', '');
        },
        finchNavigateReturn: function() {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formContactMethods.fillingControl();
        },
        validate_fields_change: function() {
            formContactMethods.fillingControl();
        },
        sendContactForm : function(event) {
            formContactMethods.fillingControl();
            var $contact_message    = $('#contact_message'),
                $contact_car_key    = $('#contact_car_key'),
                $contact_department = $('#contact_department'),
                $contact_email      = $('#contact_email'),
                $contact_name       = $('#contact_name'),
                $contact_lastname   = $('#contact_lastname'),
                $contact_newsletter = $('#contact-newsletter');

            val_department = SUK.getValue('#contact_department');
            val_auto = SUK.getValue('#contact_car_key');
            val_news = SUK.getValue('#contact-newsletter');

            SUK.setValue('#contact_depto', val_department);
            SUK.setValue('#contact_auto', val_auto);
            SUK.setValue('#contact_image_modelo', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#contact_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#contact_subscription', val_subscription);
                //console.log(val_subscription);
            }

            $contact_department.chosen();
            $contact_car_key.chosen();

            var form_errors = 0;
            if( validateMethods.validate_input( $contact_message ) ){
                form_errors++;
                $contact_message.focusout();
            }
            if( validateMethods.validate_input( $contact_car_key ) ){
                form_errors++;
                $contact_car_key.change();
            }
            if( validateMethods.validate_input( $contact_department ) ){
                form_errors++;
                $contact_department.change();
            }
            if( validateMethods.validate_input( $contact_email ) ){
                form_errors++;
                $contact_email.focusout();
            }
            if( validateMethods.validate_input( $contact_name ) ){
                form_errors++;
                $contact_name.focusout();
            }
            if( validateMethods.validate_input( $contact_lastname ) ){
                form_errors++;
                $contact_lastname.focusout();
            }
            if( form_errors != 0 ){
                var data = {
                    car_key     : $contact_car_key.val(),
                    department  : $contact_department.val(),
                    email       : $contact_email.val(),
                    message     : $contact_message.val(),
                    name        : $contact_name.val(),
                    lastname    : $contact_lastname.val(),
                    newsletter  : $('#contact-newsletter:checked').length,
                    //newsletter  : $contact_newsletter.is(':checked').length,
                    source      : 'Contacto'
                };
                var contactPromise = formContactMethods.addDataFormContact();

                contactPromise.success(function (data) {
                    //console.log(data);
                    var con_news = $('#contact-newsletter:checked').length;
                    //var con_news = $contact_newsletter.is(':checked').length;
                    var departamento = $contact_department.val();
                    var precio_actual = showMeTheMoney($contact_car_key.val());
                    var news_srt    = con_news ? 'Envio_con_Newsletter' : 'Envio_Sin_Newsletter';
                    var news_val    = con_news ? 600 : 0;
                    var car_val     = departamento === 'ventas' ? precio_actual * 0.03 : 0;
                    //console.log(departamento, precio_actual, news_srt, news_val, car_val);
                    ga('send', 'event', 'Contacto', news_srt, departamento, news_val + car_val );
                    setTimeout(function() {
                        //setTimeout(function () {
                            //$('#form-wrapper').fadeIn( 300 , function(){
                                //$('.form-loader').fadeOut();
                            //});
                        //}, 800);
                        //console.log('Espera');
                        setTimeout(function () {
                            //setTimeout(function () {
                                $('#form-wrapper').fadeOut( 300 , function(){
                                    setTimeout(function () {
                                        $('.form-loader').fadeIn();
                                    }, 300);
                                });
                            //}, 1800);
                            setTimeout(function () {
                                //console.log("Correo Enviado...");
                                setTimeout(function () {
                                    $('#form-wrapper').fadeOut( 300 , function(){
                                        var correo = $("#contact_email").val();
                                        $('#email-from').text(correo);
                                        setTimeout(function () {
                                            $('.form-thanks').fadeIn();
                                        }, 1800);
                                    });
                                    //console.log(data);
                                    setTimeout(function () {
                                        formContactMethods.reset_pre_loader();
                                        formContactMethods.resetForm();
                                        setTimeout(function () {
                                            $('#form-wrapper').fadeIn( 300 , function(){
                                                var correo = $("#contact_email").val();
                                                $('#email-from').text(correo);
                                                $('.form-thanks').fadeOut();
                                            });
                                            setTimeout(function () {
                                                formContactMethods.finchNavigateReturn();
                                            }, 2000);
                                        }, 3400);
                                    }, 1800);
                                }, 1800);
                            }, 1400);
                        }, 300);
                    }, 500);
                });
                contactPromise.error(function (data) {
                    setTimeout(function() {
                        //setTimeout(function () {
                            //$('#form-wrapper').fadeIn( 300 , function(){
                                //$('.form-loader').fadeOut();
                            //});
                        //}, 1800);
                        //console.log('Espera');
                        setTimeout(function () {
                            //setTimeout(function () {
                                $('#form-wrapper').fadeOut( 300 , function(){
                                    setTimeout(function () {
                                        $('.form-loader').fadeIn();
                                    }, 1000);
                                });
                            //}, 1800);
                            setTimeout(function () {
                                //console.log("Correo Enviado...");
                                setTimeout(function () {
                                    $('#form-wrapper').fadeOut( 300 , function(){
                                        setTimeout(function () {
                                            $('.form-error').fadeIn();
                                        }, 1800);
                                    });
                                    //console.log(data);
                                    setTimeout(function () {
                                        formContactMethods.resetForm();
                                        setTimeout(function () {
                                            $('#form-wrapper').fadeIn( 300 , function(){
                                                $('.form-error').fadeOut();
                                            });
                                            setTimeout(function () {
                                                formContactMethods.resetForm();
                                            }, 2000);
                                        }, 3400);
                                    }, 1800);
                                }, 5900);
                            }, 3400);
                        }, 1800);
                    }, 500);
                });

            }
        }
    }
/* ------------------------------------------------------ *\
 [Methods] formFinancing General Models
\* ------------------------------------------------------ */
    var formFinancingGeneral = {
        addDataFormFinancingGeneral: function() {
            var dataFormFinancingGeneral;
            dataFormFinancingGeneral = $('#financing-general').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingGeneral['suk_gdl_financing_general_newsletter'] = (dataFormFinancingGeneral['suk_gdl_financing_general_newsletter'] == 'on')
                ? dataFormFinancingGeneral['suk_gdl_financing_general_newsletter'] : 'off';

            // RADIO
            dataFormFinancingGeneral['suk_gdl_financing_general_drive'] = (dataFormFinancingGeneral['suk_gdl_financing_general_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingGeneral['suk_gdl_financing_general_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingGeneral);
            //console.log(dataFormFinancingGeneral['suk_gdl_financing_general_newsletter']);
            //console.log(dataFormFinancingGeneral['suk_gdl_financing_general_drive']);

            return SUK.postalService(urlsApi.sendFinancingGeneral, dataFormFinancingGeneral);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingGeneralModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_general_name',
                'suk_gdl_financing_general_lastname',
                'suk_gdl_financing_general_email',
                'suk_gdl_financing_general_tel'
            ];
            dataFormFinancingGeneralModel = $('#financing-general').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingGeneralModel, validFieldItems);
            $('#suk_financing_general_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingGeneralModel, validFieldItems);
            $('#suk_financing_general_submit').attr('disabled', isEmpty);*/

            //console.log(dataFormFinancingGeneralModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_general, domEl.div_recurrent_funding_general_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_general_submit').attr('disabled', true);
            //console.log('entra form-financing-general');
        },
        resetForm: function() {
            SUK.resetForm('#financing-general');
            $('#suk_financing_general_submit').attr('disabled', true);
            //console.log('refresh form-financing-general');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingGeneral.fillingControl();
        },
        sendFinancingGeneralForm: function(event) {
            formFinancingGeneral.fillingControl();
            var $financing_general_name     = $('#financing_general_name'),
                $financing_general_lastname = $('#financing_general_lastname'),
                $financing_general_email    = $('#financing_general_email'),
                $financing_general_tel      = $('#financing_general_tel');
            var $financing_general_car_price            = $('#financing_general_car_price'),
                $financing_general_car_engagement       = $('#financing_general_car_engagement'),
                $financing_general_car_monthly_payment  = $('#financing_general_car_monthly_payment'),
                $financing_general_car_months           = $('#financing_general_car_months');
            val_news = SUK.getValue('#financing_general_newsletter');
            val_auto = SUK.getValue('#financing_general_model_key');
            current_car = SUK.getValue('#financing_general_model_key');
            selected_concessionaire = SUK.getValue('#financing_general_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_general_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_general_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_general_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_general_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_general_name ) ){
                form_errors++;
                $financing_general_name.focusout();
            }
            if( validateMethods.validate_input( $financing_general_lastname ) ){
                form_errors++;
                $financing_general_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_general_email ) ){
                form_errors++;
                $financing_general_email.focusout();
            }
            if( validateMethods.validate_input( $financing_general_tel ) ){
                form_errors++;
                $financing_general_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_general_email.val(),
                    price           : $financing_general_car_price.val(),
                    engagement      : $financing_general_car_engagement.val(),
                    monthly_payment : $financing_general_car_monthly_payment.val(),
                    months          : $financing_general_car_months.val(),
                    name            : $financing_general_name.val(),
                    lastname        : $financing_general_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_general_newsletter:checked').length,
                    source          : 'Financiamiento Gama General'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_general_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingGeneralPromise = formFinancingGeneral.addDataFormFinancingGeneral();

                        financingGeneralPromise.success(function (data) {
                            formFinancingGeneral.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingGeneralPromise.error(function (data) {
                            formFinancingGeneral.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });

            }

            //console.log('entra evento');
        }
    }
/* ------------------------------------------------------ *\
 [Methods] formFinancing By Models
\* ------------------------------------------------------ */
    // SWIFT SPORT
    var formFinancingByModelSwiftSport = {
        addDataFormFinancingByModels: function() {
            var dataFormFinancingByModel;
            dataFormFinancingByModel = $('#financing-by-model').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] == 'on')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] : 'off';

            // RADIO
            dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingByModel);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter']);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_drive']);

            return SUK.postalService(urlsApi.sendFinancingByModelSwiftSport, dataFormFinancingByModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingByModelModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_by_model_name',
                'suk_gdl_financing_by_model_lastname',
                'suk_gdl_financing_by_model_email',
                'suk_gdl_financing_by_model_tel'
            ];
            dataFormFinancingByModelModel = $('#financing-by-model').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', isEmpty);*/

            //console.log(dataFormFinancingByModelModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_by_model, domEl.div_recurrent_funding_by_model_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('Financiamiento Swift Sport');
        },
        resetForm: function() {
            SUK.resetForm('#financing-by-model');
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('refresh');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingByModelSwiftSport.fillingControl();
        },
        sendFinancingByModelForm: function(event) {
            formFinancingByModelSwiftSport.fillingControl();
            var $financing_by_model_name     = $('#financing_by_model_name'),
                $financing_by_model_lastname = $('#financing_by_model_lastname'),
                $financing_by_model_email    = $('#financing_by_model_email'),
                $financing_by_model_tel      = $('#financing_by_model_tel');
            var $financing_by_model_car_price            = $('#financing_by_model_car_price'),
                $financing_by_model_car_engagement       = $('#financing_by_model_car_engagement'),
                $financing_by_model_car_monthly_payment  = $('#financing_by_model_car_monthly_payment'),
                $financing_by_model_car_months           = $('#financing_by_model_car_months');
            val_news = SUK.getValue('#financing_by_model_newsletter');
            val_auto = SUK.getValue('#financing_by_model_model_key');
            current_car = SUK.getValue('#financing_by_model_model_key');
            selected_concessionaire = SUK.getValue('#financing_by_model_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_by_model_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_by_model_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_by_model_name ) ){
                form_errors++;
                $financing_by_model_name.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_lastname ) ){
                form_errors++;
                $financing_by_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_email ) ){
                form_errors++;
                $financing_by_model_email.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_tel ) ){
                form_errors++;
                $financing_by_model_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_by_model_email.val(),
                    price           : $financing_by_model_car_price.val(),
                    engagement      : $financing_by_model_car_engagement.val(),
                    monthly_payment : $financing_by_model_car_monthly_payment.val(),
                    months          : $financing_by_model_car_months.val(),
                    name            : $financing_by_model_name.val(),
                    lastname        : $financing_by_model_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_by_model_newsletter:checked').length,
                    source          : 'Financiamiento'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_by_model_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingByModelPromise = formFinancingByModelSwiftSport.addDataFormFinancingByModels();

                        financingByModelPromise.success(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingByModelPromise.error(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });
            }
            //console.log('entra evento');
        }
    }
    // SWIFT
    var formFinancingByModelSwift = {
        addDataFormFinancingByModels: function() {
            var dataFormFinancingByModel;
            dataFormFinancingByModel = $('#financing-by-model').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] == 'on')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] : 'off';

            // RADIO
            dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingByModel);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter']);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_drive']);

            return SUK.postalService(urlsApi.sendFinancingByModelSwift, dataFormFinancingByModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingByModelModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_by_model_name',
                'suk_gdl_financing_by_model_lastname',
                'suk_gdl_financing_by_model_email',
                'suk_gdl_financing_by_model_tel'
            ];
            dataFormFinancingByModelModel = $('#financing-by-model').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', isEmpty);*/

            ////console.log(dataFormFinancingByModelModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_by_model, domEl.div_recurrent_funding_by_model_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('Financiamiento Swift');
        },
        resetForm: function() {
            SUK.resetForm('#financing-by-model');
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('refresh');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingByModelSwiftSport.fillingControl();
        },
        sendFinancingByModelForm: function(event) {
            formFinancingByModelSwiftSport.fillingControl();
            var $financing_by_model_name     = $('#financing_by_model_name'),
                $financing_by_model_lastname = $('#financing_by_model_lastname'),
                $financing_by_model_email    = $('#financing_by_model_email'),
                $financing_by_model_tel      = $('#financing_by_model_tel');
            var $financing_by_model_car_price            = $('#financing_by_model_car_price'),
                $financing_by_model_car_engagement       = $('#financing_by_model_car_engagement'),
                $financing_by_model_car_monthly_payment  = $('#financing_by_model_car_monthly_payment'),
                $financing_by_model_car_months           = $('#financing_by_model_car_months');
            val_news = SUK.getValue('#financing_by_model_newsletter');
            val_auto = SUK.getValue('#financing_by_model_model_key');
            current_car = SUK.getValue('#financing_by_model_model_key');
            selected_concessionaire = SUK.getValue('#financing_by_model_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_by_model_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_by_model_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_by_model_name ) ){
                form_errors++;
                $financing_by_model_name.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_lastname ) ){
                form_errors++;
                $financing_by_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_email ) ){
                form_errors++;
                $financing_by_model_email.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_tel ) ){
                form_errors++;
                $financing_by_model_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_by_model_email.val(),
                    price           : $financing_by_model_car_price.val(),
                    engagement      : $financing_by_model_car_engagement.val(),
                    monthly_payment : $financing_by_model_car_monthly_payment.val(),
                    months          : $financing_by_model_car_months.val(),
                    name            : $financing_by_model_name.val(),
                    lastname        : $financing_by_model_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_by_model_newsletter:checked').length,
                    source          : 'Financiamiento'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_by_model_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingByModelPromise = formFinancingByModelSwiftSport.addDataFormFinancingByModels();

                        financingByModelPromise.success(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingByModelPromise.error(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });
            }
            //console.log('entra evento');
        }
    }
    // Kizashi
    var formFinancingByModelKizashi = {
        addDataFormFinancingByModels: function() {
            var dataFormFinancingByModel;
            dataFormFinancingByModel = $('#financing-by-model').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] == 'on')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] : 'off';

            // RADIO
            dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingByModel);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter']);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_drive']);

            return SUK.postalService(urlsApi.sendFinancingByModelKizashi, dataFormFinancingByModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingByModelModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_by_model_name',
                'suk_gdl_financing_by_model_lastname',
                'suk_gdl_financing_by_model_email',
                'suk_gdl_financing_by_model_tel'
            ];
            dataFormFinancingByModelModel = $('#financing-by-model').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', isEmpty);*/

            ////console.log(dataFormFinancingByModelModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_by_model, domEl.div_recurrent_funding_by_model_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('Financiamiento Kizashi');
        },
        resetForm: function() {
            SUK.resetForm('#financing-by-model');
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('refresh');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingByModelSwiftSport.fillingControl();
        },
        sendFinancingByModelForm: function(event) {
            formFinancingByModelSwiftSport.fillingControl();
            var $financing_by_model_name     = $('#financing_by_model_name'),
                $financing_by_model_lastname = $('#financing_by_model_lastname'),
                $financing_by_model_email    = $('#financing_by_model_email'),
                $financing_by_model_tel      = $('#financing_by_model_tel');
            var $financing_by_model_car_price            = $('#financing_by_model_car_price'),
                $financing_by_model_car_engagement       = $('#financing_by_model_car_engagement'),
                $financing_by_model_car_monthly_payment  = $('#financing_by_model_car_monthly_payment'),
                $financing_by_model_car_months           = $('#financing_by_model_car_months');
            val_news = SUK.getValue('#financing_by_model_newsletter');
            val_auto = SUK.getValue('#financing_by_model_model_key');
            current_car = SUK.getValue('#financing_by_model_model_key');
            selected_concessionaire = SUK.getValue('#financing_by_model_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_by_model_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_by_model_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_by_model_name ) ){
                form_errors++;
                $financing_by_model_name.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_lastname ) ){
                form_errors++;
                $financing_by_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_email ) ){
                form_errors++;
                $financing_by_model_email.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_tel ) ){
                form_errors++;
                $financing_by_model_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_by_model_email.val(),
                    price           : $financing_by_model_car_price.val(),
                    engagement      : $financing_by_model_car_engagement.val(),
                    monthly_payment : $financing_by_model_car_monthly_payment.val(),
                    months          : $financing_by_model_car_months.val(),
                    name            : $financing_by_model_name.val(),
                    lastname        : $financing_by_model_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_by_model_newsletter:checked').length,
                    source          : 'Financiamiento'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_by_model_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingByModelPromise = formFinancingByModelSwiftSport.addDataFormFinancingByModels();

                        financingByModelPromise.success(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingByModelPromise.error(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });
            }
            //console.log('entra evento');
        }
    }
    // Grand Vitara
    var formFinancingByModelGrandVitara = {
        addDataFormFinancingByModels: function() {
            var dataFormFinancingByModel;
            dataFormFinancingByModel = $('#financing-by-model').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] == 'on')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] : 'off';

            // RADIO
            dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingByModel);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter']);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_drive']);

            return SUK.postalService(urlsApi.sendFinancingByModelGrandVitara, dataFormFinancingByModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingByModelModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_by_model_name',
                'suk_gdl_financing_by_model_lastname',
                'suk_gdl_financing_by_model_email',
                'suk_gdl_financing_by_model_tel'
            ];
            dataFormFinancingByModelModel = $('#financing-by-model').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', isEmpty);*/

            ////console.log(dataFormFinancingByModelModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_by_model, domEl.div_recurrent_funding_by_model_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('Financiamiento Grand Vitara');
        },
        resetForm: function() {
            SUK.resetForm('#financing-by-model');
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('refresh');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingByModelSwiftSport.fillingControl();
        },
        sendFinancingByModelForm: function(event) {
            formFinancingByModelSwiftSport.fillingControl();
            var $financing_by_model_name     = $('#financing_by_model_name'),
                $financing_by_model_lastname = $('#financing_by_model_lastname'),
                $financing_by_model_email    = $('#financing_by_model_email'),
                $financing_by_model_tel      = $('#financing_by_model_tel');
            var $financing_by_model_car_price            = $('#financing_by_model_car_price'),
                $financing_by_model_car_engagement       = $('#financing_by_model_car_engagement'),
                $financing_by_model_car_monthly_payment  = $('#financing_by_model_car_monthly_payment'),
                $financing_by_model_car_months           = $('#financing_by_model_car_months');
            val_news = SUK.getValue('#financing_by_model_newsletter');
            val_auto = SUK.getValue('#financing_by_model_model_key');
            current_car = SUK.getValue('#financing_by_model_model_key');
            selected_concessionaire = SUK.getValue('#financing_by_model_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_by_model_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_by_model_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_by_model_name ) ){
                form_errors++;
                $financing_by_model_name.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_lastname ) ){
                form_errors++;
                $financing_by_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_email ) ){
                form_errors++;
                $financing_by_model_email.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_tel ) ){
                form_errors++;
                $financing_by_model_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_by_model_email.val(),
                    price           : $financing_by_model_car_price.val(),
                    engagement      : $financing_by_model_car_engagement.val(),
                    monthly_payment : $financing_by_model_car_monthly_payment.val(),
                    months          : $financing_by_model_car_months.val(),
                    name            : $financing_by_model_name.val(),
                    lastname        : $financing_by_model_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_by_model_newsletter:checked').length,
                    source          : 'Financiamiento'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_by_model_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingByModelPromise = formFinancingByModelSwiftSport.addDataFormFinancingByModels();

                        financingByModelPromise.success(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingByModelPromise.error(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });
            }
            //console.log('entra evento');
        }
    }
    // S-Cross
    var formFinancingByModelSCross = {
        addDataFormFinancingByModels: function() {
            var dataFormFinancingByModel;
            dataFormFinancingByModel = $('#financing-by-model').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] == 'on')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] : 'off';

            // RADIO
            dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingByModel);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter']);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_drive']);

            return SUK.postalService(urlsApi.sendFinancingByModelSCross, dataFormFinancingByModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingByModelModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_by_model_name',
                'suk_gdl_financing_by_model_lastname',
                'suk_gdl_financing_by_model_email',
                'suk_gdl_financing_by_model_tel'
            ];
            dataFormFinancingByModelModel = $('#financing-by-model').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', isEmpty);*/

            ////console.log(dataFormFinancingByModelModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_by_model, domEl.div_recurrent_funding_by_model_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('Financiamiento S-Cross');
        },
        resetForm: function() {
            SUK.resetForm('#financing-by-model');
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('refresh');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingByModelSwiftSport.fillingControl();
        },
        sendFinancingByModelForm: function(event) {
            formFinancingByModelSwiftSport.fillingControl();
            var $financing_by_model_name     = $('#financing_by_model_name'),
                $financing_by_model_lastname = $('#financing_by_model_lastname'),
                $financing_by_model_email    = $('#financing_by_model_email'),
                $financing_by_model_tel      = $('#financing_by_model_tel');
            var $financing_by_model_car_price            = $('#financing_by_model_car_price'),
                $financing_by_model_car_engagement       = $('#financing_by_model_car_engagement'),
                $financing_by_model_car_monthly_payment  = $('#financing_by_model_car_monthly_payment'),
                $financing_by_model_car_months           = $('#financing_by_model_car_months');
            val_news = SUK.getValue('#financing_by_model_newsletter');
            val_auto = SUK.getValue('#financing_by_model_model_key');
            current_car = SUK.getValue('#financing_by_model_model_key');
            selected_concessionaire = SUK.getValue('#financing_by_model_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_by_model_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_by_model_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_by_model_name ) ){
                form_errors++;
                $financing_by_model_name.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_lastname ) ){
                form_errors++;
                $financing_by_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_email ) ){
                form_errors++;
                $financing_by_model_email.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_tel ) ){
                form_errors++;
                $financing_by_model_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_by_model_email.val(),
                    price           : $financing_by_model_car_price.val(),
                    engagement      : $financing_by_model_car_engagement.val(),
                    monthly_payment : $financing_by_model_car_monthly_payment.val(),
                    months          : $financing_by_model_car_months.val(),
                    name            : $financing_by_model_name.val(),
                    lastname        : $financing_by_model_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_by_model_newsletter:checked').length,
                    source          : 'Financiamiento'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_by_model_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingByModelPromise = formFinancingByModelSwiftSport.addDataFormFinancingByModels();

                        financingByModelPromise.success(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingByModelPromise.error(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });
            }
            //console.log('entra evento');
        }
    }
    // Grand Vitara
    var formFinancingByModelCiaz = {
        addDataFormFinancingByModels: function() {
            var dataFormFinancingByModel;
            dataFormFinancingByModel = $('#financing-by-model').serializeFormJSON();

            // CHECKBOX
            dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] == 'on')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter'] : 'off';

            // RADIO
            dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] = (dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] == 'Sí deseas manejarlo')
                ? dataFormFinancingByModel['suk_gdl_financing_by_model_drive'] : 'No deseas manejarlo';

            //console.log(dataFormFinancingByModel);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_newsletter']);
            //console.log(dataFormFinancingByModel['suk_gdl_financing_by_model_drive']);

            return SUK.postalService(urlsApi.sendFinancingByModelCiaz, dataFormFinancingByModel);
        },
        fillingControl: function() {
            var validFieldItems, dataFormFinancingByModelModel, isFull, isNoEmpty;
            validFieldItems = [
                'suk_gdl_financing_by_model_name',
                'suk_gdl_financing_by_model_lastname',
                'suk_gdl_financing_by_model_email',
                'suk_gdl_financing_by_model_tel'
            ];
            dataFormFinancingByModelModel = $('#financing-by-model').serializeFormJSON();

            isFull = SUK.validFormFull(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', !isFull);

            /*isEmpty = SUK.validFormEmpty(dataFormFinancingByModelModel, validFieldItems);
            $('#suk_financing_by_model_submit').attr('disabled', isEmpty);*/

            ////console.log(dataFormFinancingByModelModel);
        },
        refreshFrom: function() {
            SUK.loadTemplate(tempsNames.tmp_form_financing_by_model, domEl.div_recurrent_funding_by_model_form);
            modelsMenuMethods.changeNameModel();
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('Financiamiento Ciaz');
        },
        resetForm: function() {
            SUK.resetForm('#financing-by-model');
            $('#suk_financing_by_model_submit').attr('disabled', true);
            //console.log('refresh');
        },
        finchNavigateReturn: function(event) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/');
        },
        validate_fields_keyup: function() {
            formFinancingByModelSwiftSport.fillingControl();
        },
        sendFinancingByModelForm: function(event) {
            formFinancingByModelSwiftSport.fillingControl();
            var $financing_by_model_name     = $('#financing_by_model_name'),
                $financing_by_model_lastname = $('#financing_by_model_lastname'),
                $financing_by_model_email    = $('#financing_by_model_email'),
                $financing_by_model_tel      = $('#financing_by_model_tel');
            var $financing_by_model_car_price            = $('#financing_by_model_car_price'),
                $financing_by_model_car_engagement       = $('#financing_by_model_car_engagement'),
                $financing_by_model_car_monthly_payment  = $('#financing_by_model_car_monthly_payment'),
                $financing_by_model_car_months           = $('#financing_by_model_car_months');
            val_news = SUK.getValue('#financing_by_model_newsletter');
            val_auto = SUK.getValue('#financing_by_model_model_key');
            current_car = SUK.getValue('#financing_by_model_model_key');
            selected_concessionaire = SUK.getValue('#financing_by_model_concesionarie');

            fu_car_version = fuh_data.car_version;
            SUK.setValue('#financing_by_model_model_car_verison', fu_car_version);
            //console.log(fu_car_version);

            SUK.setValue('#financing_by_model_image_model', 'suzuki_'+val_auto+'.png');

            if (val_news === 'on') {
                val_subscription = 'Activado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            } else {
                val_subscription = 'Desactivado';
                SUK.setValue('#financing_by_model_subscription', val_subscription);
                //console.log(val_subscription);
            }
            var form_errors = 0;
            if( validateMethods.validate_input( $financing_by_model_name ) ){
                form_errors++;
                $financing_by_model_name.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_lastname ) ){
                form_errors++;
                $financing_by_model_lastname.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_email ) ){
                form_errors++;
                $financing_by_model_email.focusout();
            }
            if( validateMethods.validate_input( $financing_by_model_tel ) ){
                form_errors++;
                $financing_by_model_tel.focusout();
            }
            if( form_errors != 0){
                var data = {
                    car_key         : fuh_data.key,
                    car_version     : fu_car_version,
                    email           : $financing_by_model_email.val(),
                    price           : $financing_by_model_car_price.val(),
                    engagement      : $financing_by_model_car_engagement.val(),
                    monthly_payment : $financing_by_model_car_monthly_payment.val(),
                    months          : $financing_by_model_car_months.val(),
                    name            : $financing_by_model_name.val(),
                    lastname        : $financing_by_model_lastname.val(),
                    concessionaire  : selected_concessionaire,
                    newsletter      : ('#financing_by_model_newsletter:checked').length,
                    source          : 'Financiamiento'
                };
                //console.log(data);
                var price_cal = 0.012 * funding_data.price,
                    price_total = moneyFormat( price_cal );

                $('#funding_resume_email').html( data.email );
                $('#header-financiamiento li.step-nav-tabs').addClass( 'disabled' );

                if ($('input[name="suk_gdl_financing_by_model_drive"]:checked').val() == 'Sí deseas manejarlo') {
                    $('#funding_resume_concessionaire').text( selected_concessionaire );
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                } else {
                    ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: ' + fuh_data.key, 0.012 * funding_data.price );
                    //console.log("ga('send', 'event', 'Financiamiento', 'Confirmacion_No_Prueba', 'Financing: '" + fuh_data.key, price_total +")");
                }
                $('#funding_form').fadeOut( 300 , function(){
                    setTimeout(function () {
                        $('.form-loader').fadeIn();
                        var financingByModelPromise = formFinancingByModelSwiftSport.addDataFormFinancingByModels();

                        financingByModelPromise.success(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos Enviados');
                        });
                        financingByModelPromise.error(function (data) {
                            formFinancingByModelSwiftSport.resetForm();
                            //console.log('Datos No Enviados');
                        });
                    }, 100);
                    setTimeout(function () {
                        $('.form-loader').fadeOut();
                        $('#funding_form').hide();
                        $('#funding_resume').fadeIn();
                    }, 3000);
                });
            }
            //console.log('entra evento');
        }
    }
/* ------------------------------------------------------ *\
 [Methods] INPUTS RADIO, CHECKBOX
\* ------------------------------------------------------ */
    var changeInputsMethods = {
        clickChangeCheckbox : function(event) {
            if ($(".label-checkbox").length) {
                $('.label-checkbox input:checked').each(function(){
                    $(this).parent('label').addClass('checkbox-checked');
                });
            }
            if ($(this).is(':checked')) {
                $(this).parent('.label-checkbox').find(':checkbox').attr('checked', true);
                $(this).parent('.label-checkbox').addClass('checkbox-checked');
                $(this).val('on');
                $('#contact_subscription').val('Activado');
                $('#test_drive_model_subscription').val('Activado');
            } else {
                $(this).parent('label').find(':checkbox').attr('checked', false);
                $(this).parent('label').removeClass('checkbox-checked');
                $(this).val('off');
                $('#contact_subscription').val('Desactivado');
                $('#test_drive_model_subscription').val('Desactivado');
            }
        },
        clcikChangeRadio : function(event) {
            if ($(".label-radio").length) {
                $('.label-radio input:checked').each(function(){
                    //$(this).parent('label').addClass('radio-checked');
                });
            }
            if ($(this).hasClass('radio-checked')) {
                $(this).find(':radio').attr('checked', true);
                $(this).addClass("radio-checked");
            } else {
                $(".label-radio").removeClass("radio-checked");
                $(".label-radio").find(':radio').attr('checked', false);
                $(this).find(':radio').attr('checked', true);
                $(this).addClass("radio-checked");
            }
        }
    }
/* ------------------------------------------------------ *\
 [Methods] IS MOBILE
\* ------------------------------------------------------ */
    var is_mobileMethods = {
        openCloseMenu : function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                $("body").toggleClass("open-body");
                $("#mobile-menu").toggleClass("open-mobile-menu");
                is_mobileMethods.checkMenu();
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        checkMenu : function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                if ($("#mobile-menu").hasClass("open-mobile-menu") && window.orientation == 0) {
                    $("body").css("overflow", "hidden");
                }
                else {
                    $("body").css("overflow", "visible");
                }
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        adEventListener : function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                if (window.addEventListener){
                    window.addEventListener('orientationchange', is_mobileMethods.checkMenu, false);
                } else if (window.attachEvent){
                    window.attachEvent('orientationchange', is_mobileMethods.checkMenu);
                }
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        clickHeaderMobile : function(event) {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                $(this).toggleClass("header-mobile-icon-active");
                is_mobileMethods.openCloseMenu();
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        clickMobileMenuLink : function(event) {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                var idx = $(this).parent().index();
                var link = "";
                switch (idx) {
                    case 1:
                        link = "#header-models-button";
                        break;
                    case 2:
                        link = "#header-financing-button";
                        break;
                    case 3:
                        link = "#header-owners-button";
                        break;
                    case 4:
                        link = "#header-before-buy-button";
                        break;
                    case 5:
                        link = "#header-test-drive-button";
                        break;
                }
                is_mobileMethods.openCloseMenu();
                $(link).trigger("click");
                $("#header-mobile i").removeClass("header-mobile-icon-active");
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        clickFooterContent : function(event) {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                $(".footer-column .links").slideUp();
                $(".footer-column i").removeClass("fa-minus").addClass("fa-plus");
                if ($(this).find(".links").css("display") != "block") {
                    $(this).find(".links").slideDown();
                    $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
                }
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        clickHeaderColumn : function(event) {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                if (!$(this).hasClass("header-column-open")) {
                    $('html, body').animate({scrollTop: '0px'}, 400);
                    $(".header-links-list").addClass("header-links-open");
                    $(this).siblings().hide();
                    $(this).addClass("header-column-open");
                    $(this).find("ul").fadeIn();
                }
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        clickBackListArrow : function(event) {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                var header_column_open = $(".header-column-open");
                $(".header-links-list").removeClass("header-links-open");
                header_column_open.removeClass("header-column-open");
                $(".links-list").hide();
                $(".header-column").fadeIn();
            } else {
                //console.log('You are not using a mobile device!');
            }

        },
        is_mobile : function () {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                // tasks to do if it is a Mobile Device
                SUK.loadTemplate(tempsNames.tmp_mobile_menu, '#mobile-menu');
                is_mobileMethods.adEventListener();
                //console.log('You are using a mobile device!');
            } else {
                //console.log('You are not using a mobile device!');
            }
        },
        is_mobile_versions_price_table: function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
        }
    }
/* ------------------------------------------------------ *\
 [Methods] Test Drive General
\* ------------------------------------------------------ */
    var testDriveGeneralMethods = {
        testDrivegeneral: function(options, event) {
            if( options === undefined || options === null  ){
                options = {};
            }
            tdh_data = $.extend( {}, default_data, options );
            //console.log('entra prueba de manejo general');
            //Adds concessionaires items
            function td_show_concessionaires( elements ){
                var i0 = 0, i1 = elements.length;
                var html = '';
                if( i1 > 0 ){
                    while( i0 < i1 ){
                        //html += Mustache.render( concessionaires_li_element, elements[i0] );
                        i0++;
                    }
                    //html = '<ul>' + html + '</ul>';
                    //console.log('td_show_concessionaires');

                }else{
                    //html = concessionaires_no_found;
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
                var anio = '2015';
                if(tdh_data.key == 'ciaz'){
                    anio = '2016';
                }
                tdh_data.name = car_data.name + ' ' + anio;
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
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    $("#car_select_list").hide();
                    $("#car_select_name, #car_select_preview").fadeIn();
                }
            });
            if( tdh_data.key == '' ){
                $('#car_select_list a').eq(0).trigger('click');
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
                    //var l = ( gp ).geometry.location;
                    var location = ( gp ).geometry.location;
                    var lat = location.lat();
                    var lng = location.lng();
                    //var ll = { latitude: l.ob, longitude: l.pb };
                    //var ll = { latitude: l.nb, longitude: l.ob };

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
            //console.log('entra test drive general');
        }
    }
/* ------------------------------------------------------ *\
 [Methods] financing
\* ------------------------------------------------------ */
    var financingMethods = {
        financing: function (options, event) {
            if( options === undefined || options === null  ){
                options = {};
            }
            fuh_data = $.extend( {}, default_data, options );
            //Tabs
            $panelTabsNav   = $('li.step-nav-tabs.funding');
            $panelTabs      = $('.step-nav-tab.funding');
            $panelTabsNav.children('a').on('click', financingMethods.preventDefault_panelTabsNav);
            /*//console.log(car_d);
            //console.log(funding_data);
            //console.log(conce_d);
            //console.log(default_data);
            //console.log(fuh_data);
            //console.log($panelTabsNav);
            //console.log($panelTabs);*/
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
            $('#funding-versions-tabs').delegate('a','click', financingMethods.preventDefault_fundingVersionTabs);
            $('#car_select_list').delegate('a','click', financingMethods.preventDefault_carSlectList);
            if( fuh_data.key == '' ){
                $('#car_select_list a').eq(0).trigger('click');
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    $("#car_select_name, #car_select_preview").hide();
                    $("#car_select_list").fadeIn();
                }
                goto_step_financing( 1, true );
            }else{
                $.funding_select_car( fuh_data.key );
                goto_step_financing( 2, true );
            }
            $("#change-car-test").on('click', financingMethods.preventDefault_changeCarTest);
            $('a.funding-goto').on('click', financingMethods.preventDefault_aFundingGoto);
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $("#fake-calculate").on('click', financingMethods.preventDefault_fakeCaculate);
                $("#modify-calc").on('click', financingMethods.preventDefault_modifyCalc);
            }
        },
        preventDefault_panelTabsNav: function(event) {
            event.preventDefault();
            if( !$(this).parent().is('.disabled') ){
                goto_step_financing( $(this).data('number') );
                //console.log($(this).data('number'));
            }
            //console.log('click');
        },
        preventDefault_fundingVersionTabs: function(event) {
            event.preventDefault();
            var data_version = parseInt( $(this).data('version') );

            financingTextMethods.getVersionsByModelId();
            $.funding_select_version( data_version );
            //console.log(data_version);
        },
        preventDefault_carSlectList: function(event) {
            event.preventDefault();
            var data_key = $(this).data('key'),
                $bg_banner  = $('#promocion-financing_by_model');
            $bg_banner.removeClass(fuh_data.key+'-bg');
            //console.log($bg_banner);

            financingTextMethods.getModelsByKey();

            $.funding_select_car( data_key );

            $bg_banner.addClass(fuh_data.key+'-bg');
            //console.log($bg_banner);

            //console.log(data_key);

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $("#car_select_list").hide();
                $("#car_select_name, #car_select_preview").fadeIn();
            }
        },
        preventDefault_changeCarTest: function(event) {
            event.preventDefault();
            $("#car_select_name, #car_select_preview").hide();
            $("#car_select_list").fadeIn();
            //console.log('click plan');
        },
        preventDefault_aFundingGoto: function(event) {
            event.preventDefault();
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if ($(this).data('step') == "1") {
                    $("#car_select_name, #car_select_preview").hide();
                    $("#car_select_list").fadeIn();
                }
            }
            goto_step_financing( $(this).data('step') );
            //console.log('click Goto');
        },
        preventDefault_fakeCaculate: function(event) {
            event.preventDefault();
            $("#header-financiamiento .option-2, #fake-calculate").hide();
            $(".funding-live-results, #modify-calc, #header-financiamiento .funding-goto").css("display", "block");
            //console.log('click calculate');
        },
        preventDefault_modifyCalc: function(event) {
            event.preventDefault();
            $(".funding-live-results, #modify-calc, #header-financiamiento .funding-goto").hide();
            $("#header-financiamiento .option-2, #fake-calculate").css("display", "block");
            //console.log('click modify calc');
        }
    }
    $.funding_adjust_calc = function(  ){
        // Funding Adjust calc
        var f_amount        = funding_data.price * ( funding_data.engagement / 100 ),
            total_pay       =  funding_data.price -  f_amount,
            f_monthly_pay   = funding_core( total_pay, funding_data.months  );
        $('#live-engagement,#funding_result_engagement,#funding_resume_engagement').html( moneyFormat( f_amount ) );
        $('#live-months,#funding_result_months,#funding_resume_months').html( funding_data.months + ' meses' );
        $('#live-price,#funding_result_price,#funding_resume_price').html(  moneyFormat(  funding_data.price ) );
        $('#funding_result_monthly_payment,#funding_resume_monthly_payment').html(  moneyFormat(  f_monthly_pay ) );
        // INPUTS HIDDEN FINANCING GENERAL
        $('#financing_general_car_engagement').val(moneyFormat( f_amount ));
        $('#financing_general_car_months').val(funding_data.months + ' meses');
        $('#financing_general_car_price').val(moneyFormat(  funding_data.price ));
        $('#financing_general_car_monthly_payment').val(moneyFormat(  f_monthly_pay ));
        // INPUTS HIDDEN FINANCING BY MODEL
        $('#financing_by_model_car_engagement').val(moneyFormat( f_amount ));
        $('#financing_by_model_car_months').val(funding_data.months + ' meses');
        $('#financing_by_model_car_price').val(moneyFormat(  funding_data.price ));
        $('#financing_by_model_car_monthly_payment').val(moneyFormat(  f_monthly_pay ));
    }
    $.funding_select_version = function( ii ){
        var $elements;
        $elements               = $('#funding-versions-tabs li a');
        $elements.removeClass('active');
        $elements.eq( ii ).addClass('active');
        funding_data.engagement = $("#car_engagement_slider").slider( 'value' ) ;
        funding_data.months     = $("#car_months_slider").slider( 'value');
        //console.log(car_d);
        funding_data.price      = car_d.versions[ ii ].price;
        //console.log(car_d.versions[ ii ].price);
        fuh_data.car_version    = car_d.versions[ ii ].key;
        //console.log(car_d.versions[ ii ].key);
        $.funding_adjust_calc();
    }
    $.funding_select_car = function( k ){
        var car_data    = get_car_data( k ),
            //$bg_banner  = $('#promocion-financing_by_model')
            $icons      = $('#car_select_preview .car_thumb_160 .car, #fu_adjust_car .car_thumb_60 .car, #funding_result_data .car_thumb_60 .car, #funding-resume-car .car_thumb_60 .car'),
            $car_texts  = $('#car_select_name h3, #step-nav-tab h3, #fu_adjust_car h3, #funding_result_data h3, #funding-resume-car h3'),
            $input_car_text = $('#financing_general_model_car'),
            $input_car_key_text = $('#financing_general_model_key');

        cars_prices = financingTextMethods.getModelsByKey(k);
        //console.log(cars_prices);

        fuh_data.key = k;
        var anio = '2015';
        if(car_data.key == 'ciaz'){
            anio = '2016';
        }
        fuh_data.name = car_data.name + ' ' + anio;
        $("#car_engagement_slider").slider({value: 20}) ;
        $("#car_months_slider").slider({value: 6});

        //$bg_banner.removeClass(fuh_data.key + '-bg');
        //$bg_banner.addClass(fuh_data.key + '-bg');

        $car_texts.text( fuh_data.name );
        $input_car_text.val( fuh_data.name );
        $input_car_key_text.val( fuh_data.key );

        $icons.removeClass();
        $icons.addClass('car ' + fuh_data.key );
        //console.log(cars_prices);
        var i0 = cars_prices.length, version = null, i1, i2, tab_data;
        //sukCarPricesData = financingTextMethods.getModels();
        sukCarPricesData = {
            'sukpa': cars_prices
        }
        SUK.loadTemplate(tempsNames.tmp_funding_version_tabs, domEl.div_recurrent_funding_version_tabs, sukCarPricesData);
        //console.log(sukCarPricesData);
        while( i0-- ){
            //console.log(i0);
            if( cars_prices[i0].key == fuh_data.key ){
                //console.log('si entro');
                car_d = cars_prices[i0];
                versions = car_d.versions;
                var i1 = 0, i2 = versions.length, tabs_data = {versions:[]};
                if( i2 > 1 ){
                    $('#funding-versions').show();
                }else{
                    //console.log('');
                    $('#funding-versions').hide();
                }
                while( i1 < i2 ){
                    tab_data = {
                        id       : i1,
                        name    : versions[i1].name
                    }
                    tabs_data.versions.push( tab_data );
                    i1++;
                    //console.log(tabs_data.versions.push( tab_data ));
                }
                $.funding_select_version( 0 );
                break;
            }
        }
    };
/* ------------------------------------------------------ *\
 [Methods] financing API JS
\* ------------------------------------------------------ */
    var financingTextMethods = {
        getModels: function() {
            var modelsData;
            modelsData = SUK.getInternalJSON('api/data-json/financing/car_prices.json');
            modelsData = modelsData.sukpa[0].suk_Models;
            return modelsData;
        },
        getModelsById: function(id) {
            var modelsData, modelsIds, modelsDataNew;
            id = +id;
            modelsData = financingTextMethods.getModels();
            modelsIds = SUK.filterArrayObjByKey(modelsData, 'id', 0, 0);

            //Change all string elements into integer
            for(var idx = 0; idx < modelsIds.length; idx++) {
                modelsIds[idx] = +modelsIds[idx];
            }
            //Search if this Models exits in the current model
            modelsIdxCurrent = _.indexOf(modelsIds, id);
            //console.log(modelsIds);
            //console.log(id);
            modelsDataNew = (modelsIdxCurrent >= 0) ? [modelsData[modelsIdxCurrent]] : [];
            //console.log(modelsIdxCurrent);
            return modelsDataNew;
        },
        getModelsByKey: function(key) {
            var modelsData, modelsKeys, modelsDataNew;
            key = ''+key;
            modelsData = financingTextMethods.getModels();
            modelsKeys = SUK.filterArrayObjByKey(modelsData, 'key', 0, 0);

            //Change all string elements into integer
            for(var idx = 0; idx < modelsKeys.length; idx++) {
                modelsKeys[idx] = ''+modelsKeys[idx];
            }
            //Search if this Models exits in the current model
            modelsIdxCurrent = _.indexOf(modelsKeys, key);
            //console.log(modelsKeys);
            //console.log(key);
            modelsDataNew = (modelsIdxCurrent >= 0) ? [modelsData[modelsIdxCurrent]] : [];
            //console.log(modelsIdxCurrent);
            return modelsDataNew;
        },
        getVersionsByModelId: function(id) {
            var modelsData, versionData;
            id = +id;
            modelsData = financingTextMethods.getModelsById(id);
            //console.log(modelsData);
            versionData = (modelsData.length) ? modelsData[0].versions : [];
            return versionData;
        },
        getVersionsByModelIdByVerisonId: function(modelId, versionId) {
            var versionData, newVersionData, versionsIds;
            modelId = +modelId;
            versionId = +versionId;

            versionData = financingTextMethods.getVersionsByModelId(modelId);
            //
            if (versionData.length) {
                versionsIds = SUK.filterArrayObjByKey(versionData, 'id', 0, 0);

                //Change all string elements into integer
                for(var idx = 0; idx < versionsIds.length; idx++) {
                    versionsIds[idx] = +versionsIds[idx];
                }
                //Search if this Models exits in the current model
                versionsIdxCurrent = _.indexOf(versionsIds, versionId);
                newVersionData = (versionsIdxCurrent >= 0) ? [versionData[versionsIdxCurrent]] : [];
            } else {
                newVersionData = [];
            }
            return newVersionData;
        }
    }
/* ------------------------------------------------------ *\
 [Methods] 'CLICK GO ACTIONS'
\* ------------------------------------------------------ */
    var returMethods = {
        clickGoIndex : function () {
            Finch.navigate('/');
        }
    }
    var financingByModelsMethods = {
        clickGoFinancingSwiftSport : function(envent) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento/swift-sport');
        },
        clickGoFinancingSwift : function(envent) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento/swift');
        },
        clickGoFinancingKizashi : function(envent) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento/kizashi');
        },
        clickGoFinancingGrandVitara : function(envent) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento/grand-vitara');
        },
        clickGoFinancingSCross : function(envent) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento/s-cross');
        },
        clickGoFinancingCiaz : function(envent) {
            $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
            Finch.navigate('/financiamiento/ciaz');
        }
    }
/* ------------------------------------------------------ *\
 [Methods] concessionairesMethods
\* ------------------------------------------------------ */
    var concessionairesMethods = {
        get_concessionaries_list: function() {
            var concessionairesData;
            concessionairesData = SUK.getInternalJSON('api/data-json/concessionaires/all.json');
            SUK.loadTemplate(tempsNames.tmp_content_concessionaires_list, domEl.div_recurrent_concessionaires_list, concessionairesData);

            $.open_concessionaire_by_key();
            $.set_concessionaire_by_url();
            $.adjust_map_width();
            concessionairesMethods.resize();
            initialize_map();
            concessionairesMethods.initMap();
            concessionairesMethods.preventDefault_see_concessionaires();

            //console.log(concessionairesData);
            return concessionairesData;
        },
        get_map_data: function( sukpa ){
            var concessionairesData;
            concessionairesData = SUK.getInternalJSON('api/data-json/concessionaires/all.json');
            concessionaires = concessionairesData.sukpa;
            //console.log('5: concessionaires');
            //console.log(concessionaires);
            //setup all markers
            var i1;
            var icon_latLon, conce, conce_select_html,
                icon_base   = 'img/sections/concessionaires/',
                //icon_base   = 'http://' + location.host +'/images/sections/concessionaires/',
                icon_url    = icon_base + 'marker-regular.png';
            if( BrowserDetect.browser == 'Explorer' ){
                if( Number( BrowserDetect.version ) < 9 ){
                    icon_url = icon_base + 'marker-regular-old-ie.png';
                }
            }
            var icon_options = {
                boxStyle: {
                    background  : "url('/images/sections/concessionaires/marker-active-bg.png') no-repeat",
                    height      : "67px",
                    width       : "250px"
                },
                closeBoxURL: '',
                content: '',
                disableAutoPan: false,
                enableEventPropagation: false,
                infoBoxClearance: new google.maps.Size(0, 0),
                maxWidth: 0,
                pane: 'floatPane',
                pixelOffset: new google.maps.Size( -25, -71),
                zIndex: null
            };
            conce_select_html = '';


            for( i1 in concessionaires ){
                conce =  concessionaires[i1];
                //console.log('6: conce');
                //console.log(conce);
                conce_select_html += '<option value="' + conce.key + '">' + conce.name + '</option>';
                //console.log('7: conce_select_html');
                //console.log(conce_select_html);
                icon_latLon = new google.maps.LatLng( conce.latitud , conce.longitud );
                //console.log('8: icon_latLon');
                //console.log(icon_latLon);


                var marker = new google.maps.Marker({
                    custom_data : conce,
                    position    : icon_latLon,
                    map         : map,
                    icon        : icon_url,

                    reset_me    : function(){

                    },
                    select_me   : function(){
                        if( title_box != null ){
                            title_box.close();
                        }
                        var html= '<div class="map-concessionaire-name"><span>' + this.custom_data.name +'</span></div>';
                        //console.log('10: click -> this.custom_data.name');
                        //console.log(this.custom_data.name);
                        icon_options.content = html;
                        //console.log('11: click -> html');
                        //console.log(html);
                        title_box  = new InfoBox( icon_options );
                        title_box.open( map, this );
                    },
                    shadow      : icon_base + 'marker-shadow.png'
                });
                google.maps.event.addListener( marker, 'click', function() {
                    $.open_concessionaire_by_key( this.custom_data.key , true );
                    //console.log('click');
                });
                map_markers.push( marker );
            }

            $("#concessionaire-select").html( conce_select_html );
            $("#concessionaire-select").chosen();
            $("#concessionaire-select").on('change', function( e ){
                var val = $(this).val();
                $.open_concessionaire_by_key( val, true );
            });
            $.set_concessionaire_by_url( window.location.pathname, false );
            // CLICK DINAMIC LIST
            $(domEl.div_recurrent).on('click', '#concessionaires-dynamic-list li.concessionaire, #concessionaires-dynamic-list a', concessionairesMethods.preventDefault_dinamic_list);
            try{
                window.addEventListener('popstate', function( e ) {
                    $.set_concessionaire_by_url( window.location.pathname  );
                });
            }catch( e ){ }
            // CLICK CLOS CONCESSIONAIRES
            $(domEl.div_recurrent).on('click', 'a.concessionaire-close', concessionairesMethods.preventDefault_concessionaires_close);
        },
        initMap: function() {
            google.maps.event.addDomListener( window, "load", initialize_map);
        },
        resize: function() {
            $(window).resize(function() {
                $.adjust_map_width();
            });
            $(document).resize(function() {
                $.adjust_map_width();
            });
            $.adjust_map_width();
        },
        preventDefault_see_concessionaires: function(event) {
            /*$('#open-test-drive').on('click',function( e ){
                e.preventDefault();
                var params = {
                    concessionaire_id  : current_concessionaire_id,
                    concessionaire_key : current_concessionaire,
                    force_open         : true
                };

                if(typeof already_panel_open === 'undefined' ){
                    $.openPanel( 'test-drive', params );
                }
                else {
                    $.scroll_to('top');
                    html = $.get_header_html( 'test-drive', params );
                    data = {
                        html : html
                    };
                    div_html = Mustache.render( section_wrapper_template , data );
                    $('#header-sections-wrapper').html( div_html );
                    $.start_header_listeners( 'test-drive', params );
                }

            });*/
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $("#see-all").click(function (e) {
                    e.preventDefault();
                    $(".concessionaire-search").hide();
                    $(".concessionaire-list").fadeIn();
                });

                $("#back-list-concessionaires").click(function (e) {
                    e.preventDefault();
                    concessionaire_preselected = 0;
                    concessionaire_detail_selected = false;
                    $("#concessionaires-data").css({
                        //height: '0',
                        paddingTop: '0'
                    });
                    $(".concessionaire-search").hide();
                    $("#concessionaires-list, .concessionaire-list").fadeIn();
                    $(".concessionaire").removeClass("active");
                    initialize_map();
                });
            }
        },
        preventDefault_dinamic_list : function(event) {
            event.preventDefault();
            if( $(this).is('a') ){
                $.set_concessionaire_by_url( $(this).attr('href') );
            }else{
                $.open_concessionaire_by_key( $(this).attr('data-key'), true );
            }
            //console.log('click dinamic list');
        },
        preventDefault_concessionaires_close : function(event) {
            event.preventDefault();
            $("#concessionaires-data").removeClass('active');
            concessionaire_open = false;
            $.adjust_map_width();
            //console.log('click close');
        }
    }
/* ------------------------------------------------------ *\
 [functions] $.open_concessionaire_by_key
\* ------------------------------------------------------ */
    $.open_concessionaire_by_key = function( key , change ){
        if( current_concessionaire == key && concessionaire_open && ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
            return;
        }
        //console.log('1: current_concessionaire');
        //console.log(current_concessionaire);
        //console.log('2: concessionaire_open');
        //console.log(concessionaire_open);
        $('html, body').animate({scrollTop: '0px'}, 400);
        current_concessionaire = key;
        var cc = null, ic = concessionaires, cm;
        //var cc = null, ic = concessionaires.length, cm;
        //console.log(ic);
        while( ic-- ){
            if( concessionaires[ic].key == current_concessionaire ){
                cc = concessionaires[ic];
                current_concessionaire_id = cc.id;
                //console.log('3: click -> cc');
                //console.log(cc);
                break;
            }
        }
        if( cc == null ){
            $("#concessionaires-data").removeClass('active');
            //console.log('remove class: ' + cc);
            return;
        }
        ic = map_markers.length;
        //console.log(ic);
        //console.log(map_markers);
        //console.log(map_markers.length);
        while( ic-- ){
            cm = map_markers[ ic ];
            //console.log(map_markers[ ic ]);
            if( cm.custom_data.key ==  current_concessionaire  ){
                //console.log(ic);
                cm.select_me();
                //console.log(cm.reset_me());
                //console.log('while if');
                //console.log(cm);
                //console.log(cm.custom_data);
                //console.log(cm.custom_data.key);
                //console.log(current_concessionaire);
            }else{
                //console.log(ic);
                cm.reset_me();
                //console.log(cm.reset_me());
                //console.log('while else');
                //console.log(cm);
                //console.log(cm.custom_data);
                //console.log(cm.custom_data.key);
                //console.log(current_concessionaire);
            }
        }
        if( change ){
            try{
                window.history.pushState( null , cc.name, "/concesionarias/suzuki-" + key);
            }catch( e ){ }
            //console.log(change);
        }
        $("#concessionaires-data").addClass('active');
        concessionaire_open = true;
        $.adjust_map_width();

        var nw = new google.maps.LatLng(
            cc.lat,
            cc.lon
        );
        map.setCenter( nw );
        $('#concessionaires-dynamic-list li.concessionaire').removeClass('active');
        $('#concessionaires-dynamic-list li.concessionaire').each( function( ii ){
            if( $(this).attr('data-key') == current_concessionaire ){
                $(this).addClass('active');
                var st = $('.concessionaire-list').scrollTop();
                var gt = $(this).offset().top - 291 + st;
                $('.concessionaire-list').stop().delay( 100 ).animate( { scrollTop: gt }, 600 );
                return false;
            }
        });
        $('#concessionaire-title').text( cc.name );
        //console.log(cc.name);
        $('#concessionaire-address').text( cc.address );
        //console.log(cc.address);
        $('#concessionaire-zip').text( cc.zip );
        //console.log(cc.zip);
        $('#concessionaire-phone').text( cc.phone );
        //console.log(cc.phone);
        $('#concessionaire-phone').attr({href:'call:' +  cc.phone} );
        if( cc.website != '' ){
            $('#concessionaire-website-wrapper').show();
            //$('#concessionaire-website').text( cc.website );
            $('#concessionaire-website').attr({href:  cc.website } );
        }/*else{
            $('#concessionaire-website-wrapper').hide();
        }*/
        $('#concessionaire-image').attr({
            alt     : cc.name,
            src     : '../images/sections/concessionaires/previews/' + cc.key + '-big.jpg',
            title   : cc.name
        });
        if (IS_MOBILE) {
            $("#concessionaires-list").hide();
            $("#concessionaires-data").css({
                //height: 'auto',
                paddingTop: '130px'
            });
        }
    }
/* ------------------------------------------------------ *\
 [functions] $.set_concessionaire_by_url
\* ------------------------------------------------------ */
    $.set_concessionaire_by_url = function( url ){
        var d = url;
        //var d = url.split('/suzuki-');
        //console.log(url);
        if( d < 0 ){
        //if( d.length > 1 ){
            $.open_concessionaire_by_key( d[1], false );
            //console.log('4: d');
            //console.log(d);
            //console.log(url);
        }
    }
/* ------------------------------------------------------ *\
 [functions] getCircle
\* ------------------------------------------------------ */
    function getCircle(magnitude) {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 1,
            scale: 1,
            strokeColor: 'white',
            strokeWeight: .5
        };
    }
/* ------------------------------------------------------ *\
 [functions] initialize_map
\* ------------------------------------------------------ */
    function initialize_map(){
        var c_preselected, map_latLon, map_center;
        try{
            c_preselected = parseInt( $("#map_canvas").attr("data-concessionaire-preselected-id") );
            //console.log(c_preselected);
            if( isNaN(c_preselected) ){
                c_preselected = 16;
                //console.log(c_preselected);
            }
        }catch( e ){
            c_preselected = 0;
        }
        if( c_preselected > 0 ){
            concessionaire_preselected = c_preselected;
            map_latLon = ( $("#map_canvas").attr("data-lat-lon") ).split(',');
            //console.log(map_latLon);
            map_center = new google.maps.LatLng( map_latLon[0] , map_latLon[1] );
        }else{
            map_center = new google.maps.LatLng( 20.6244, -103.421 );
        }
        var map_options = {
            center: map_center,
            panControl: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            zoomControl: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            mapTypeControl: false,
            streetViewControl: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 8
        };

        map = new google.maps.Map( document.getElementById("map_canvas"), map_options );
        if (!concessionaire_detail_selected)
            concessionairesMethods.get_map_data();
    }
/* ------------------------------------------------------ *\
 [functions] $.adjust_map_width
\* ------------------------------------------------------ */
    $.adjust_map_width = function( redo ){
        //console.log(redo);

        $('.concessionaire-list').height(
            $('#concessionaires-map').height() - 196
        );
        $('#concessionaires-data .content').height(
            $('#concessionaires-map').height()
        );
        var ls_w = $("#concessionaires-list").width() + 1;
        //console.log(ls_w);
        var da_w = 0;
        //console.log(da_w)
        if( $("#concessionaires-data").is('.active') ){
            $("#concessionaires-data:hidden").css({width:1}).show();
            da_w = 330;
            //console.log(da_w);
        }
        var wi_w = $("#concessionaires" ).width();
        $("#concessionaires" ).css('height', '860px');
        //console.log(wi_w);
        var ma_w = wi_w - ls_w - da_w;
        //console.log(ma_w);
        $("#concessionaires-data").width( da_w );
        $("#concessionaires-map" ).width( ma_w );
    }


