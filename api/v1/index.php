<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include '../../incorporate/db_connect.php';
include '../../incorporate/functions.php';
include '../../incorporate/queryintojson.php';
include '../Mandrill.php';

//sec_session_start();
date_default_timezone_set('America/Mexico_City');
setlocale(LC_MONETARY, 'en_US');

/**
 *
 * [Initial V 1.0]
 *
*/
    require '../Slim/Slim.php';
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim(array(
        'mode' => 'development',
        'cookies.httponly' => true
    ));
// Only invoked if mode is "production"
    $app->configureMode('production', function () use ($app) {
        $app->config(array(
            'log.enable' => true,
            'debug' => false
        ));
    });
// Only invoked if mode is "development"
    $app->configureMode('development', function () use ($app) {
        $app->config(array(
            'log.enable' => false,
            'debug' => true
        ));
    });
/**
 * [Routes Deep V 1.0]
 */
//$app->get('/get_test', 'get_hi');
// POST route
    // app => Contacto
        $app->post('/post/contacto', 'sendContact');
    // app => Test Drive by Model
        $app->post('/post/model/test-drive', 'sendTestDriveModel');
    // app => Financing General
        $app->post('/post/financiamiento', 'sendFinancingGeneral');
// INSERT
//$app->post('/new/table', /*'mw1',*/ 'addTable');
// UPDATE
//$app->post('/set/table/:idTable', /*'mw1',*/ 'setTable');
// GET route
    // app => getModels
        //$app->get('/add/car_main_model/:car_main_model', 'addCarMainModel');
        $app->get('/add/concesionaries', 'addConcesionaries');
        $app->get('/add/modelos', 'addModelos');
        $app->get('/add/gama_modelos', 'addGamaModels');
