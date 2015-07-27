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
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrHome();
            SUK.setHTML(domEl.div_content_phone_call, '');
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/concesionarias', {
        setup: function(bindings) {
            section="concesionaries";
            //ga('send', 'pageview', '/concesionarias');
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/catalogos', {
        setup: function(bindings) {
            section="catalog";
            //ga('send', 'pageview', '/catalogos');
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
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrCatalog();
            SUK.setHTML( domEl.div_content_social_bar, '');
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/contactanos', {
        setup: function(bindings) {
            section="contact";
            //ga('send', 'pageview', '/contactanos');
            addStylesMethods.addStyleContact();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_contact_us, domEl.div_recurrent);
            formContactMethods.refreshForm();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrContact();
            SUK.setHTML(domEl.div_recurrent, '');    }
    });
    Finch.route('/grupo', {
        setup: function(bindings) {
            section="group";
            //ga('send', 'pageview', '/grupo');
            addStylesMethods.addStyleGroup();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_group, domEl.div_recurrent);
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrGroup();
            SUK.setHTML(domEl.div_recurrent, '');    }
    });
    Finch.route('/aviso-de-privacidad', {
        setup: function(bindings) {
            section="privacy";
            //ga('send', 'pageview', '/aviso-de-privacidad');
            addStylesMethods.addStyleLegals();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_privacy_notice, domEl.div_recurrent);
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrLegals();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/terminos-legales', {
        setup: function(bindings) {
            section="legals";
            //ga('send', 'pageview', '/terminos-legales');
            addStylesMethods.addStyleLegals();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_legal_terms, domEl.div_recurrent);
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrLegals();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/swift-sport', {
        setup: function(bindings) {
            section="swift-sport";
            //ga('send', 'pageview', '/swift-sport');
            addStylesMethods.addStyleModel_swift_sport();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, domEl.models_header_recurrent);
            SUK.loadTemplate(tempsNames.model_swift_sport, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_swift_sport();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/swift', {
        setup: function(bindings) {
            section="swift";
            //ga('send', 'pageview', '/swift');
            addStylesMethods.addStyleModel_swift();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_swift, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_swift();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    /*Finch.route('/sx4-crossover', {
        setup: function(bindings) {
            section="sx4-crossover";
            //ga('send', 'pageview', '/sx4-crossover');
            addStylesMethods.addStyleModel_sx4_crossover();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_sx4_crossover, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_sx4_crossover();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/sx4-sedan', {
        setup: function(bindings) {
            section="sx4-sedan";
            //ga('send', 'pageview', '/sx4-sedan');
            addStylesMethods.addStyleModel_sx4_sedan();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_sx4_sedan, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_sx4_sedan();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });*/
    Finch.route('/kizashi', {
        setup: function(bindings) {
            section="kizashi";
            //ga('send', 'pageview', '/kizashi');
            addStylesMethods.addStyleModel_kizashi();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_kizashi, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_kizashi();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/grand-vitara', {
        setup: function(bindings) {
            section="grand-vitara";
            //ga('send', 'pageview', '/grand-vitara');
            addStylesMethods.addStyleModel_grand_vitara();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_grand_vitara, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_grand_vitara();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/s-cross', {
        setup: function(bindings) {
            section="s-cross";
            //ga('send', 'pageview', '/s-cross');
            addStylesMethods.addStyleModel_s_cross();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_s_cross, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_s_cross();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/ciaz', {
        setup: function(bindings) {
            section="ciaz";
            //ga('send', 'pageview', '/ciaz');
            addStylesMethods.addStyleModel_ciaz();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_ciaz, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_test_drive_model, domEl.div_recurrent_test_drive_section);
            modelsMenuMethods.changeNameModel();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_ciaz();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/agendar-prueba-de-manejo', {
        setup: function(bindings) {
            section="test_drive";
            //ga('send', 'pageview', '/agendar-prueba-de-manejo');
        },
        load: function(bindings) {
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
Finch.listen();
