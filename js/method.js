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
        $(domEl.link_content_add_styles_home).attr('href','');
        $(domEl.link_content_add_styles_models_home).attr('href','');
    },
    cleanAttrCatalog : function () {
        $(domEl.link_content_add_styles_catalog).attr('href','');
    },
    cleanAttrContact : function () {
        $(domEl.link_content_add_styles_contact).attr('href','');
    },
    addStyleIndex : function () {
        $(domEl.link_content_add_styles_home).attr('href','css/sections/home.css');
        $(domEl.link_content_add_styles_models_home).attr('href','css/sections/models-home.css');
    },
    addStyleCatalogs : function () {
        $(domEl.link_content_add_styles_catalog).attr('href','css/sections/models.css');
    },
    addStyleContact : function () {
        $(domEl.link_content_add_styles_contact).attr('href', 'css/sections/contact.css');
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
        Finch.navigate('/');
        console.log('Click index');
    },
    clixkGoGroup : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        Finch.navigate('/group');
        console.log('Click group');
    },
    clickGoConcesinary : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        Finch.navigate('/concesionarias');
        console.log('Click concesionarias');
    },
    clickGoCatalogs : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        Finch.navigate('/catalogos');
        $('.et-section').addClass('et-page-current');
        console.log('Click catalogos');
    },
    clickGoContactUs : function (event) {
        actionMenuBarsMethods.removeCleanPanelMenu();
        Finch.navigate('/contactanos');
        console.log('Click contactanos');
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

// IS MOBILE
var is_mobileMethods = {
    is_mobile : function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // tasks to do if it is a Mobile Device
            $('body').append('<div id="mobile-menu">');
            $('#mobile-menu').append('<div>');
            $('#mobile-menu').append('<ul><li><a href="/autos/concesionarias">Concesionarias</a></li><li><a href="#">Modelos</a></li><li><a href="/autos/promociones">Promociones</a></li><li><a href="#">Financiamiento</a></li><li><a href="#">Mi Suzuki</a></li><li><a href="#">Comprar un Suzuki</a></li><li><a href="#">Agendar prueba de manejo</a></li></ul>');

            $(domEl.div_recurrent_body).on('click', "#header-mobile i", function () {
                $(this).toggleClass("header-mobile-icon-active");
                openCloseMenu();
            });

            if (window.addEventListener){
                window.addEventListener('orientationchange', checkMenu, false);
            } else if (window.attachEvent){
                window.attachEvent('orientationchange', checkMenu);
            }

            $(domEl.div_recurrent_body).on('click', "#mobile-menu a", function (e) {
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

            $(domEl.div_recurrent_body).on('click', "#footer-content .row-1 .footer-column", function () {
                $(".footer-column .links").slideUp();
                $(".footer-column i").removeClass("fa-minus").addClass("fa-plus");
                if ($(this).find(".links").css("display") != "block") {
                    $(this).find(".links").slideDown();
                    $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
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
            console.log('You are using a mobile device!');
        } else {
            $('body #mobile-menu').remove();
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


// Meta
/*
var addMetaMethod = {
    addMeta : function () {
        var head = $("head");
        var tags = [

        ];

        for (var i = tags.length; i >= 0; i--) {
            head.append(tags[i]);
        };

    }
}
*/
