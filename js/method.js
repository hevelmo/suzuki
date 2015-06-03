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
var header_section = '';
var bar_offset = { marginLeft:0, width:0 };
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
 [Methods] Header Panel
\* ------------------------------------------------------ */

var headerPanelMethods = {
    switchHeaderPanelSections : function() {
        bar_offset =  { marginLeft:0, width:0 };
        var panel_section, header_button = null, height = 0;
        switch ( panel_section ) {
            case 'models':
                header_button = $(domEl.header_models_button);
                height = 325;
                bar_offset = { marginLeft:-331, width:124 };
            break;
            case 'financing':
                header_button = $(domEl.header_financing_button);
                height = 555;
                bar_offset = { marginLeft:-62, width:182 };
            break;
            case 'owners':
                header_button = $(domEl.header_owners_button);
                height = 300;
                bar_offset = { marginLeft:121, width:136 };
            break;
            case 'before-buy':
                header_button = $(domEl.header_before_buy_button);
                height = 300;
                bar_offset = { marginLeft:258, width:221 };
            break;
            default:
                header_section = '';
                panel_section = '';
            break;
        }
    }
}

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
        $(domEl.action_model_expand_header).removeClass('active');
        $(domEl.action_financing_expand_header).removeClass('active');
        $(domEl.action_owners_expand_header).removeClass('active');
        $(domEl.action_before_buy_expand_header).removeClass('active');
        $(domEl.div_header_panel).addClass('header_panel_active');
        SUK.setHTML(domEl.div_recurrent_panel_menu, '');
    },
    clickReturnIndex : function (event) {
        Finch.navigate('/');
        actionMenuBarsMethods.removeCleanPanelMenu();
        console.log('Click index');
    },
    clixkGoGroup : function (event) {
        Finch.navigate('/group');
        actionMenuBarsMethods.removeCleanPanelMenu();
        console.log('Click group');
    },
    clickGoConcesinary : function (event) {
        Finch.navigate('/concesionaries');
        actionMenuBarsMethods.removeCleanPanelMenu();
        console.log('Click concesionaries');
    },
    clickGoCatalogs : function (event) {
        Finch.navigate('/catalogos');
        $('.et-section').addClass('et-page-current');
        actionMenuBarsMethods.removeCleanPanelMenu();
        console.log('Click catalogos');
    },
    clickGoContactUs : function (event) {
        Finch.navigate('/contactanos');
        actionMenuBarsMethods.removeCleanPanelMenu();
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

var openPanelMenuMethods = {
    openTempModelsPanel : function () {
    },
    clickModelsPanel : function (event) {
        openPanelMenuMethods.animatePanelMenu();
        $(domEl.action_model_expand_header).addClass('active');
        $(domEl.action_financing_expand_header).removeClass('active');
        $(domEl.action_owners_expand_header).removeClass('active');
        $(domEl.action_before_buy_expand_header).removeClass('active');
        $(domEl.div_header_panel).addClass('header_panel_active');
        $('#header-spacer').css('height','325px');
        SUK.loadTemplate(tempsNames.tmp_panel_menu_models, domEl.div_recurrent_panel_menu);
    },
    clickFinnacingPanel : function (event) {
        openPanelMenuMethods.animatePanelMenu();
        $(domEl.action_model_expand_header).removeClass('active');
        $(domEl.action_financing_expand_header).addClass('active');
        $(domEl.action_owners_expand_header).removeClass('active');
        $(domEl.action_before_buy_expand_header).removeClass('active');
        $(domEl.div_header_panel).addClass('header_panel_active');
        $('#header-spacer').css('height','426px');
        SUK.loadTemplate(tempsNames.tmp_panel_menu_financing, domEl.div_recurrent_panel_menu);
    },
    clickOwnersPanel : function (event) {
        openPanelMenuMethods.animatePanelMenu();
        $(domEl.action_model_expand_header).removeClass('active');
        $(domEl.action_financing_expand_header).removeClass('active');
        $(domEl.action_owners_expand_header).addClass('active');
        $(domEl.action_before_buy_expand_header).removeClass('active');
        $(domEl.div_header_panel).addClass('header_panel_active');
        $('#header-spacer').css('height','340px');
        SUK.loadTemplate(tempsNames.tmp_panel_menu_owners, domEl.div_recurrent_panel_menu);
    },
    clickBeforeByPanel : function (event) {
        openPanelMenuMethods.animatePanelMenu();
        $(domEl.action_model_expand_header).removeClass('active');
        $(domEl.action_financing_expand_header).removeClass('active');
        $(domEl.action_owners_expand_header).removeClass('active');
        $(domEl.action_before_buy_expand_header).addClass('active');
        $(domEl.div_header_panel).addClass('header_panel_active');
        $('#header-spacer').css('height','419px');
        SUK.loadTemplate(tempsNames.tmp_panel_menu_before_buy, domEl.div_recurrent_panel_menu);
    },
    animatePanelMenu : function () {
        $(domEl.div_recurrent_panel_menu).stop().hide().fadeIn();
    }
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
/*var demoMethods = {
    changeLan : function (event) {
        var lan, date, newDate;
        lan = PRO.getValue($(this));
        date = $(domEl.h3_demo_date).data('date');
        newDate = PRO.momentToRoman(date, lan);
        $(domEl.h3_demo_date).text(newDate);
    }
}*/

var returMehods = {
    clickGoIndex : function () {
        Finch.navigate('/');
    }
}

var openMenuMethods = {
    clickOpenMenu : function () {
        $('nav').toggleClass('open-menu');
    }
}
var closeMenuMethods = {
    clickClose : function () {
        $('nav').removeClass('open-menu');
    }
}

var contactMethods_gdl = {
    clickSend: function(event) {
        var form_con_gdl, dataForm_contact_gdl;

        dataForm_contact_gdl = $('#form_jag_contact_gdl').serializeFormJSON();

        console.log(urlsApi.sendMailContact_gdl_JAG, dataForm_contact_gdl);

        form_con_gdl = JAG.postalService(urlsApi.sendMailContact_gdl_JAG, dataForm_contact_gdl);

        form_con_gdl.success(function(data){
            console.log("Correo Enviado...");
            console.log(data);

            JAG.resetForm('#form_jag_contact_gdl');

            Finch.navigate('/');
            console.log(Finch);

        });
        form_con_gdl.error(function(data){
            console.log("Correo no Enviado...");
            console.log(data);
            JAG.resetForm('#form_jag_contact_gdl');
            //JAG.setValue('#').val('');
        });
    }
}
var contactMethods_country = {
    clickSend: function(event) {
        var form_con_country, dataForm_contact_country;

        dataForm_contact_country = $('#form_jag_contact_country').serializeFormJSON();

        console.log(urlsApi.sendMailContact_country_JAG, dataForm_contact_country);

        form_con_country = JAG.postalService(urlsApi.sendMailContact_country_JAG, dataForm_contact_country);

        form_con_country.success(function(data){
            console.log("Correo Enviado...");
            console.log(data);

            JAG.resetForm('#form_jag_contact_country');

            Finch.navigate('/');
            console.log(Finch);

        });
        form_con_country.error(function(data){
            console.log("Correo no Enviado...");
            console.log(data);
            JAG.resetForm('#form_jag_contact_country');
            //JAG.setValue('#').val('');
        });
    }
}
var serviceMethods_gdl = {
    clickSend: function(event) {
        var form_ser_gdl, dataForm_service_gdl;

        dataForm_service_gdl = $('#form_jag_service_gdl').serializeFormJSON();

        console.log(urlsApi.sendMailService_gdl_JAG, dataForm_service_gdl);

        form_ser_gdl = JAG.postalService(urlsApi.sendMailService_gdl_JAG, dataForm_service_gdl);

        form_ser_gdl.success(function(data){
            console.log("Correo Enviado...");
            console.log(data);

            JAG.resetForm('#form_jag_service_gdl');

            Finch.navigate('/');
            console.log(Finch);

        });
        form_ser_gdl.error(function(data){
            console.log("Correo no Enviado...");
            console.log(data);
            JAG.resetForm('#form_jag_service_gdl');
            //JAG.setValue('#').val('');
        });
    }
}
var serviceMethods_country = {
    clickSend: function(event) {
        var form_ser_country, dataForm_service_country;

        dataForm_service_country = $('#form_jag_service_country').serializeFormJSON();

        console.log(urlsApi.sendMailService_country_JAG, dataForm_service_country);

        form_ser_country = JAG.postalService(urlsApi.sendMailService_country_JAG, dataForm_service_country);

        form_ser_country.success(function(data){
            console.log("Correo Enviado...");
            console.log(data);

            JAG.resetForm('#form_jag_service_country');

            Finch.navigate('/');
            console.log(Finch);

        });
        form_ser_country.error(function(data){
            console.log("Correo no Enviado...");
            console.log(data);
            JAG.resetForm('#form_jag_service_country');
            //JAG.setValue('#').val('');
        });
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

// LAB

var initLABMethods = {
    initLAB : function () {


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
