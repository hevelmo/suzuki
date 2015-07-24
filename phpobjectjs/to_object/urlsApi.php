<?php

function urlsApi() {
    //Especial Actions
    $new = 'new';
    $del = 'del';
    $set = 'set';
    $get = 'get';
    $post = 'post';
    $search = 'search';

    //
    $det = 'detail';

    //Tables
    $tab = 'table';

    //Root Api url
    $root = 'api/v1';

    return array(
        // INSERT
        //'new_tab' => $root . '/' . $new . '/' . $tab,

        // UPDATE
        //'set_tab_id' => $root . '/' . $set . '/' . $tab . '/',

        // SELECT
        //'get_tab' => $root . '/' . $get . '/' . $tab,
        //'get_tab_id' => $root . '/' . $get . '/' . $tab . '/',

        // DELETE
        //'del_tab_id' => $root . '/' . $del . '/' . $tab . '/',

        'addCarMainModel' => $root . '/add/car_main_model/',
        'addConcesionaries' => $root . '/add/concesionaries',
        'addModelos' => $root . '/add/models',
        'addGamaModelos' => $root . '/add/gama_modelos',

        'sendContact' => $root . 'post/contacto'
    );
}