// SELECT
//$app->get('/get/table', /*'mw1',*/ 'getTable');
// DELETE
//$app->get('/del/table/:idTable', /*'mw1',*/ 'delTable');
$app->run();
//Functions
    // GET MODELS PRICES
    function addModelos() {
        $json = file_get_contents('../data-json/financing/car_prices.json');
        echo $json;
    }
    // GET CONCESIONARIES
    function addConcesionaries() {
        $json = file_get_contents('../data-json/concessionaires/all.json');
        echo $json;
    }
    // GET GAMA MODELS
    function addGamaModels() {
        $json = file_get_contents('../data-json/models_gama/models_gama.json');
        echo $json;
    }
    // TEST DRIVE BY MODEL SUZUKI
    function sendTestDriveModel() {
        $property = requestBody();
        $send_suk_gdl_test_drive_model_date = $property->suk_gdl_test_drive_model_date;
        $send_suk_gdl_test_drive_model_name = $property->suk_gdl_test_drive_model_name;
        $send_suk_gdl_test_drive_model_lastname = $property->suk_gdl_test_drive_model_lastname;
        $send_suk_gdl_test_drive_model_email = $property->suk_gdl_test_drive_model_email;
        $send_suk_gdl_test_drive_model_tel = $property->suk_gdl_test_drive_model_tel;
        $send_suk_gdl_test_drive_model_newsletter = $property->suk_gdl_test_drive_model_newsletter;
        $send_suk_gdl_test_drive_model_modelo = $property->suk_gdl_test_drive_model_modelo;
        $send_suk_gdl_test_drive_model_concesionaria = $property->suk_gdl_test_drive_model_concesionaria;
        $send_suk_gdl_test_drive_model_image_modelo = $property->suk_gdl_test_drive_model_image_modelo;
        $send_suk_gdl_test_drive_model_subscription = $property->suk_gdl_test_drive_model_subscription;
        $send_suk_gdl_test_drive_model_auto = $property->suk_gdl_test_drive_model_auto;

        $send_suk_gdl_test_drive_model_url = "suzukigdl";

        if ($send_suk_gdl_test_drive_model_modelo =="swift-sport") {
            $send_suk_gdl_test_drive_model_auto = "Swift Sport";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_swift-sport.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="swift") {
            $send_suk_gdl_test_drive_model_auto = "Swift";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_swift.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="sx4-crossover") {
            $send_suk_gdl_test_drive_model_auto = "SX4 Crossover";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_sx4-crossover.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="sx4-sedan") {
            $send_suk_gdl_test_drive_model_auto = "SX4 Sedán";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_sx4-sedan.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="kizashi") {
            $send_suk_gdl_test_drive_model_auto = "Kizashi";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_kizashi.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="grand-vitara") {
            $send_suk_gdl_test_drive_model_auto = "Grand Vitara";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_grand-vitara.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="s-cross") {
            $send_suk_gdl_test_drive_model_auto = "S-Cross";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_s-cross.png";
        } else if ($send_suk_gdl_test_drive_model_modelo =="ciaz") {
            $send_suk_gdl_test_drive_model_auto = "Ciaz";
            $send_suk_gdl_test_drive_model_image_modelo = "suzuki_ciaz.png";
        }

        if (isset($send_suk_gdl_test_drive_model_newsletter) && $send_suk_gdl_test_drive_model_newsletter === "on") {
            $send_suk_gdl_test_drive_model_subscription = "Activado";
            send_news_test_drive_model($send_suk_gdl_test_drive_model_date, $send_suk_gdl_test_drive_model_name, $send_suk_gdl_test_drive_model_lastname, $send_suk_gdl_test_drive_model_email, $send_suk_gdl_test_drive_model_tel, $send_suk_gdl_test_drive_model_newsletter, $send_suk_gdl_test_drive_model_modelo, $send_suk_gdl_test_drive_model_concesionaria, $send_suk_gdl_test_drive_model_subscription);
        } else {
            $send_suk_gdl_test_drive_model_subscription = "Desactivado";
        }
        send_test_drive_model($send_suk_gdl_test_drive_model_date, $send_suk_gdl_test_drive_model_name, $send_suk_gdl_test_drive_model_lastname, $send_suk_gdl_test_drive_model_email, $send_suk_gdl_test_drive_model_tel, $send_suk_gdl_test_drive_model_newsletter, $send_suk_gdl_test_drive_model_modelo, $send_suk_gdl_test_drive_model_concesionaria, $send_suk_gdl_test_drive_model_image_modelo, $send_suk_gdl_test_drive_model_auto, $send_suk_gdl_test_drive_model_subscription);

        //var_dump($send_suk_gdl_test_drive_model_date, $send_suk_gdl_test_drive_model_name, $send_suk_gdl_test_drive_model_lastname, $send_suk_gdl_test_drive_model_email, $send_suk_gdl_test_drive_model_tel, $send_suk_gdl_test_drive_model_newsletter, $send_suk_gdl_test_drive_model_modelo, $send_suk_gdl_test_drive_model_concesionaria, $send_suk_gdl_test_drive_model_image_modelo, $send_suk_gdl_test_drive_model_subscription, $send_suk_gdl_test_drive_model_auto);
        echo changeArrayIntoJSON("sukpa", array('process'=>'ok'));
    }
    // CONTACT SUZUKI
    function sendContact() {
        $property = requestBody();
        $send_suk_gdl_contact_name = $property->suk_gdl_contact_name;
        $send_suk_gdl_contact_lastname = $property->suk_gdl_contact_lastname;
        $send_suk_gdl_contact_email = $property->suk_gdl_contact_email;
        $send_suk_gdl_contact_department = $property->suk_gdl_contact_department;
        $send_suk_gdl_contact_car = $property->suk_gdl_contact_car;
        $send_suk_gdl_contact_message = $property->suk_gdl_contact_message;
        $send_suk_gdl_contact_news = $property->suk_gdl_contact_news;
        $send_suk_gdl_contact_concesionary = $property->suk_gdl_contact_concesionary;
        $send_suk_gdl_contact_depto = $property->suk_gdl_contact_depto;
        $send_suk_gdl_contact_auto = $property->suk_gdl_contact_auto;
        $send_suk_gdl_contact_image_modelo = $property->suk_gdl_contact_image_modelo;
        $send_suk_gdl_contact_subscription = $property->suk_gdl_contact_subscription;

        $send_suk_gdl_contact_url = "suzukigdl";

        if ($send_suk_gdl_contact_department == "ventas") {
            $send_suk_gdl_contact_depto = "Ventas";
        } else if ($send_suk_gdl_contact_department == "servicio") {
            $send_suk_gdl_contact_depto = "Servicio";
        } else if ($send_suk_gdl_contact_department == "refacciones") {
            $send_suk_gdl_contact_depto = "Refacciones / Accesorios";
        } else if ($send_suk_gdl_contact_department == "mercadotecnia") {
            $send_suk_gdl_contact_depto = "Mercadotecnia";
        } else {
            $send_suk_gdl_contact_depto = "Otros";
        }
        if ($send_suk_gdl_contact_car =="swift-sport") {
            $send_suk_gdl_contact_auto = "Swift Sport";
            $send_suk_gdl_contact_image_modelo = "suzuki_swift-sport.png";
        } else if ($send_suk_gdl_contact_car =="swift") {
            $send_suk_gdl_contact_auto = "Swift";
            $send_suk_gdl_contact_image_modelo = "suzuki_swift.png";
        } else if ($send_suk_gdl_contact_car =="sx4-crossover") {
            $send_suk_gdl_contact_auto = "SX4 Crossover";
            $send_suk_gdl_contact_image_modelo = "suzuki_sx4-crossover.png";
        } else if ($send_suk_gdl_contact_car =="sx4-sedan") {
            $send_suk_gdl_contact_auto = "SX4 Sedán";
            $send_suk_gdl_contact_image_modelo = "suzuki_sx4-sedan.png";
        } else if ($send_suk_gdl_contact_car =="kizashi") {
            $send_suk_gdl_contact_auto = "Kizashi";
            $send_suk_gdl_contact_image_modelo = "suzuki_kizashi.png";
        } else if ($send_suk_gdl_contact_car =="grand-vitara") {
            $send_suk_gdl_contact_auto = "Grand Vitara";
            $send_suk_gdl_contact_image_modelo = "suzuki_grand-vitara.png";
        } else if ($send_suk_gdl_contact_car =="s-cross") {
            $send_suk_gdl_contact_auto = "S-Cross";
            $send_suk_gdl_contact_image_modelo = "suzuki_s-cross.png";
        } else if ($send_suk_gdl_contact_car =="ciaz") {
            $send_suk_gdl_contact_auto = "Ciaz";
            $send_suk_gdl_contact_image_modelo = "suzuki_ciaz.png";
        }


        if (isset($send_suk_gdl_contact_news) && $send_suk_gdl_contact_news === "on") {
            $send_suk_gdl_contact_subscription = "Activado";
            send_news_contact($send_suk_gdl_contact_url, $send_suk_gdl_test_drive_model_url, $send_suk_gdl_contact_name, $send_suk_gdl_contact_lastname, $send_suk_gdl_contact_email, $send_suk_gdl_contact_department, $send_suk_gdl_contact_car, $send_suk_gdl_contact_message, $send_suk_gdl_contact_news, $send_suk_gdl_contact_concesionary, $send_suk_gdl_contact_subscription);
        } else {
            $send_suk_gdl_contact_subscription = "Desactivado";
        }
        send_contact($send_suk_gdl_contact_url, $send_suk_gdl_test_drive_model_url, $send_suk_gdl_contact_name, $send_suk_gdl_contact_lastname, $send_suk_gdl_contact_email, $send_suk_gdl_contact_department, $send_suk_gdl_contact_depto, $send_suk_gdl_contact_car, $send_suk_gdl_contact_message, $send_suk_gdl_contact_news, $send_suk_gdl_contact_concesionary, $send_suk_gdl_contact_auto, $send_suk_gdl_contact_image_modelo, $send_suk_gdl_contact_subscription);

        echo changeArrayIntoJSON("sukpa", array('process'=>'ok'));
    }
    // FINANCING SUZUKI
    function sendFinancingGeneral() {
        $property = requestBody();
        $send_suk_gdl_financing_general_car_engagement = $property->suk_gdl_financing_general_car_engagement;
        $send_suk_gdl_financing_general_car_monthly_payment = $property->suk_gdl_financing_general_car_monthly_payment;
        $send_suk_gdl_financing_general_car_months = $property->suk_gdl_financing_general_car_months;
        $send_suk_gdl_financing_general_car_price = $property->suk_gdl_financing_general_car_price;
        $send_suk_gdl_financing_general_concesionarie = $property->suk_gdl_financing_general_concesionarie;
        $send_suk_gdl_financing_general_drive = $property->suk_gdl_financing_general_drive;
        $send_suk_gdl_financing_general_email = $property->suk_gdl_financing_general_email;
        $send_suk_gdl_financing_general_image_model = $property->suk_gdl_financing_general_image_model;
        $send_suk_gdl_financing_general_lastname = $property->suk_gdl_financing_general_lastname;
        $send_suk_gdl_financing_general_model_car = $property->suk_gdl_financing_general_model_car;
        $send_suk_gdl_financing_general_model_key = $property->suk_gdl_financing_general_model_key;
        $send_suk_gdl_financing_general_name = $property->suk_gdl_financing_general_name;
        $send_suk_gdl_financing_general_newsletter = $property->suk_gdl_financing_general_newsletter;
        $send_suk_gdl_financing_general_subscription = $property->suk_gdl_financing_general_subscription;
        $send_suk_gdl_financing_general_tel = $property->suk_gdl_financing_general_tel;
        $send_suk_gdl_financing_general_model_car_verison = $property->suk_gdl_financing_general_model_car_verison;

        $send_suk_gdl_financing_general_url = "suzukigdl";

        if (isset($send_suk_gdl_financing_general_newsletter) && $send_suk_gdl_financing_general_newsletter === "on") {
            $send_suk_gdl_financing_general_subscription = "Activado";
            send_news_financing_general($send_suk_gdl_financing_general_url, $send_suk_gdl_financing_general_name, $send_suk_gdl_financing_general_lastname, $send_suk_gdl_financing_general_email, $send_suk_gdl_financing_general_newsletter, $send_suk_gdl_financing_general_concesionarie, $send_suk_gdl_financing_general_subscription);
        } else {
            $send_suk_gdl_financing_general_subscription = "Desactivado";
        }
        send_financing_general($send_suk_gdl_financing_general_drive, $send_suk_gdl_financing_general_model_car_verison, $send_suk_gdl_financing_general_url, $send_suk_gdl_financing_general_car_engagement, $send_suk_gdl_financing_general_car_monthly_payment, $send_suk_gdl_financing_general_car_months, $send_suk_gdl_financing_general_car_price, $send_suk_gdl_financing_general_name, $send_suk_gdl_financing_general_lastname, $send_suk_gdl_financing_general_email, $send_suk_gdl_financing_general_tel, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_newsletter, $send_suk_gdl_financing_general_concesionarie, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_image_model, $send_suk_gdl_financing_general_subscription);
        send_financing_general_confirm($send_suk_gdl_financing_general_drive, $send_suk_gdl_financing_general_model_car_verison, $send_suk_gdl_financing_general_url, $send_suk_gdl_financing_general_car_engagement, $send_suk_gdl_financing_general_car_monthly_payment, $send_suk_gdl_financing_general_car_months, $send_suk_gdl_financing_general_car_price, $send_suk_gdl_financing_general_name, $send_suk_gdl_financing_general_lastname, $send_suk_gdl_financing_general_email, $send_suk_gdl_financing_general_tel, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_newsletter, $send_suk_gdl_financing_general_concesionarie, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_image_model, $send_suk_gdl_financing_general_subscription);

        echo changeArrayIntoJSON("sukpa", array('process'=>'ok', $property));
    }
    // FINANCING BY MODELS

