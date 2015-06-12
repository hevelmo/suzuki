/*
    In this section will be added some necessary functions and code when
    the page loads and is ready.
    The manage of the DOM elements events will be here too.
*/

$(document).ready(function() {
    // Add favicon
    window.onload = function() {
      favicon.change("img/favicon.ico");
      // Uncomment to see how change() will cancel the animation
       setTimeout(function() { favicon.change("img/favicon.ico") }, 10000);
    }
    $("#header-panel").resize(function(){
        var _this = $(this);
        $('#header-spacer').stop().animate({height: _this.height()}, 300);
    });



    $('.catalog_cars_wrapper').delegate('a.switch-catalog', 'click', addDelegatMethods.delegate);
    /*$('.catalog_cars_wrapper').delegate('a.switch-catalog', 'click', function( e ){
        e.preventDefault();
        var car_key = $(this).data('key');
        var slide = $("#catalog-"+ car_key);
        $('.catalog_car').removeClass('active');
        $(this).parent('.catalog_car').addClass('active');
        pages.move_to( slide );
    });*/


    /* ------------------------------------------------------ *\
     [METHOS Control] Serialize Form
    \* ------------------------------------------------------ */

    //This method change a form into a JSON
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    /* ------------------------------------------------------ *\
     [METHOS Control] Currency Format
    \* ------------------------------------------------------ */

    Number.prototype.format = function(n, x) {
        var re = '(\\d)(?=(\\d{' + (x || 3) + '}) + ' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
    };

    /* ------------------------------------------------------ *\
        EVENT CONTROL
    \* ------------------------------------------------------ */

    //Make a group of events for each url defined in room.js, each one of
    //These events has to be handled by one of the methods defined in the related
    //Group in methods.js

    /* ------------------------------------------------------ *\
     [Methods] DEMO'
    \* ------------------------------------------------------ */

    //This group of events will not be used, they are only example, remove later

    // CLICK INDEX
    $(domEl.div_recurrent_body).on('click', domEl.button_return_index, actionMenuBarsMethods.clickReturnIndex);
    // CLICK GROUP
    $(domEl.div_recurrent_body).on('click', domEl.button_go_group, actionMenuBarsMethods.clixkGoGroup);
    // CLICK CONCESONARIES
    $(domEl.div_recurrent_body).on('click', domEl.button_go_concesionaries, actionMenuBarsMethods.clickGoConcesinary);
    // CLICK CATALOGS
    $(domEl.div_recurrent_body).on('click', domEl.button_go_catalogs, actionMenuBarsMethods.clickGoCatalogs);
    // CLICK CONTACT US
    $(domEl.div_recurrent_body).on('click', domEl.button_go_contact, actionMenuBarsMethods.clickGoContactUs);

    // HEADER PANEL
    $(domEl.div_recurrent_body).on('click', 'a.expand-header', openPanelMenuMethods.clickPanel_general);
    // CLICK MODEL
    $(domEl.div_recurrent_body).on('click', domEl.header_models_button, openPanelMenuMethods.clickModelsPanel);
    // CLICK FINNANCING
    $(domEl.div_recurrent_body).on('click', domEl.header_financing_button, openPanelMenuMethods.clickFinnacingPanel);
    // CLICK OWNERS
    $(domEl.div_recurrent_body).on('click', domEl.header_owners_button, openPanelMenuMethods.clickOwnersPanel);
    // CLICK BEFORE BYU
    $(domEl.div_recurrent_body).on('click', domEl.header_before_buy_button, openPanelMenuMethods.clickBeforeByPanel);
    // CLICK CLOSE PANEL
    $(domEl.div_recurrent_body).on('click', domEl.button_close_model_panel_menu, closePanelMenuMethods.closePanelModels);
    $(domEl.div_recurrent_body).on('click', domEl.button_close_financing_panel_menu, closePanelMenuMethods.closePanelFinancing);
    $(domEl.div_recurrent_body).on('click', domEl.button_close_owners_panel_menu, closePanelMenuMethods.closePanelOwners);
    $(domEl.div_recurrent_body).on('click', domEl.button_close_before_buy_panel_menu, closePanelMenuMethods.closePanelBeforeBuy);

    // MOBILE MENU
    $(domEl.div_recurrent_body).on('click', "#header-mobile i", is_mobileMethods.clickHeaderMobile);
    $(domEl.div_recurrent_body).on('click', "#mobile-menu a", is_mobileMethods.clickMobileMenuLink);
    $(domEl.div_recurrent_body).on('click', "#footer-content .row-1 .footer-column", is_mobileMethods.clickFooterContent);
    $(domEl.div_recurrent_body).on('click', ".header-column", is_mobileMethods.clickHeaderColumn);
    $(domEl.div_recurrent_body).on('click', ".back-list-arrow", is_mobileMethods.clickBackListArrow);

    //Specifications Slider controls and functionality
    var specifications_i = 0;
    var specifications_total =  $('.specifications-wrapper .specification').length - 1;
    $(domEl.div_recurrent).on('click', domEl.button_specifications_controls, function( e ){
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
});
