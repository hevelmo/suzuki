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

        'addConcesionaries' => $root . '/add/concesionaries',
        'addModelos' => $root . '/add/modelos',
        'addGamaModelos' => $root . '/add/gama_modelos',

        'sendContact' => $root . '/post/contacto',
        'sendTestDriveModel' => $root . '/post/model/test-drive',
        'sendFinancingGeneral' => $root . '/post/financiamiento',
        /*
        'sendFinancingByModel' => $root . '/post/financiamiento/',
        */
        'sendFinancingByModelSwiftSport' => $root . '/post/financiamiento/swift-sport',
        'sendFinancingByModelSwift' => $root . '/post/financiamiento/swift',
        'sendFinancingByModelKizashi' => $root . '/post/financiamiento/kizashi',
        'sendFinancingByModelGrandVitara' => $root . '/post/financiamiento/grand-vitara',
        'sendFinancingByModelSCross' => $root . '/post/financiamiento/s-cross',
        'sendFinancingByModelCiaz' => $root . '/post/financiamiento/ciaz'
    );
}
