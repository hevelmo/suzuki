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
//var variable;
var sections;
var height = 0;
var header_section = '';
var current_menu = '',
    scroll_current_section = -1,
    sections_positions = [],
    yy = 0,
    arrow_section = [ 0, -403, -239, -102, 53, 214 ],
    //hash_section = [ "", "1", "2", "3", "4", "5", "6" ],
    section_names = [ "", "home", "caracteristicas", "galeria", "versiones_precios", "accesorios", "prueba" ],
    section_timer,
    selected_concessionaire = -1;
var td_id_flag ='<div id="model-section-arrow"><span>&nbsp;</span></div><div id="model-test-drive-flag"><a href="#prueba-de-manejo" id="model-test-drive-flag-link"><span>Prueba de Manejo</span></a></div>';
var patch_bar ='<div class="menu-patch" id="patch">&nbsp;</div>';
var current_car;

/* ------------------------------------------------------ *\
 [functions] 'Zone'
 function nameFunction (arg) {
 }
\* ------------------------------------------------------ */
/* ------------------------------------------------------ *\
 [functions] validateEmail
\* ------------------------------------------------------ */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\., ;:\s@\"] + (\.[^<>()[\]\\., ;:\s@\"] + )*)|(\". + \"))@((\[[0-9] {1, 3}\.[0-9] {1, 3}\.[0-9] {1, 3}\.[0-9] {1, 3}\])|(([a-zA-Z\-0-9] + \.) + [a-zA-Z] {2, }))$/;
    //return re.test(email);
    return true;
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
        case 'ciaz':
            value = 194900.00;
            break;
        default:
            break;
    }
    return value;
}
function insta_drive_gaq(){
    var precio_actual = showMeTheMoney( current_car );
    ga('send', 'event', 'Instant Drive', 'Confirmacion', current_car, precio_actual * 0.071 );
}
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
        /*window.clearTimeout( section_timer );
        section_timer = setTimeout(function(){
            var url = document.location + '/' + section_names[ii];
            ga('send', 'pageview', url );
        }, 2000);*/

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
function funding_core( total_pay, months ){
    var atc = months < 54 ? .1560 : .1676;
    var atc_month = atc / 12;
    var form_partial_1 = 1 - ( Math.pow( ( 1 + atc_month ) , -months ) );
    var form_partial_2 = form_partial_1 / atc_month;
    var form_partial_3 = total_pay / form_partial_2;
    return form_partial_3.toFixed( 2 );
}
function goto_step( step, disable  ){
    var ii, $divinput;
    slide_tabs( step, disable );
    if( step == 3 ){
    }
}
//animates all transitions (needs an "a" element whit "name attrubute")
$.scroll_to = function( target_name ){
    var target, dest, header_height = $('#header-wrapper').height();
    if( target_name != 'top' ){
        target = $( 'a[name="' + target_name + '"]' );
        dest = target.offset().top - header_height - 35;
        /*if (IS_MOBILE) {
            dest += 75;
        }*/
    }else{
        dest = 0;
    }
    $('html,body').stop().animate({ scrollTop : dest}, 800 , 'easeOutSine');
};
//First Arrow animation
$.animate_arrow = function( $arrow ){
    $arrow.css( { marginTop:-82,opacity:1}).animate({marginTop:-20,opacity:0}, 1000, function(){
        $.animate_arrow( $(this) );
    });
}
$.adjust_spaces = function(){
    $('a.section-separator').each( function( ii ){
        yy =  $(this).offset().top - 200 ;
        yy = ( yy > 0 )? yy : 0;
        sections_positions[ ii ] = parseInt( yy );
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
 [Methods] Home
\* ------------------------------------------------------ */
//This group of methods will be not used it's only example, remove it later
var addStylesMethods = {
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
    cleanAttrContact : function () {
        $('head .link-contact').remove();
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
    cleanAttrModel_swift_sport : function () {
        $('head .link-swift-sport').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_swift : function () {
        $('head .link-swift').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_sx4_crossover : function () {
        $('head .link-sx4-crossover').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_sx4_sedan : function () {
        $('head .link-sx4-sedan').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_kizashi : function () {
        $('head .link-kizashi').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_grand_vitara : function () {
        $('head .link-grand-vitara').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_s_cross : function () {
        $('head .link-s-cross').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
    cleanAttrModel_ciaz : function () {
        $('head .link-ciaz').remove();
        $('#patch').remove();
        $('#model-section-arrow').remove();
        $('#model-test-drive-flag').remove();
    },
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
    addStyleLegals : function () {
        linkLegalsAttributes = {'id': 'content-add-styles-legals', 'rel': 'stylesheet', 'class': 'link-Legals', 'href': 'css/sections/legals.css'}
        SUK.appendOne('head', 'link', linkLegalsAttributes, '', 0);
        $('body').prepend( patch_bar );
    },
    addStyleModel_swift_sport : function () {
        link_swift_sport_Attributes = {'id': 'content-add-styles-swift-sport', 'rel': 'stylesheet', 'class': 'link-swift-sport', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_swift_sport_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_swift : function () {
        link_swift_Attributes = {'id': 'content-add-styles-swift', 'rel': 'stylesheet', 'class': 'link-swift', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_swift_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_sx4_crossover : function () {
        link_sx4_crossover_Attributes = {'id': 'content-add-styles-sx4-crossover', 'rel': 'stylesheet', 'class': 'link-sx4-crossover', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_sx4_crossover_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_sx4_sedan : function () {
        link_sx4_sedan_Attributes = {'id': 'content-add-styles-sx4-sedan', 'rel': 'stylesheet', 'class': 'link-sx4-sedan', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_sx4_sedan_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_kizashi : function () {
        link_kizashi_Attributes = {'id': 'content-add-styles-kizashi', 'rel': 'stylesheet', 'class': 'link-kizashi', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_kizashi_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_grand_vitara : function () {
        link_grand_vitara_Attributes = {'id': 'content-add-styles-grand-vitara', 'rel': 'stylesheet', 'class': 'link-grand-vitara', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_grand_vitara_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_s_cross : function () {
        link_s_cross_Attributes = {'id': 'content-add-styles-s-cross', 'rel': 'stylesheet', 'class': 'link-s-cross', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_s_cross_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    },
    addStyleModel_ciaz : function () {
        link_ciaz_Attributes = {'id': 'content-add-styles-ciaz', 'rel': 'stylesheet', 'class': 'link-ciaz', 'href': 'css/sections/models.css'}
        SUK.appendOne('head', 'link', link_ciaz_Attributes, '', 0);
        $('body').prepend( patch_bar );
        $('body').prepend( td_id_flag );
    }
}
var catalogMethods = {
    pageTransitionCatalog : function () {
        $('.item.et-section').addClass('et-page-current');
    }
}
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
        console.log('Click index');
    },
    clixkGoGroup : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
        Finch.navigate('/grupo');
        console.log('Click group');
    },
    clickGoConcesinary : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
        Finch.navigate('/concesionarias');
        console.log('Click concesionarias');
    },
    clickGoCatalogs : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
        Finch.navigate('/catalogos');
        $('.et-section').addClass('et-page-current');
        console.log('Click catalogos');
    },
    clickGoContactUs : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
        Finch.navigate('/contactanos');
        console.log('Click contactanos');
    },
    clickGoPrivacy : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
        Finch.navigate('/aviso-de-privacidad');
        console.log('Click aviso de privacidad');
    },
    clickGoLegalTerms : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        $('body,html').animate({ scrollTop: "0" }, 999, 'easeOutExpo' );
        Finch.navigate('/terminos-legales');
        console.log('Click Terminos Legales');
    }
}
var addDelegatMethods = {
    transitions : function () {
    },
    delegate : function (event) {

        var PageTransition = ( function( options ) {
            var prev_slide = 'prev_slide';
            var next_slide = 'next_slide';
            var wrapper = options.wrapper;

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

            if( ! $(next_page).hasClass('et-page-current') ){

                if( $(next_page).hasClass( 'after' ) ) {
                    direction = 'next';
                } else if( $(next_page).hasClass( 'before' ) ) {
                    direction = 'prev';
                }

                if( ! Modernizr.csstransitions) {

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

                } else {

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

        var init_slide_load = location.hash.slice(1);
        $('.catalog_cars_wrapper').find('.catalog_car').each(function( index ) {
            if( $(this).hasClass(init_slide_load) )
                init_slide_load = index;
        });

        event.preventDefault();
        var car_key = $(this).data('key');
        var slide = $("#catalog-"+ car_key);
        $('.catalog_car').removeClass('active');
        $(this).parent('.catalog_car').addClass('active');
        pages.move_to( slide );
    }
}
/* ------------------------------------------------------ *\
 [Methods] Header Panel
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
        if ($(this).hasClass('active')) {
            $('#header-spacer').css('height','325px');
            $('.header_section').css({
                'display':'block',
                'opacity':'1'
            });
            SUK.loadTemplate(tempsNames.tmp_panel_menu_models, domEl.div_recurrent_panel_menu);
        } else {
            $('#header-spacer').css('height','0px');
            $('.header_section').css({
                'display':'none',
                'opacity':'0'
            });
            SUK.setHTML(domEl.div_recurrent_panel_menu, '');
        }
    },
    clickFinnacingPanel : function (event) {
        if ($(this).hasClass('active')) {
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
        }
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
    },
}
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
 [Methods] PANEL TABS NAV
\* ------------------------------------------------------ */
var panelTabsMethods = {
    panelTabsNav : function (event) {

    }
}
/* ------------------------------------------------------ *\
 [Methods] MODELS MENU
\* ------------------------------------------------------ */
var modelsMenuMethods = {
    car_next_step : function() {
        if( $('.car-next-step').length > 0 ){
            var $arrow1 = $('.car-next-step').children('a'),
                $arrow2 =$arrow1.clone();
            $('.car-next-step').append( $arrow2 ).delegate('a','mousedown mouseup click', function( e ){
                e.preventDefault();
                $.scroll_to('caracteristicas');
            });
            $.animate_arrow( $arrow2 )
        }
    },
    changeNameModel : function () {
        var menu;
        switch (section) {
            case 'swift-sport':
                $('#change-model').addClass('swift-sport');
                $('.car').addClass('swift-sport');
                $('.secondary-title').append('Swift Sport');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 'swift':
                $('#change-model').addClass('swift');
                $('.car').addClass('swift');
                $('.secondary-title').append('Swift');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 'sx4-crossover':
                $('#change-model').addClass('sx4-crossover');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 'sx4-sedan':
                $('#change-model').addClass('sx4-sedan');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 'kizashi':
                $('#change-model').addClass('kizashi');
                $('.car').addClass('kizashi');
                $('.secondary-title').append('Kizashi');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 'grand-vitara':
                $('#change-model').addClass('grand-vitara');
                $('.car').addClass('grand-vitara');
                $('.secondary-title').append('Grand Vitara');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 's-cross':
                $('#change-model').addClass('s-cross');
                $('.car').addClass('s-cross');
                $('.secondary-title').append('S-Cross');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            case 'ciaz':
                $('#change-model').addClass('ciaz');
                $('.car').addClass('ciaz');
                $('.secondary-title').append('Ciaz');
                modelsMenuMethods.car_next_step();
                $('#model-section-arrow').hide();
                $('#back-to-top-button').hide();
                modelsMenuMethods.scrollSwitchMethod();
                switch_menus( menu );
                switch_arrow( );
            break;
            default:
            break;
        }
    },
    scrollSwitchMethod : function() {
        $('#step-2-date').datepicker({
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
 [Methods] IS MOBILE
\* ------------------------------------------------------ */
var is_mobileMethods = {
    openCloseMenu : function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $("body").toggleClass("open-body");
            $("#mobile-menu").toggleClass("open-mobile-menu");
            is_mobileMethods.checkMenu();
        } else {
            console.log('You are not using a mobile device!');
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
            console.log('You are not using a mobile device!');
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
            console.log('You are not using a mobile device!');
        }
    },
    clickHeaderMobile : function(event) {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $(this).toggleClass("header-mobile-icon-active");
            is_mobileMethods.openCloseMenu();
        } else {
            console.log('You are not using a mobile device!');
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
            console.log('You are not using a mobile device!');
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
            console.log('You are not using a mobile device!');
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
            console.log('You are not using a mobile device!');
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
            console.log('You are not using a mobile device!');
        }

    },
    is_mobile : function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // tasks to do if it is a Mobile Device
            SUK.loadTemplate(tempsNames.tmp_mobile_menu, '#mobile-menu');
            is_mobileMethods.adEventListener();
            console.log('You are using a mobile device!');
        } else {
            console.log('You are not using a mobile device!');
        }
    }
}
var returMethods = {
    clickGoIndex : function () {
        Finch.navigate('/');
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
        } else {
            $(this).parent('label').find(':checkbox').attr('checked', false);
            $(this).parent('label').removeClass('checkbox-checked');
            $(this).val('');
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
 [Methods] VALIDATE
\* ------------------------------------------------------ */
var validations_regexp = {
    address : new RegExp( /^[a-zá-úüñ,#0-9. -]{2,}$/i ),
    date    : new RegExp( /^(\d{4})-(\d{1,2})-(\d{1,2})$/ ),
    email   : new RegExp( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ),
    name    : new RegExp( /^[a-zá-úüñ. ]{2,}$/i ),
    phone   : new RegExp( /^[0-9\s\-]{7,13}$/ )
}
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
var formTestDriveMethods = {
    init_datepicker: function() {
        $('#step-2-date').datepicker({
            minDate: '+1d',
            //maxDate: '+1m',
            minLength: 0,
            delay: 0,
            dateFormat: 'yy-mm-dd'
        });
    },
    addDataFormTestDrive: function() {
        var dataFormTestDrive;
        dataFormTestDrive = $('#form-test-drive').serializeFormJSON();
        return SUK.postalService(urlsApi.sendTestDrive, dataFormTestDrive);
    },
    fillingControl: function() {
        var validFieldItems, dataFormTestDrive, isFull, isNoEmpty;
        validFieldItems = [];
        dataFormTestDrive = $('#form-test-drive').serializeFormJSON();
        isFull = SUK.validFormFull(dataFormTestDrive, validFieldItems);
        //$('#suk_test_drive_submit').attr('disabled', !siFull);
        //console.log($('#form-test-drive')serializeFormJSON());
    },
    refreshForm: function() {},
    resetForm: function() {},
    reset_pre_loader: function() {},
    finchNavigateReturn: function() {},
    sendTestDriveForm: function(event) {}
}
var formContactMethods = {
    addDataFormContact: function() {
        var dataFormContact;
        dataFormContact = $('#form-contact').serializeFormJSON();
        return SUK.postalService(urlsApi.sendContact, dataFormContact);
    },
    fillingControl: function() {
        var validFieldItems, dataFormContact, isFull, isNoEmpty;
        validFieldItems = [
            'suk_gdl_contact_name', 'suk_gdl_contact_lastname',
            'suk_gdl_contact_email', 'suk_gdl_contact_department',
            'suk_gdl_contact_car', 'suk_gdl_contact_message',
            'suk_gdl_contact_news'
        ];

        dataFormContact = $('#form-contact').serializeFormJSON();
        isFull = SUK.validFormFull(dataFormContact, validFieldItems);
        //$('#suk_contact_submit').attr('disabled', !isFull);
        //console.log($('#form-contact').serializeFormJSON());
    },
    refreshForm : function() {
        SUK.loadTemplate(tempsNames.tmp_form_contact, domEl.div_content_section_form_contact);
        $('.seleccionar').chosen();
    },
    resetForm : function() {
        SUK.resetForm('#form-contact');
        //$('#suk_contact_submit').attr('disabled', true);
    },
    reset_pre_loader: function() {
        SUK.setHTML('#pre-loader', '');
    },
    finchNavigateReturn: function() {
        Finch.navigate('/');
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
        if (val_news == 'on') {
            val_subscription = 'Activado';
            SUK.setValue('#contact_subscription', val_subscription);
        } else {
            val_subscription = 'Desactivado';
            SUK.setValue('#contact_subscription', val_subscription);
        }

        var form_errors = 0;
        if( validateMethods.validate_input( $contact_message ) ){
            form_errors++;
            $contact_message.focusout();
        }
        if( validateMethods.validate_input( $contact_car_key ) ){
            form_errors++;
            $contact_car_key.focusout();
        }
        if( validateMethods.validate_input( $contact_department ) ){
            form_errors++;
            $contact_department.focusout();
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
                source      : 'Contacto'
            };
            //console.log(data);
            var con_news = $('#contact-newsletter:checked').length;
            var departamento = $contact_department.val();
            var precio_actual = showMeTheMoney($contact_car_key.val());
            var news_srt    = con_news ? 'Envio_con_Newsletter' : 'Envio_Sin_Newsletter';
            var news_val    = con_news ? 600 : 0;
            var car_val     = departamento === 'ventas' ? precio_actual * 0.03 : 0;
            //console.log(departamento, precio_actual, news_srt, news_val, car_val);


            var contactPromise = formContactMethods.addDataFormContact();

            contactPromise.success(function (data) {
                ga('send', 'event', 'Contacto', news_srt, departamento, news_val + car_val );
                setTimeout(function() {
                    $('#pre-loader').append('<i class="fa fa-spinner fa-pulse fa-lg fa-fw msg-fa-ico"></i>');
                    //console.log('Espera');
                    setTimeout(function () {
                        formContactMethods.reset_pre_loader();
                        $('#pre-loader').append("<span class='msg_by_model label label-default animation-fadeIn'><i class='fa fa-spinner fa-pulse fa-lg fa-fw msg-fa-ico'></i> Enviado Mensaje</span>");
                        setTimeout(function () {
                            //console.log("Correo Enviado...");
                            formContactMethods.reset_pre_loader();
                            setTimeout(function () {
                                $('#pre-loader').append("<span class='msg_by_model label label-success animation-fadeIn'><i class='fa fa-check fa-lg fa-fw msg-fa-ico'></i> Correo Enviado...</span>");
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
                            }, 5900);
                        }, 3400);
                    }, 2000);
                }, 500);
            });
            contactPromise.error(function (data) {
                setTimeout(function () {
                    $('#pre-loader').append('<i class="fa fa-spinner fa-pulse fa-lg fa-fw msg-fa-ico"></i>');
                    //console.log('Espera');
                    setTimeout(function () {
                        formContactMethods.reset_pre_loader();
                        $('#pre-loader').append("<span class='msg_by_model label label-warning animation-fadeIn'><i class='fa fa-info-circle fa-lg fa-fw msg-fa-ico'></i> Se requiere llenar los campos</span>");
                        setTimeout(function () {
                            //console.log("Correo no Enviado...");
                            formContactMethods.reset_pre_loader();
                            $('#pre-loader').append("<span class='msg_by_model label label-danger animation-fadeIn'><i class='fa fa-times fa-lg fa-fw msg-fa-ico'></i> Correo no Enviado...</span>");
                            //console.log(data);
                            setTimeout(function () {
                                formContactMethods.reset_pre_loader();
                                formContactMethods.resetForm();
                            }, 1600);
                        }, 900);
                    }, 2000);
                }, 500);
            });

        }
    }
}