/*
  ----------------------------------------------------------------------------
  General Helper Methods
  ----------------------------------------------------------------------------
*/
    function requestBody() {
        $app = \Slim\Slim::getInstance();
        $request = $app->request();
        return json_decode($request->getBody());
    }
    function mw1() {
        $app = \Slim\Slim::getInstance();
        $db = getConnection();
        if (login_check($db) == true) {
            return true;
        } else {
            $app->halt(401, 'Token Requerido');
        }
    }
/*
  ----------------------------------------------------------------------------
  General Post Methods
  ----------------------------------------------------------------------------
*/
    // INSERT
    function addTable() {
        $property = requestBody();
        $sql = "INSERT INTO proTable(TAB_Field)
                VALUES(:field)";
        $structure = array();
        $params = array(
            'field' => trim($property->field),
        );
        echo changeQueryIntoJSON('propa', $structure, getConnection(), $sql, $params, 1, PDO::FETCH_ASSOC);
    }
    // UPDATE
    function setTable($idTable) {
        $property = requestBody();
        $sql = "UPDATE proTable
                SET TAB_Field = :field
                WHERE TAB_Id = :tabId";
        $structure = array();
        $params = array(
            'tabId' => $idTable,
            'field' => trim($property->field)
        );
        echo changeQueryIntoJSON('propa', $structure, getConnection(), $sql, $params, 2, PDO::FETCH_ASSOC);
    }
