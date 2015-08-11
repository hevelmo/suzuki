/* ----------------------------------- *\
 [Route] The Highway
\* ----------------------------------- */
    Finch.route('/', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="index";
            detectNavigatorMethods.IE10();
            addStylesMethods.addStyleIndex();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_home, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_slider_home, domEl.div_content_section_slider_home);
            SUK.loadTemplate(tempsNames.tmp_model_promo, domEl.div_content_section_model_promo);

            //concessinairesTextMethods.getConcessionaireById('1');
            //init_geo_core();
            catalogMethods.addAttrCatalog();
            catalogMethods.addAttrCatalog();
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
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="concesionaries";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/concesionarias');
            addStylesMethods.addStyleConcessionaries();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_concesionaries, domEl.div_recurrent);
            //SUK.loadTemplate(tempsNames.tmp_content_concessionaires_list, domEl.div_recurrent_concessionaires_list);
            concessionairesMethods.get_concessionaries_list();
            SUK.loadTemplate(tempsNames.tmp_info_concessionaire_data_wrapper, domEl.div_recurrent_info_concessionaire_data_wrapper);
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrConcessionaries();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/catalogos/:model', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="catalog";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/catalogos/:model');
            addStylesMethods.addStyleCatalogs();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            changeInputsMethods.clickChangeCheckbox();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            var model_catalog;
            model_catalog = bindings.model;
            switch (model_catalog) {
                case 'swift-sport':
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        //console.log('You are using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 112}, 800 , 'easeOutSine');
                    } else {
                        //console.log('You are not using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 0}, 800 , 'easeOutSine');
                    }
                    $('#data-swift-sport').on('click', catalogMethods.preventDefault_data_swift_sport);
                    $('#footer-data-swift-sport').on('click', catalogMethods.footer_preventDefault_data_swift_sport);
                break;
                case 'swift':
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        //console.log('You are using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 255}, 800 , 'easeOutSine');
                    } else {
                        //console.log('You are not using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 655}, 800 , 'easeOutSine');
                    }
                    $('#data-swift').on('click', catalogMethods.preventDefault_data_swift);
                    $('#footer-data-swift').on('click', catalogMethods.footer_preventDefault_data_swift);
                break;
                case 'kizashi':
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        //console.log('You are using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 398}, 800 , 'easeOutSine');
                    } else {
                        //console.log('You are not using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 1310}, 800 , 'easeOutSine');
                    }
                    $('#data-kizashi').on('click', catalogMethods.preventDefault_data_kizashi);
                    $('#footer-data-kizashi').on('click', catalogMethods.footer_preventDefault_data_kizashi);
                break;
                case 's-cross':
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        //console.log('You are using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 541}, 800 , 'easeOutSine');
                    } else {
                        //console.log('You are not using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 1965}, 800 , 'easeOutSine');
                    }
                    $('#data-s-cross').on('click', catalogMethods.preventDefault_data_s_cross);
                    $('#footer-data-s-cross').on('click', catalogMethods.footer_preventDefault_data_s_cross);
                break;
                case 'grand-vitara':
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        //console.log('You are using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 668}, 800 , 'easeOutSine');
                    } else {
                        //console.log('You are not using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 2620}, 800 , 'easeOutSine');
                    }
                    $('#data-grand-vitara').on('click', catalogMethods.preventDefault_data_grand_vitara);
                    $('#footer-data-grand-vitara').on('click', catalogMethods.footer_preventDefault_data_grand_vitara);
                break;
                case 'ciaz':
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        //console.log('You are using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 812}, 800 , 'easeOutSine');
                    } else {
                        //console.log('You are not using a mobile device!');
                        $('html,body').stop().animate({ scrollTop : 3275}, 800 , 'easeOutSine');
                    }
                    $('#data-ciaz').on('click', catalogMethods.preventDefault_data_ciaz);
                    $('#footer-data-ciaz').on('click', catalogMethods.footer_preventDefault_data_ciaz);
                break;
            }
            SUK.loadTemplate(tempsNames.tmp_section_content_catalogs, domEl.div_recurrent);
            //catalogMethods.pageTransition();
            catalogMethods.pageTransition();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
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
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="contact";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/contactanos');
            addStylesMethods.addStyleContact();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_contact_us, domEl.div_recurrent);
            formContactMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrContact();
            SUK.setHTML(domEl.div_recurrent, '');    }
    });
    Finch.route('/grupo', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="group";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/grupo');
            addStylesMethods.addStyleGroup();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_group, domEl.div_recurrent);
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrGroup();
            SUK.setHTML(domEl.div_recurrent, '');    }
    });
    Finch.route('/aviso-de-privacidad', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="privacy";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/aviso-de-privacidad');
            addStylesMethods.addStyleLegals();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_privacy_notice, domEl.div_recurrent);
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrLegals();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/terminos-legales', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="legals";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/terminos-legales');
            addStylesMethods.addStyleLegals();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_legal_terms, domEl.div_recurrent);
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrLegals();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/razones', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="reasons";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/razones');
            addStylesMethods.addStyleReasons();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_reasons, domEl.div_recurrent);
            reasonsMethods.reasons();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrReasons();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/garantia-suzuki/:warranty', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="warranty";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/garantia-suzuki/:warranty');
            addStylesMethods.addStyleWarranty();
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            var section_warranty;
            section_warranty = bindings.warranty;
            switch (section_warranty) {
                case 'ordinaria':
                    $('.main-buttons a').on('click', warrantyMethods.main_buttons);
                    $('a.close-warranty-button').on('click', warrantyMethods.close_warranty_button);
                break;
                case 'extendida':
                    $('.main-buttons a').on('click', warrantyMethods.main_buttons);
                    $('a.close-warranty-button').on('click', warrantyMethods.close_warranty_button);
                break;
            }
            SUK.loadTemplate(tempsNames.tmp_section_content_warranty, domEl.div_recurrent);
            warrantyMethods.warranty();
            warrantyMethods.auto_open();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            cleanStyleMethods.cleanAttrWarranty();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/swift-sport', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = 'modelos';
            section="swift-sport";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/swift-sport');
            addStylesMethods.addStyleModel_swift_sport();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            /*SUK.appendOne('div#content-section-models-header', 'div', {'id': 'models-header'}, '', 1);
            SUK.appendOne('div#models-header', 'div', {'id': 'content-models-header'}, '', 1);*/

            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_swift_sport, domEl.div_recurrent);
            formTestDriveMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML('#content-section-models-header', '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_swift_sport();
            SUK.setHTML(domEl.div_recurrent, '');

            $('#header-zone').removeAttr( "style" );
            $('#regular-header').removeAttr( "style" );
            $('#logo-wrapper').removeAttr( "style" );
            lugar = '';        }
    });
    Finch.route('/swift', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = 'modelos';
            section="swift";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/swift');
            addStylesMethods.addStyleModel_swift();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            /*SUK.appendOne('div#content-section-models-header', 'div', {'id': 'models-header'}, '', 1);
            SUK.appendOne('div#models-header', 'div', {'id': 'content-models-header'}, '', 1);*/

            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_swift, domEl.div_recurrent);
            formTestDriveMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML('#content-section-models-header', '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_swift();
            SUK.setHTML(domEl.div_recurrent, '');

            $('#header-zone').removeAttr( "style" );
            $('#regular-header').removeAttr( "style" );
            $('#logo-wrapper').removeAttr( "style" );
            lugar = '';        }
    });
    Finch.route('/kizashi', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = 'modelos';
            section="kizashi";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/kizashi');
            addStylesMethods.addStyleModel_kizashi();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            /*SUK.appendOne('div#content-section-models-header', 'div', {'id': 'models-header'}, '', 1);
            SUK.appendOne('div#models-header', 'div', {'id': 'content-models-header'}, '', 1);*/

            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_kizashi, domEl.div_recurrent);
            formTestDriveMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML('#content-section-models-header', '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_kizashi();
            SUK.setHTML(domEl.div_recurrent, '');

            $('#header-zone').removeAttr( "style" );
            $('#regular-header').removeAttr( "style" );
            $('#logo-wrapper').removeAttr( "style" );
            lugar = '';        }
    });
    Finch.route('/grand-vitara', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = 'modelos';
            section="grand-vitara";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/grand-vitara');
            addStylesMethods.addStyleModel_grand_vitara();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            /*SUK.appendOne('div#content-section-models-header', 'div', {'id': 'models-header'}, '', 1);
            SUK.appendOne('div#models-header', 'div', {'id': 'content-models-header'}, '', 1);*/

            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_grand_vitara, domEl.div_recurrent);
            formTestDriveMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML('#content-section-models-header', '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_grand_vitara();
            SUK.setHTML(domEl.div_recurrent, '');

            $('#header-zone').removeAttr( "style" );
            $('#regular-header').removeAttr( "style" );
            $('#logo-wrapper').removeAttr( "style" );
            lugar = '';        }
    });
    Finch.route('/s-cross', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = 'modelos';
            section="s-cross";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/s-cross');
            addStylesMethods.addStyleModel_s_cross();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            /*SUK.appendOne('div#content-section-models-header', 'div', {'id': 'models-header'}, '', 1);
            SUK.appendOne('div#models-header', 'div', {'id': 'content-models-header'}, '', 1);*/

            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_s_cross, domEl.div_recurrent);
            formTestDriveMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML('#content-section-models-header', '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_s_cross();
            SUK.setHTML(domEl.div_recurrent, '');

            $('#header-zone').removeAttr( "style" );
            $('#regular-header').removeAttr( "style" );
            $('#logo-wrapper').removeAttr( "style" );
            lugar = '';        }
    });
    Finch.route('/ciaz', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = 'modelos';
            section="ciaz";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/ciaz');
            addStylesMethods.addStyleModel_ciaz();
            SUK.loadTemplate(tempsNames.tmp_social_bar, domEl.div_content_social_bar);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            /*SUK.appendOne('div#content-section-models-header', 'div', {'id': 'models-header'}, '', 1);
            SUK.appendOne('div#models-header', 'div', {'id': 'content-models-header'}, '', 1);*/

            SUK.loadTemplate(tempsNames.tmp_models_menu, '#content-models-header');
            SUK.loadTemplate(tempsNames.model_ciaz, domEl.div_recurrent);
            formTestDriveMethods.refreshForm();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML('#content-section-models-header', '');
            SUK.setHTML( domEl.div_content_social_bar, '');
            cleanStyleMethods.cleanAttrModel_ciaz();
            SUK.setHTML(domEl.div_recurrent, '');

            $('#header-zone').removeAttr( "style" );
            $('#regular-header').removeAttr( "style" );
            $('#logo-wrapper').removeAttr( "style" );
            lugar = '';        }
    });
    Finch.route('/financiamiento', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_panel_menu_financing, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingGeneral.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/financiamiento/swift-sport', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing_swift_sport";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);

            SUK.loadTemplate(tempsNames.tmp_financing_swift_sport, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingByModelSwiftSport.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/financiamiento/swift', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing_swift";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);

            SUK.loadTemplate(tempsNames.tmp_financing_swift, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingByModelSwift.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/financiamiento/kizashi', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing_kizashi";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);

            SUK.loadTemplate(tempsNames.tmp_financing_kizashi, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingByModelKizashi.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/financiamiento/grand-vitara', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing_grand_vitara";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);

            SUK.loadTemplate(tempsNames.tmp_financing_grand_vitara, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingByModelGrandVitara.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/financiamiento/s-cross', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing_scross";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);

            SUK.loadTemplate(tempsNames.tmp_financing_scross, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingByModelSCross.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/financiamiento/ciaz', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="financing_ciaz";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_selection, domEl.div_recurrent);

            SUK.loadTemplate(tempsNames.tmp_financing_ciaz, domEl.div_recurrent_test_drive_selection_section);

            financingMethods.financing();
            formFinancingByModelCiaz.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
    Finch.route('/prueba-de-manejo', {
        setup: function(bindings) {
            // Add favicon
            window.onload = favicon.load_favicon();
            lugar = '';
            section="test_drive";
            detectNavigatorMethods.IE10();
            ga('send', 'pageview', '/agendar-prueba-de-manejo');
            addStylesMethods.addStyleTestDriveSelection();
            SUK.loadTemplate(tempsNames.tmp_phone_call, domEl.div_content_phone_call);
            is_mobileMethods.is_mobile();
        },
        load: function(bindings) {
            SUK.loadTemplate(tempsNames.tmp_section_content_test_drive_general, domEl.div_recurrent);
            SUK.loadTemplate(tempsNames.tmp_section_test_drive_general, domEl.div_recurrent_test_drive_selection_section);

            testDriveGeneralMethods.testDrivegeneral();
            //testDriveGeneralMethods.refreshFrom();
            //init_geo_core();
            catalogMethods.addAttrCatalog();
        },
        unload: function(bindings) {
            SUK.setHTML(domEl.models_header_recurrent, '');
            SUK.setHTML(domEl.div_content_phone_call, '');
            cleanStyleMethods.cleanAttrTestDriveSelection();
            SUK.setHTML(domEl.div_recurrent, '');
        }
    });
Finch.listen();
