var domEl, tempsNames, urlsApi;
domEl = {
	"action_before_buy_expand_header":"a.before-buy.expand-header",
	"action_financing_expand_header":"a.financing.expand-header",
	"action_model_expand_header":"a.model.expand-header",
	"action_owners_expand_header":"a.owners.expand-header",
	"button_close_before_buy_panel_menu":"a#close-before-buy-panel",
	"button_close_financing_panel_menu":"a#close-financing-panel",
	"button_close_model_panel_menu":"a#close-models-panel",
	"button_close_owners_panel_menu":"a#close-owners-panel",
	"button_go_catalogs":"a#go-catalogs",
	"button_go_concesionaries":"a#go-concesionaries",
	"button_go_contact":"a#go-contact",
	"button_go_group":"a#go-group",
	"button_go_legal_terms":"a#go-legal-terms",
	"button_go_privacy_notice":"a#go-privacy-notice",
	"button_return_index":"a#return-index",
	"button_specifications_controls":"a.specifications-controls",
	"div_content_phone_call":"div#phone-call",
	"div_content_section_form_contact":"div#content-section-form-contact",
	"div_content_section_model_promo":"div#content-section-model-promo",
	"div_content_section_slider_home":"div#content-section-slider-home",
	"div_content_social_bar":"div#content-social-bar",
	"div_header_panel":"div.header-panel",
	"div_hidden_inputs_concessionaires":"div#content-inputs-concessionaires",
	"div_hidden_inputs_session":"div#hidden-inputs-session",
	"div_hidden_inputs_temporal":"div#hidden-inputs-temporal",
	"div_recurrent":"div#content-temporal-interactive",
	"div_recurrent_accesories_section_model":"#accesories-section-model",
	"div_recurrent_body":"body#recurrent-body",
	"div_recurrent_concessionaires_mobile":"#content-concessionaires-list",
	"div_recurrent_concessionaires_mobile_data":"#concessionaires-data",
	"div_recurrent_concessionaires_mobile_list":"#concessionaires-list",
	"div_recurrent_concessionaires_mobile_map":"#concessionaires-map",
	"div_recurrent_concessionaires_nomobile":"#content-concessionaires-list",
	"div_recurrent_concessionaires_nomobile_data":"#concessionaires-data",
	"div_recurrent_concessionaires_nomobile_list":"#concessionaires-list",
	"div_recurrent_concessionaires_nomobile_map":"#concessionaires-map",
	"div_recurrent_features_section_model":"#features-section-model",
	"div_recurrent_full_size_section_model":"#full-size-section-model",
	"div_recurrent_funding_by_model_form":"#content_funding_by_model_form",
	"div_recurrent_funding_general_form":"#content_funding_general_form",
	"div_recurrent_funding_version_tabs":"#funding-versions-tabs",
	"div_recurrent_galery_section_model":"#galery-section-model",
	"div_recurrent_head":"head#recurrent-head",
	"div_recurrent_info_concessionaire_data_wrapper":"#content-info-concessionaire-data-wrapper",
	"div_recurrent_instant_drive_section":"div#instant-drive-section",
	"div_recurrent_panel_menu":"div#header-sections-wrapper",
	"div_recurrent_prices_section_model":"#prices-section-model",
	"div_recurrent_select_list_by_model":"#content-select-list-by-model",
	"div_recurrent_test_drive_section":"div#content-test-drive-section",
	"div_recurrent_test_drive_section_model":"#test-drive-section-model",
	"div_recurrent_test_drive_selection_section":"div#content-section-form-test-drive-selection",
	"header_before_buy_button":"a#header-before-buy-button",
	"header_financing_button":"a#header-financing-button",
	"header_models_button":"a#header-models-button",
	"header_owners_button":"a#header-owners-button",
	"link_content_add_styles":"div#content-add-styles",
	"link_content_add_styles_catalog":"#content-add-styles-catalog",
	"link_content_add_styles_contact":"#content-add-styles-contact",
	"link_content_add_styles_home":"#content-add-styles-home",
	"link_content_add_styles_models_home":"#content-add-styles-models-home",
	"model_gama_class":"a.gama-model",
	"model_gama_id":"#go-model-",
	"models_header_recurrent":"#content-models-header",
	"models_section_recurrent":"#content-sections-models",
	"suk_animate_header_spacer":"#header-spacer",
	"suk_catalog_cars_wrapper":".catalog_cars_wrapper",
	"suk_resize_header_panel":"#header-panel",
	"suk_switch_catalog":"a.switch-catalog",
	"validate_change":".validate_change",
	"validate_input":".validate_input"
};
tempsNames = {
	"concessionaires_mobile":"tmp_section_block_concessionaires_mobile",
	"concessionaires_normal":"tmp_section_block_concessionaires_normal",
	"model_ciaz":"tmp_section_content_model_ciaz",
	"model_grand_vitara":"tmp_section_content_model_grand_vitara",
	"model_kizashi":"tmp_section_content_model_kizashi",
	"model_s_cross":"tmp_section_content_model_s_cross",
	"model_swift":"tmp_section_content_model_swift",
	"model_swift_sport":"tmp_section_content_model_swift_sport",
	"model_sx4_crossover":"tmp_section_content_model_sx4_crossover",
	"model_sx4_sedan":"tmp_section_content_model_sx4_sedan",
	"tmp_content_concessionaires_list":"tmp_content_concessionaires_list",
	"tmp_content_link_style":"tmp_content_link_style",
	"tmp_content_models_menu":"tmp_content_models_menu",
	"tmp_financing_by_model":"tmp_financing_by_model",
	"tmp_financing_ciaz":"tmp_financing_ciaz",
	"tmp_financing_grand_vitara":"tmp_financing_grand_vitara",
	"tmp_financing_kizashi":"tmp_financing_kizashi",
	"tmp_financing_scross":"tmp_financing_scross",
	"tmp_financing_select_list_by_model":"tmp_financing_select_list_by_model",
	"tmp_financing_swift":"tmp_financing_swift",
	"tmp_financing_swift_sport":"tmp_financing_swift_sport",
	"tmp_form_contact":"tmp_form_contact",
	"tmp_form_financing_by_model":"tmp_form_financing_by_model",
	"tmp_form_financing_general":"tmp_form_financing_general",
	"tmp_funding_version_tabs":"tmp_funding_version_tabs",
	"tmp_info_concessionaire_data_wrapper":"tmp_info_concessionaire_data_wrapper",
	"tmp_instant_drive_section":"tmp_instant_drive_section",
	"tmp_mobile_menu":"tmp_mobile_menu",
	"tmp_model_promo":"tmp_model_promo",
	"tmp_models_menu":"tmp_models_menu",
	"tmp_panel_menu_before_buy":"tmp_panel_menu_before_buy",
	"tmp_panel_menu_financing":"tmp_panel_menu_financing",
	"tmp_panel_menu_models":"tmp_panel_menu_models",
	"tmp_panel_menu_owners":"tmp_panel_menu_owners",
	"tmp_phone_call":"tmp_phone_call",
	"tmp_section_block_concessionaires_mobile":"tmp_section_block_concessionaires_mobile",
	"tmp_section_block_concessionaires_normal":"tmp_section_block_concessionaires_normal",
	"tmp_section_content_catalogs":"tmp_section_content_catalogs",
	"tmp_section_content_concesionaries":"tmp_section_content_concesionaries",
	"tmp_section_content_contact_us":"tmp_section_content_contact_us",
	"tmp_section_content_group":"tmp_section_content_group",
	"tmp_section_content_home":"tmp_section_content_home",
	"tmp_section_content_legal_terms":"tmp_section_content_legal_terms",
	"tmp_section_content_models_selection":"tmp_section_content_models_selection",
	"tmp_section_content_privacy_notice":"tmp_section_content_privacy_notice",
	"tmp_section_content_reasons":"tmp_section_content_reasons",
	"tmp_section_content_test_drive_general":"tmp_section_content_test_drive_general",
	"tmp_section_content_test_drive_selection":"tmp_section_content_test_drive_selection",
	"tmp_section_content_warranty":"tmp_section_content_warranty",
	"tmp_section_test_drive_general":"tmp_section_test_drive_general",
	"tmp_slider_home":"tmp_slider_home",
	"tmp_social_bar":"tmp_social_bar",
	"tmp_test_drive_model":"tmp_test_drive_model"
};
urlsApi = {
	"addConcesionaries":"api/v1/add/concesionarias",
	"addGamaModelos":"api/v1/add/modelos_gama",
	"addModelos":"api/v1/add/modelos",
	"sendContact":"api/v1/post/contacto",
	"sendFinancingByModelCiaz":"api/v1/post/financiamiento/ciaz",
	"sendFinancingByModelGrandVitara":"api/v1/post/financiamiento/grand-vitara",
	"sendFinancingByModelKizashi":"api/v1/post/financiamiento/kizashi",
	"sendFinancingByModelSCross":"api/v1/post/financiamiento/s-cross",
	"sendFinancingByModelSwift":"api/v1/post/financiamiento/swift",
	"sendFinancingByModelSwiftSport":"api/v1/post/financiamiento/swift-sport",
	"sendFinancingGeneral":"api/v1/post/financiamiento",
	"sendTestDriveModel":"api/v1/post/model/test-drive"
};
