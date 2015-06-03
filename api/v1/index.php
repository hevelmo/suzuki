<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//include '../../incorporate/db_connect.php';
//include '../../incorporate/functions.php';
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
    // app => Contacto GDL Jaguar
        $app->post('/contacto/gdl', 'sendContactogdlJAG');
    // app => Contacto Country Jaguar
        $app->post('/contacto/country', 'sendContactoCountryJAG');
    // app => Servicio GDL Jaguar
        $app->post('/servicio/gdl', 'sendServiciogdlJAG');
    // app => Servicio Country Jaguar
        $app->post('/servicio/country', 'sendServicioCountryJAG');
// INSERT
//$app->post('/new/table', /*'mw1',*/ 'addTable');
// UPDATE
//$app->post('/set/table/:idTable', /*'mw1',*/ 'setTable');
// GET route
// SELECT
//$app->get('/get/table', /*'mw1',*/ 'getTable');
// DELETE
//$app->get('/del/table/:idTable', /*'mw1',*/ 'delTable');
//TEST
/*$app->get('/get/test', 'getTest');
$app->post('/post/test', 'postTest');*/
$app->run();
//TEST
/*function get_hi() {
    echo changeArrayIntoJSON('text', array('process'=>'cadena'));
}
function getTest() {
    $today = date('o-m-d H:i:s');
    $array = array('date' => $today);
    echo changeArrayIntoJSON('propa', $array);
}
function postTest() {
    $array = array('process' => 'ok');
    echo changeArrayIntoJSON('propa', $array);
    echo "string";
}*/
//Functions
    // Contacto GDL Jaguar
    function sendContactogdlJAG() {
        $property = requestBody();
        $jag_congdlname = $property->jag_contact_gdl_name;
        $jag_congdlemail = $property->jag_contact_gdl_email;
        $jag_congdlmessage = $property->jag_contact_gdl_message;
        $jag_congdlconcesionarie = $property->jag_contact_gdl_concessionary;

        jag_contacto_gdl($jag_congdlname, $jag_congdlemail, $jag_congdlmessage, $jag_congdlconcesionarie);

        echo changeArrayIntoJSON("jag", array('process'=>'ok'));
    }
    // Contacto Conuntry Jaguar
    function sendContactocountryJAG() {
        $property = requestBody();
        $jag_concountryname = $property->jag_contact_country_name;
        $jag_concountryemail = $property->jag_contact_country_email;
        $jag_concountrymessage = $property->jag_contact_country_message;
        $jag_concountryconcesionarie = $property->jag_contact_country_concessionary;

        jag_contacto_country($jag_concountryname, $jag_concountryemail, $jag_concountrymessage, $jag_concountryconcesionarie);

        echo changeArrayIntoJSON("jag", array('process'=>'ok'));
    }
    // Servicio GDL Jaguar
    function sendServiciogdlJAG() {
        $property = requestBody();
        $jag_sergdlname = $property->jag_sertact_gdl_name;
        $jag_sergdlemail = $property->jag_sertact_gdl_email;
        $jag_sergdlmessage = $property->jag_sertact_gdl_message;
        $jag_sergdlconcesionarie = $property->jag_sertact_gdl_concessionary;

        jag_servicio_gdl($jag_sergdlname, $jag_sergdlemail, $jag_sergdlmessage, $jag_sergdlconcesionarie);

        echo changeArrayIntoJSON("jag", array('process'=>'ok'));
    }
    // Servicio Conuntry Jaguar
    function sendServiciocountryJAG() {
        $property = requestBody();
        $jag_sercountryname = $property->jag_sertact_country_name;
        $jag_sercountryemail = $property->jag_sertact_country_email;
        $jag_sercountrymessage = $property->jag_sertact_country_message;
        $jag_sercountryconcesionarie = $property->jag_sertact_country_concessionary;

        jag_servicio_country($jag_sercountryname, $jag_sercountryemail, $jag_sercountrymessage, $jag_sercountryconcesionarie);

        echo changeArrayIntoJSON("jag", array('process'=>'ok'));
    }
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
function jag_contacto_gdl($jag_congdlname, $jag_congdlemail, $jag_congdlmessage, $jag_congdlconcesionarie) {
    try {
        $mandrill = new Mandrill('vipel7XhxNiqPkblHbw0qg');
        $message = array(
            'html' => '
                <html>
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-jaguar.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-ProximaNova.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-avenir.css" />
                    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
                    <style>
                        html{width: 100%;}
                        * {
                            margin: 0 auto;
                            padding: 0;
                        }
                        body{
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            -moz-osx-font-smoothing: grayscale;
                            -webkit-font-smoothing: antialiased;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        .ExternalClass {
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        *:before, *:after {
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    </style>
                    </head>

                    <body>

                        <div style="background-color: rgba(12, 18, 28, 0.2); padding: 20px;border-bottom: 0px" width="600">
                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                        <td style="background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(255, 255, 255, 1); border-bottom: 0px" width="600">
                                            <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="15" width="100">
                                                            <a style="display: inline-block; vertical-align: middle; border: 0; padding-right: 15px;" href="http://jaguar.medigraf.com.mx" target="_blank" rel="noreferrer">
                                                                <img src="http://jaguar.medigraf.com.mx/img/logo_jaguar.png" style="display: block; border: 0"  border="0" width="75">
                                                            </a>
                                                            <p style="display: inline-block; vertical-align: middle; color:#0000;font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                                '.$jag_congdlconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" height="78" width="11" style="background-color: rgba(72, 72, 72, 0.6)">
                                            <p style="display: block; color:#ffffff;font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                Contacto Jaguar
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-left.png" border="0" class="CToWUd">
                                        </td>
                                        <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                            <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Nombre(s):
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_congdlname.'</span><br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Correo Electrónico:
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_congdlemail.'</span><br>
                                                        </td>
                                                        <br>
                                                        <br>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" width="600" valign="top">
                                                            <span style="font-family: ProximaNovaRegular,Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 12px; padding: 15px; text-align: justify; display: block; word-break: break-all;">'.$jag_congdlmessage.'</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p style="color: #000000; font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                &nbsp;© 2015 / '.$jag_congdlconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-right.png" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </body>
                </html>
            ',
            'subject' => $jag_congdlconcesionarie,
            'from_email' => $jag_congdlemail,
            'from_name' => $jag_congdlname,
            'to' => array(
                array(
                    'email' => 'heriberto@medigraf.com.mx',
                    'name' => $jag_congdlconcesionarie,
                    'type' => 'to'
                ),
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
                )
            ),
            'headers' => array('Reply-To' => 'arivera@jaguardgl.com'),
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
            'google_analytics_domains' => array('jaguar.com'),
            'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
            'metadata' => array('website' => 'www.jaguar.com'),

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
function jag_contacto_country($jag_concountryname, $jag_concountryemail, $jag_concountrymessage, $jag_concountryconcesionarie) {
    try {
        $mandrill = new Mandrill('vipel7XhxNiqPkblHbw0qg');
        $message = array(
            'html' => '
                <html>
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-jaguar.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-ProximaNova.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-avenir.css" />
                    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
                    <style>
                        html{width: 100%;}
                        * {
                            margin: 0 auto;
                            padding: 0;
                        }
                        body{
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            -moz-osx-font-smoothing: grayscale;
                            -webkit-font-smoothing: antialiased;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        .ExternalClass {
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        *:before, *:after {
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    </style>
                    </head>

                    <body>

                        <div style="background-color: rgba(12, 18, 28, 0.2); padding: 20px;border-bottom: 0px" width="600">
                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                        <td style="background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(255, 255, 255, 1); border-bottom: 0px" width="600">
                                            <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="15" width="100">
                                                            <a style="display: inline-block; vertical-align: middle; border: 0; padding-right: 15px;" href="http://jaguar.medigraf.com.mx" target="_blank" rel="noreferrer">
                                                                <img src="http://jaguar.medigraf.com.mx/img/logo_jaguar.png" style="display: block; border: 0"  border="0" width="75">
                                                            </a>
                                                            <p style="display: inline-block; vertical-align: middle; color:#0000;font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                                '.$jag_concountryconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" height="78" width="11" style="background-color: rgba(72, 72, 72, 0.6)">
                                            <p style="display: block; color:#ffffff;font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                Contacto
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-left.png" border="0" class="CToWUd">
                                        </td>
                                        <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                            <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Nombre(s):
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_concountryname.'</span><br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Correo Electrónico:
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_concountryemail.'</span><br>
                                                        </td>
                                                        <br>
                                                        <br>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" width="600" valign="top">
                                                            <span style="font-family: ProximaNovaRegular,Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 12px; padding: 15px; text-align: justify; display: block; word-break: break-all;">'.$jag_concountrymessage.'</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p style="color: #000000; font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                &nbsp;© 2015 / '.$jag_concountryconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-right.png" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </body>
                </html>
            ',
            'subject' => $jag_concountryconcesionarie,
            'from_email' => $jag_concountryemail,
            'from_name' => $jag_concountryname,
            'to' => array(
                array(
                    'email' => 'heriberto@medigraf.com.mx',
                    'name' => $jag_concountryconcesionarie,
                    'type' => 'to'
                ),
                array(
                    'email' => 'arivera@jaguardgl.com',
                    //'email' => 'hevelmo060683@gmail.com',
                    'name' => $jag_concountryconcesionarie,
                    'type' => 'cc'
                ),
                array(
                    'email' => 'arivera@guadalajara.jlr.com.mx',
                    //'email' => 'cold_space@hotmail.com',
                    'name' => $jag_concountryconcesionarie,
                    'type' => 'bcc'
                )
            ),
            'headers' => array('Reply-To' => 'arivera@jaguardgl.com'),
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
            'google_analytics_domains' => array('jaguar.com'),
            'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
            'metadata' => array('website' => 'www.jaguar.com'),

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

function jag_servicio_gdl($jag_sergdlname, $jag_sergdlemail, $jag_sergdlmessage, $jag_sergdlconcesionarie) {
    try {
        $mandrill = new Mandrill('vipel7XhxNiqPkblHbw0qg');
        $message = array(
            'html' => '
                <html>
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-jaguar.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-ProximaNova.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-avenir.css" />
                    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
                    <style>
                        html{width: 100%;}
                        * {
                            margin: 0 auto;
                            padding: 0;
                        }
                        body{
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            -moz-osx-font-smoothing: grayscale;
                            -webkit-font-smoothing: antialiased;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        .ExternalClass {
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        *:before, *:after {
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    </style>
                    </head>

                    <body>

                        <div style="background-color: rgba(12, 18, 28, 0.2); padding: 20px;border-bottom: 0px" width="600">
                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                        <td style="background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(255, 255, 255, 1); border-bottom: 0px" width="600">
                                            <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="15" width="100">
                                                            <a style="display: inline-block; vertical-align: middle; border: 0; padding-right: 15px;" href="http://jaguar.medigraf.com.mx" target="_blank" rel="noreferrer">
                                                                <img src="http://jaguar.medigraf.com.mx/img/logo_jaguar.png" style="display: block; border: 0"  border="0" width="75">
                                                            </a>
                                                            <p style="display: inline-block; vertical-align: middle; color:#0000;font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                                '.$jag_sergdlconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" height="78" width="11" style="background-color: rgba(72, 72, 72, 0.6)">
                                            <p style="display: block; color:#ffffff;font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                Servicio
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-left.png" border="0" class="CToWUd">
                                        </td>
                                        <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                            <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Nombre(s):
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_sergdlname.'</span><br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Correo Electrónico:
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_sergdlemail.'</span><br>
                                                        </td>
                                                        <br>
                                                        <br>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" width="600" valign="top">
                                                            <span style="font-family: ProximaNovaRegular,Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 12px; padding: 15px; text-align: justify; display: block; word-break: break-all;">'.$jag_sergdlmessage.'</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p style="color: #000000; font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                &nbsp;© 2015 / '.$jag_sergdlconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-right.png" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </body>
                </html>
            ',
            'subject' => $jag_sergdlconcesionarie,
            'from_email' => $jag_sergdlemail,
            'from_name' => $jag_sergdlname,
            'to' => array(
                array(
                    'email' => 'heriberto@medigraf.com.mx',
                    'name' => $jag_sergdlconcesionarie,
                    'type' => 'to'
                ),
                array(
                    'email' => 'arivera@jaguardgl.com',
                    //'email' => 'hevelmo060683@gmail.com',
                    'name' => $jag_sergdlconcesionarie,
                    'type' => 'cc'
                ),
                array(
                    'email' => 'arivera@guadalajara.jlr.com.mx',
                    //'email' => 'cold_space@hotmail.com',
                    'name' => $jag_sergdlconcesionarie,
                    'type' => 'bcc'
                )
            ),
            'headers' => array('Reply-To' => 'arivera@jaguardgl.com'),
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
            'google_analytics_domains' => array('jaguar.com'),
            'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
            'metadata' => array('website' => 'www.jaguar.com'),

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
function jag_servicio_country($jag_sercountryname, $jag_sercountryemail, $jag_sercountrymessage, $jag_sercountryconcesionarie) {
    try {
        $mandrill = new Mandrill('vipel7XhxNiqPkblHbw0qg');
        $message = array(
            'html' => '
                <html>
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-jaguar.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-ProximaNova.css" />
                    <link type="text/css" rel="stylesheet" href="http://jaguar.medigraf.com.mx/css/webfont/font-avenir.css" />
                    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
                    <style>
                        html{width: 100%;}
                        * {
                            margin: 0 auto;
                            padding: 0;
                        }
                        body{
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            -moz-osx-font-smoothing: grayscale;
                            -webkit-font-smoothing: antialiased;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        .ExternalClass {
                            font-family: "ProximaNovaRegular","Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
                            background: rgba(225, 223, 223, 1) !important;
                            color: #777;
                            font-size: 14px;
                            line-height: 24px;
                            text-transform: uppercase;
                        }
                        *:before, *:after {
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    </style>
                    </head>

                    <body>

                        <div style="background-color: rgba(12, 18, 28, 0.2); padding: 20px;border-bottom: 0px" width="600">
                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                        <td style="background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(255, 255, 255, 1); border-bottom: 0px" width="600">
                                            <table style="padding: 13px 17px 17px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="15" width="100">
                                                            <a style="display: inline-block; vertical-align: middle; border: 0; padding-right: 15px;" href="http://jaguar.medigraf.com.mx" target="_blank" rel="noreferrer">
                                                                <img src="http://jaguar.medigraf.com.mx/img/logo_jaguar.png" style="display: block; border: 0"  border="0" width="75">
                                                            </a>
                                                            <p style="display: inline-block; vertical-align: middle; color:#0000;font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                                '.$jag_sercountryconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display: block; border: 0" border="0">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" height="78" width="11" style="background-color: rgba(72, 72, 72, 0.6)">
                                            <p style="display: block; color:#ffffff;font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;text-align:center;padding:0;text-transform: uppercase;">
                                                Servicio de Mantenimiento
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-left.png" border="0" class="CToWUd">
                                        </td>
                                        <td rowspan="2" style="border:1px solid #ebe9ea;border-top:0" bgcolor="#ffffff">
                                            <table style="padding:15px 60px 15px" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Nombre(s):
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_sercountryname.'</span><br>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="20" valign="top" width="150">
                                                            <strong style="color: #0059a9; font-family: ProximaNovaSemibold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 900; text-align: right; padding: 0">
                                                                Correo Electrónico:
                                                            </strong>
                                                        </td>
                                                        <td height="20" valign="top">
                                                            <span style="margin-left: 15px; font-family: ProximaNovaRegular,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; text-align: right; padding: 0">'.$jag_sercountryemail.'</span><br>
                                                        </td>
                                                        <br>
                                                        <br>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td height="20" width="600" valign="top">
                                                            <span style="font-family: ProximaNovaRegular,Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 12px; padding: 15px; text-align: justify; display: block; word-break: break-all;">'.$jag_sercountrymessage.'</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="padding:20px 15px 20px 15px;border-top:1px solid #ccc" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p style="color: #000000; font-family: jaguarbold,Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; text-align: right; padding: 0">
                                                                &nbsp;© 2015 / '.$jag_sercountryconcesionarie.'
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td height="11" valign="top" width="11">
                                            <img style="display:block;border:0" src="http://jaguar.medigraf.com.mx/img/shadow-right.png" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                        <td width="11">
                                            <img src="http://jaguar.medigraf.com.mx/img/spacer.png" style="display:block;border:0" border="0" class="CToWUd">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </body>
                </html>
            ',
            'subject' => $jag_sercountryconcesionarie,
            'from_email' => $jag_sercountryemail,
            'from_name' => $jag_sercountryname,
            'to' => array(
                array(
                    'email' => 'heriberto@medigraf.com.mx',
                    'name' => $jag_sercountryconcesionarie,
                    'type' => 'to'
                ),
                array(
                    'email' => 'arivera@jaguardgl.com',
                    //'email' => 'hevelmo060683@gmail.com',
                    'name' => $jag_sercountryconcesionarie,
                    'type' => 'cc'
                ),
                array(
                    'email' => 'arivera@guadalajara.jlr.com.mx',
                    //'email' => 'cold_space@hotmail.com',
                    'name' => $jag_sercountryconcesionarie,
                    'type' => 'bcc'
                )
            ),
            'headers' => array('Reply-To' => 'arivera@jaguardgl.com'),
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
            'google_analytics_domains' => array('jaguar.com'),
            'google_analytics_campaign' => 'contacto.hevelmo060683@gmail.com',
            'metadata' => array('website' => 'www.jaguar.com'),

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
