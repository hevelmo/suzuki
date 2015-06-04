/* ----------------------------------- *\
 [Route] The Highway
\* ----------------------------------- */

Finch.route('/', {
    setup: function(bindings) {
        section="index";
        addStylesMethods.addStyleIndex();
        SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {
        var header_button;
        //This code will be not used it's only example, remove it later
        SUK.loadTemplate(tempsNames.tmp_section_content_home, domEl.div_recurrent);
        SUK.loadTemplate(tempsNames.tmp_slider_home, domEl.div_content_section_slider_home);
        SUK.loadTemplate(tempsNames.tmp_model_promo, domEl.div_content_section_model_promo);
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrHome();
        SUK.setHTML(domEl.div_content_phone_call, '');
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/concesionarias', {
    setup: function(bindings) {
        section="concesionaries";
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {

    },
    unload: function(bindings) {
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/catalogos', {
    setup: function(bindings) {
        section="catalog";
        addStylesMethods.addStyleCatalogs();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {
        //This code will be not used it's only example, remove it later
        SUK.loadTemplate(tempsNames.tmp_section_content_catalogs, domEl.div_recurrent);
        catalogMethods.pageTransitionCatalog();
        addDelegatMethods.transitions();
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrCatalog();
        SUK.setHTML( domEl.div_content_social_bar, '');
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});

Finch.route('/contactanos', {
    setup: function(bindings) {
        section="contact";
        addStylesMethods.addStyleContact();
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {
        //This code will be not used it's only example, remove it later
        SUK.loadTemplate(tempsNames.tmp_section_content_contact_us, domEl.div_recurrent);
        SUK.loadTemplate(tempsNames.tmp_form_contact, domEl.div_content_section_form_contact);
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrContact();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');    }
});

Finch.listen();
