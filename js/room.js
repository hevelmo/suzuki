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
        SUK.loadTemplate(tempsNames.tmp_section_content_contact_us, domEl.div_recurrent);
        formContactMethods.refreshForm();
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrContact();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');    }
});
Finch.route('/grupo', {
    setup: function(bindings) {
        section="group";
        addStylesMethods.addStyleGroup();
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_section_content_group, domEl.div_recurrent);
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrGroup();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');    }
});

Finch.route('/aviso-de-privacidad', {
    setup: function(bindings) {
        section="privacy";
        addStylesMethods.addStyleLegals();
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_section_content_privacy_notice, domEl.div_recurrent);
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrLegals();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});

Finch.route('/terminos-legales', {
    setup: function(bindings) {
        section="legals";
        addStylesMethods.addStyleLegals();
        is_mobileMethods.is_mobile();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_section_content_legal_terms, domEl.div_recurrent);
    },
    unload: function(bindings) {
        addStylesMethods.cleanAttrLegals();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/swift-sport', {
    setup: function(bindings) {
        section="swift-sport";
        addStylesMethods.addStyleModel_swift_sport();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_swift_sport, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_swift_sport();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/swift', {
    setup: function(bindings) {
        section="swift";
        addStylesMethods.addStyleModel_swift();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_swift, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_swift();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
/*Finch.route('/sx4-crossover', {
    setup: function(bindings) {
        section="sx4-crossover";
        addStylesMethods.addStyleModel_sx4_crossover();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_sx4_crossover, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_sx4_crossover();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/sx4-sedan', {
    setup: function(bindings) {
        section="sx4-sedan";
        addStylesMethods.addStyleModel_sx4_sedan();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_sx4_sedan, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_sx4_sedan();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});*/
Finch.route('/kizashi', {
    setup: function(bindings) {
        section="kizashi";
        addStylesMethods.addStyleModel_kizashi();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_kizashi, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_kizashi();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/grand-vitara', {
    setup: function(bindings) {
        section="grand-vitara";
        addStylesMethods.addStyleModel_grand_vitara();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_grand_vitara, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_grand_vitara();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/s-cross', {
    setup: function(bindings) {
        section="s-cross";
        addStylesMethods.addStyleModel_s_cross();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_s_cross, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_s_cross();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});
Finch.route('/ciaz', {
    setup: function(bindings) {
        section="ciaz";
        addStylesMethods.addStyleModel_ciaz();
        SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
        is_mobileMethods.is_mobile();
        modelsMenuMethods.addModelSectionArrow();
        //modelsMenuMethods.scrollSwitchMethod();
    },
    load: function(bindings) {
        SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
        SUK.loadTemplate(tempsNames.model_ciaz, domEl.div_recurrent);
        modelsMenuMethods.changeNameModel();
    },
    unload: function(bindings) {
        SUK.setHTML( domEl.div_content_social_bar, '');
        addStylesMethods.cleanAttrModel_ciaz();
        //It's always necessary, when an url is left, to clean the html content
        //of the recurrent div, where all the templates are inserted
        SUK.setHTML(domEl.div_recurrent, '');
    }
});

Finch.listen();