/*
  ----------------------------------------------------------------------------
  General Get Methods
  ----------------------------------------------------------------------------
*/
    // SELECT
    function getTable() {
        $sql = "SELECT * FROM proTable tab";
        $structure = array(
            'alias' => 'TAB_Field'
        );
        $params = array();
        echo changeQueryIntoJSON('propa', $structure, getConnection(), $sql, $params, 0, PDO::FETCH_ASSOC);
    }
    // DELETE
    function delTable($idTable) {
        $sql = "DELETE FROM proTable WHERE TAB_Id = :tabId";
        $structure = array();
        $params = array(
            'tabId' => $idTable
        );
        echo changeQueryIntoJSON('propa', $structure, getConnection(), $sql, $params, 3, PDO::FETCH_ASSOC);
    }
/*
  ----------------------------------------------------------------------------
        Notification Methods
  ----------------------------------------------------------------------------
*/
// SEND FINANCING GENENRAL NEWS
    function send_news_financing_general($send_suk_gdl_financing_general_url, $send_suk_gdl_financing_general_name, $send_suk_gdl_financing_general_lastname, $send_suk_gdl_financing_general_email, $send_suk_gdl_financing_general_newsletter, $send_suk_gdl_financing_general_concesionarie, $send_suk_gdl_financing_general_subscription) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_financing_general_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    Financiamiento Noticias y promociones
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:35px 60px 35px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_name .'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Appelido(s):
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo Electrónico:
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_concesionarie.'</span><br>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_financing_general_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_financing_general_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$send_suk_gdl_financing_general_concesionarie.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>
                ',
                'subject' => 'Financiamiento Newsletter - '.$send_suk_gdl_financing_general_concesionarie.'.',
                'from_email' => $send_suk_gdl_financing_general_email,
                'from_name' => $send_suk_gdl_financing_general_name . ' ' . $send_suk_gdl_financing_general_lastname,
                'to' => array(
                    array(
                        'email' => 'hevelmo060683@gmail.com',
                        'name' => 'contacto',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_financing_general_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_financing_general_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
// SEND FINANCING GENERAL
    function send_financing_general($send_suk_gdl_financing_general_drive, $send_suk_gdl_financing_general_model_car_verison, $send_suk_gdl_financing_general_url, $send_suk_gdl_financing_general_car_engagement, $send_suk_gdl_financing_general_car_monthly_payment, $send_suk_gdl_financing_general_car_months, $send_suk_gdl_financing_general_car_price, $send_suk_gdl_financing_general_name, $send_suk_gdl_financing_general_lastname, $send_suk_gdl_financing_general_email, $send_suk_gdl_financing_general_tel, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_newsletter, $send_suk_gdl_financing_general_concesionarie, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_image_model, $send_suk_gdl_financing_general_subscription) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_financing_general_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    Solicitud de financiamiento '.$send_suk_gdl_financing_general_concesionarie.'
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="0" valign="top">
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 13px; text-align: left; padding: 0"></p>
                                                            </td>
                                                            <td height="0" valign="top">
                                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.medigraf.com.mx/img/template/common/header/'.$send_suk_gdl_financing_general_image_model.'" alt="'.$send_suk_gdl_financing_general_model_car.'">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Modelo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_model_car.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Versión:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_model_car_verison.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Precio:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_price.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Enganche:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_engagement.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Mensualidad:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_months.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Plazos:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_monthly_payment.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_name.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Apellidos(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Telefono:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_tel.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_concesionarie.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Desea realizar prueba de manejo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_drive.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Desea recibir noticias:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_subscription.'</span>
                                                            </td>
                                                            <br>
                                                            <br>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_financing_general_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_financing_general_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$send_suk_gdl_financing_general_concesionarie.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>

                ',
                'subject' => 'Financiamiento - Solicitud de la pagina de internet '.$send_suk_gdl_financing_general_concesionarie.' para cotizar.',
                'from_email' => $send_suk_gdl_financing_general_email,
                'from_name' => $send_suk_gdl_financing_general_name . ' ' . $send_suk_gdl_financing_general_lastname,
                'to' => array(
                    array(
                        'email' => 'hevelmo060683@gmail.com',
                        'name' => 'contacto',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_financing_general_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_financing_general_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
// SEND FINANCING GENERAL CONFIRM
    function send_financing_general_confirm($send_suk_gdl_financing_general_drive, $send_suk_gdl_financing_general_model_car_verison, $send_suk_gdl_financing_general_url, $send_suk_gdl_financing_general_car_engagement, $send_suk_gdl_financing_general_car_monthly_payment, $send_suk_gdl_financing_general_car_months, $send_suk_gdl_financing_general_car_price, $send_suk_gdl_financing_general_name, $send_suk_gdl_financing_general_lastname, $send_suk_gdl_financing_general_email, $send_suk_gdl_financing_general_tel, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_newsletter, $send_suk_gdl_financing_general_concesionarie, $send_suk_gdl_financing_general_model_car, $send_suk_gdl_financing_general_image_model, $send_suk_gdl_financing_general_subscription) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_financing_general_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    Solicitud de financiamiento '.$send_suk_gdl_financing_general_concesionarie.'
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="0" valign="top">
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 13px; text-align: left; padding: 0"></p>
                                                            </td>
                                                            <td height="0" valign="top">
                                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.medigraf.com.mx/img/template/common/header/'.$send_suk_gdl_financing_general_image_model.'" alt="'.$send_suk_gdl_financing_general_model_car.'">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Modelo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_model_car.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Versión:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_model_car_verison.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Precio:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_price.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Enganche:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_engagement.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Mensualidad:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_months.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Plazos:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_car_monthly_payment.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_name.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Apellidos(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Telefono:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_tel.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_concesionarie.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Desea realizar prueba de manejo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_drive.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Desea recibir noticias:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_financing_general_subscription.'</span>
                                                            </td>
                                                            <br>
                                                            <br>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_financing_general_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_financing_general_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$send_suk_gdl_financing_general_concesionarie.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_financing_general_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>

                ',
                'subject' => 'Financiamiento - Solicitud cotización '.$send_suk_gdl_financing_general_model_car,
                'from_email' => $send_suk_gdl_financing_general_email,
                'from_name' => $send_suk_gdl_financing_general_name . ' ' . $send_suk_gdl_financing_general_lastname,
                'to' => array(
                    array(
                        'email' => $send_suk_gdl_financing_general_email,
                        'name' => 'Financiamiento',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_financing_general_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_financing_general_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
// SEND TEST DRIVE MODEL NEWS
    function send_news_test_drive_model($send_suk_gdl_test_drive_model_url, $send_suk_gdl_test_drive_model_date, $send_suk_gdl_test_drive_model_name, $send_suk_gdl_test_drive_model_lastname, $send_suk_gdl_test_drive_model_email, $send_suk_gdl_test_drive_model_tel, $send_suk_gdl_test_drive_model_newsletter, $send_suk_gdl_test_drive_model_modelo, $send_suk_gdl_test_drive_model_concesionaria, $send_suk_gdl_test_drive_model_subscription) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    Noticias y promociones
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:35px 60px 35px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_name .' '. $send_suk_gdl_test_drive_model_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo Electrónico:
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_concesionaria.'</span><br>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_test_drive_model_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$send_suk_gdl_test_drive_model_concesionaria.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>
                ',
                'subject' => 'Prueba de manejo - Noticias y promociones - '.$send_suk_gdl_test_drive_model_concesionaria,
                'from_email' => $send_suk_gdl_test_drive_model_email,
                'from_name' => $send_suk_gdl_test_drive_model_name . ' ' . $send_suk_gdl_test_drive_model_lastname,
                'to' => array(
                    array(
                        'email' => 'hevelmo060683@gmail.com',
                        'name' => 'contacto',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_test_drive_model_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_test_drive_model_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
// SEND TEST DRIVE MODEL
    function send_test_drive_model($send_suk_gdl_test_drive_model_url, $send_suk_gdl_test_drive_model_date, $send_suk_gdl_test_drive_model_name, $send_suk_gdl_test_drive_model_lastname, $send_suk_gdl_test_drive_model_email, $send_suk_gdl_test_drive_model_tel, $send_suk_gdl_test_drive_model_newsletter, $send_suk_gdl_test_drive_model_modelo, $send_suk_gdl_test_drive_model_concesionaria, $send_suk_gdl_test_drive_model_image_modelo, $send_suk_gdl_test_drive_model_auto, $send_suk_gdl_test_drive_model_subscription) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    Agendar prueba de manejo '.$send_suk_gdl_test_drive_model_auto.'
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="0" valign="top">
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 13px; text-align: left; padding: 0"></p>
                                                            </td>
                                                            <td height="0" valign="top">
                                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.medigraf.com.mx/img/template/common/header/'.$send_suk_gdl_test_drive_model_image_modelo.'" alt="'.$send_suk_gdl_test_drive_model_auto.'">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Modelo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_auto.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Fecha:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_date.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Telefono:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_tel.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_name.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Apellido(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo Electrónico:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_concesionaria.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Desea recibir noticias:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_test_drive_model_subscription.'</span>
                                                            </td>
                                                            <br>
                                                            <br>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_test_drive_model_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$send_suk_gdl_test_drive_model_concesionaria.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_test_drive_model_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>

                ',
                'subject' => 'Agendar prueba de manejo '.$send_suk_gdl_test_drive_model_auto,
                'from_email' => $send_suk_gdl_test_drive_model_email,
                'from_name' => $send_suk_gdl_test_drive_model_name . ' ' . $send_suk_gdl_test_drive_model_lastname,
                'to' => array(
                    array(
                        'email' => 'hevelmo060683@gmail.com',
                        'name' => 'contacto',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_test_drive_model_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_test_drive_model_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
// SEND CONTACT NEWS
    function send_news_contact($send_suk_gdl_contact_url, $send_suk_gdl_contact_name, $send_suk_gdl_contact_lastname, $send_suk_gdl_contact_email, $send_suk_gdl_contact_department, $send_suk_gdl_contact_car, $send_suk_gdl_contact_message, $send_suk_gdl_contact_news, $suk_gdl_contact_concesionary) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_contact_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    Noticias y promociones
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:35px 60px 35px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_contact_name .' '. $send_suk_gdl_contact_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo Electrónico:
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$send_suk_gdl_contact_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="11" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="11" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; text-align: right; padding: 0">'.$suk_gdl_contact_concesionary.'</span><br>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_contact_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_contact_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$suk_gdl_contact_concesionary.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>
                ',
                'subject' => 'Contacto - Noticias y promociones - '.$suk_gdl_contact_concesionary,
                'from_email' => $send_suk_gdl_contact_email,
                'from_name' => $send_suk_gdl_contact_name . ' ' . $send_suk_gdl_contact_lastname,
                'to' => array(
                    array(
                        'email' => 'hevelmo060683@gmail.com',
                        'name' => 'contacto',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_contact_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_contact_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
// SEND CONTACT
    function send_contact($send_suk_gdl_contact_url, $send_suk_gdl_contact_name, $send_suk_gdl_contact_lastname, $send_suk_gdl_contact_email, $send_suk_gdl_contact_department, $send_suk_gdl_contact_depto, $send_suk_gdl_contact_car, $send_suk_gdl_contact_message, $send_suk_gdl_contact_news, $suk_gdl_contact_concesionary, $send_suk_gdl_contact_auto, $send_suk_gdl_contact_image_modelo, $send_suk_gdl_contact_subscription) {
        try {
            $mandrill = new Mandrill('-M2qid9ztNaYfJvoZWPOHQ');
            $message = array(
                'html' => '
                    <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        </head>

                        <body>

                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                            <td style="background-color: #fff; border: 1px solid #EBE9EA; border-bottom: 0px" width="576">
                                                <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="576">
                                                    <tbody>
                                                        <tr>
                                                            <td height="52" width="102">
                                                                <a style="display: block; border: 0" href="http://'.$send_suk_gdl_contact_url.'.com.mx" target="_blank" rel="noreferrer">
                                                                    <img style="display: block; border: 0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/template/common/header/horizontal_logo.png" border="0">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display: block; border: 0" border="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" height="78" bgcolor="#CA272C" width="11">
                                                <p style="color:#ffffff;font-family:Lato,Arial,sans-serif;font-size:24px;text-align:center;padding:0">
                                                    '.$send_suk_gdl_contact_depto.'
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/shadow-left.png" border="0" class="CToWUd">
                                            </td>
                                            <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                                <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td height="0" valign="top">
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 13px; text-align: left; padding: 0"></p>
                                                            </td>
                                                            <td height="0" valign="top">
                                                                <img src="http://'.$send_suk_gdl_contact_url.'.medigraf.com.mx/img/template/common/header/'.$send_suk_gdl_contact_image_modelo.'" alt="'.$send_suk_gdl_contact_auto.'">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Modelo:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_contact_auto.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Departamento:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_contact_depto.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Nombre(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_contact_name.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Apellido(s):
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_contact_lastname.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Correo Electrónico:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_contact_email.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Concesionaria:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$suk_gdl_contact_concesionary.'</span><br>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                    Desea recibir noticias:
                                                                </strong>
                                                            </td>
                                                            <td height="20" valign="top">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$send_suk_gdl_contact_subscription.'</span>
                                                            </td>
                                                            <br>
                                                            <br>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="2" height="20" valign="top" width="250">
                                                                <strong style="color: #0059a9; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: center; padding: 0; display: block">
                                                                    Mensaje de contacto
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="20" valign="top" width="250">
                                                                <span style="margin-left: 15px; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0; text-align: justify; word-break: break-all; display: block;">
                                                                '.$send_suk_gdl_contact_message.'
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="padding:20px 0 20px 0;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="543">
                                                    <tbody>
                                                        <tr>
                                                            <td height="14" width="15">
                                                                <img style="display: block; border: 0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/footer-logo.png" border="0">
                                                            </td>
                                                            <td width="125px">
                                                                <p style="color: #ffffff; font-family: Lato, Arial, sans-serif; font-size: 12px; font-weight: 700; text-align: right; padding: 0">
                                                                    <a style="color: #0059a9" href="http://'.$send_suk_gdl_contact_url.'.com.mx/" target="_blank" rel="noreferrer">'.$send_suk_gdl_contact_url.'.com.mx</a>
                                                                </p>

                                                            </td>
                                                            <td>
                                                                <p style="color: #000000; font-family: Lato, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                    &nbsp;© 2015 Suzuki / '.$suk_gdl_contact_concesionary.'
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td height="11" valign="top" width="11">
                                                <img style="display:block;border:0" src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/shadow-right.png" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                            <td width="11">
                                                <img src="http://'.$send_suk_gdl_contact_url.'.com.mx/images/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>

                ',
                'subject' => 'Contacto - Mensaje dirigido al departamento de '.$send_suk_gdl_contact_department,
                'from_email' => $send_suk_gdl_contact_email,
                'from_name' => $send_suk_gdl_contact_name . ' ' . $send_suk_gdl_contact_lastname,
                'to' => array(
                    array(
                        'email' => 'hevelmo060683@gmail.com',
                        'name' => 'contacto',
                        'type' => 'to'
                    )/*,
                    array(
                        'email' => 'arivera@jaguardgl.com',
                        //'email' => 'hevelmo060683@gmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'cc'
                    ),
                    array(
                        'email' => 'arivera@guadalajara.jlr.com.mx',
                        //'email' => 'cold_space@hotmail.com',
                        'name' => $jag_congdlconcesionarie,
                        'type' => 'bcc'
                    )*/
                ),
                'headers' => array('Reply-To' => 'hevelmo060683@gmail.com'),
                //'headers' => array('Reply-To' => 'arivera@guadalajara.jlr.com.mx'),
                'important' => false,
                'track_opens' => true,
                'track_clicks' => true,
                'auto_text' => null,
                'auto_html' => null,
                'inline_css' => null,
                'url_strip_qs' => null,
                'preserve_recipients' => null,
                'view_content_link' => null,
                'bcc_address' => null,
                'tracking_domain' => null,
                'signing_domain' => null,
                'return_path_domain' => null,
                'merge' => true,

                'tags' => array('orden-new-notificacion'),
                'google_analytics_domains' => array($send_suk_gdl_contact_url.'.com.mx'),
                'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
                'metadata' => array('website' => 'http://'.$send_suk_gdl_contact_url.'.com.mx'),

            );
            $async = false;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result = $mandrill->messages->send($message, $async, $ip_pool, $send_at);
            //print_r($result);

        } catch(Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }
