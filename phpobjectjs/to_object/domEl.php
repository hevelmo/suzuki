<?php

function domEl() {
    return array(
        // BODY
        'div_recurrent_head' => 'head#recurrent-head',
        'div_recurrent_body' => 'body#recurrent-body',
        'link_content_add_styles' => 'div#content-add-styles',
        'link_content_add_styles_home' => '#content-add-styles-home',
        'link_content_add_styles_models_home' => '#content-add-styles-models-home',
        'link_content_add_styles_catalog' => '#content-add-styles-catalog',
        'link_content_add_styles_contact' => '#content-add-styles-contact',
    	//GENERAL HI DIVS
    	'div_hidden_inputs_session' => 'div#hidden-inputs-session',
    	'div_hidden_inputs_temporal' => 'div#hidden-inputs-temporal',
        // SOCIL BAR
        'div_content_social_bar' => 'div#content-social-bar',
        // PHONE
        'div_content_phone_call' => 'div#phone-call',
        // PANEL MENU
        'div_header_panel' => 'div.header_panel',
        'div_recurrent_panel_menu' => 'div#header-sections-wrapper',
        'button_close_model_panel_menu' => 'a#close-models-panel',
        'button_close_financing_panel_menu' => 'a#close-financing-panel',
        'button_close_owners_panel_menu' => 'a#close-owners-panel',
        'button_close_before_buy_panel_menu' => 'a#close-before-buy-panel',
        // CLICK INDEX
        'button_return_index' => 'a#return-index',
        // CLICK GRUPO
        'button_go_group' => 'a#go-group',
        // CLICK CONCESIONARIES
        'button_go_concesionaries' => 'a#go-concesionaries',
        // CLICK CATALOGS
        'button_go_catalogs' => 'a#go-catalogs',
        // CLICK CONTACT US
        'button_go_contact' => 'a#go-contact',
        // BUTONS CONTROL PANEL MENU
        // BUTONS OPEN PANEL MENU
        'action_model_expand_header' => 'a.model.expand-header',
        'action_financing_expand_header' => 'a.financing.expand-header',
        'action_owners_expand_header' => 'a.owners.expand-header',
        'action_before_buy_expand_header' => 'a.before-buy.expand-header',
        'header_models_button' => 'a#header-models-button',
        'header_financing_button' => 'a#header-financing-button',
        'header_owners_button' => 'a#header-owners-button',
        'header_before_buy_button' => 'a#header-before-buy-button',

        // CONTENT
        'div_recurrent' => 'div#content-temporal-interactive',
        // CONTENT SECTION HOME
        'div_content_section_slider_home' => 'div#content-section-slider-home',
        'div_content_section_model_promo' => 'div#content-section-model-promo',
        // CONTROLS SLIDER
        'button_specifications_controls' => 'a.specifications-controls',
        // CONTENT SECTION FORM CONTACT
        'div_content_section_form_contact' => 'div#content-section-form-contact',

    	//DEMO ELEMENTS
    	//they will not be used in the ral project, romove it later and compile 'phpobjectjs'
    	'select_lan_demo' => 'select#lan-demo',
    	'h1_demo_hello' => 'h1#demo-hello',
    	'h3_demo_date' => 'h3#demo-date'
    );
}
