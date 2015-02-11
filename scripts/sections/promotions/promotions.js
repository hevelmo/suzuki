$(document).ready(function(){
    if( $('.concessionaire-selector').length ){
        $('.concessionaire-selector').each(function(){
            $(this).concessionaire_selector({
                ga_label: $(this).attr('data-title')
            });
        });
    }
    if($(".promos-menu-wrapper").length > 0){
        $(".promo-content-wrapper").css({ maxHeight:370, overflowY: 'scroll', overflowX: 'hidden'});
        $(".promo-content-wrapper .promo-legals").css({ height:'auto', overflowY: 'hidden', overflowX: 'hidden'});
    }
    if( $('.promos-menu a').length > 0){
        $('.promos-menu a').on('click', function( e ){
            e.preventDefault();
            var index = $(this).parent().index();
            var percent = ( index * -100 ) + '%';
            $('.promos-menu .option').removeClass('active');
            $('.promos-menu .option').eq(index).addClass('active');
            $('.promos-container').stop().animate({marginLeft: percent }, 300);

            var element_id  = $(this).attr('href'),
                scape;
            element_id = element_id.split('#').join('');
            scape       = $( '#' + element_id );
            scape.attr({
                id  : 'temporal_scape'
            });
            //document.location.href = '#' + element_id;
            scape.attr({
                id  : element_id
            });
        });
        //console.log( document.location.hash );
        var eq = 0, id = document.location.hash.split('#').join(''), $a=$('.promos-menu-wrapper a').eq( eq );
        if( id != '' ){
            document.location.href = '#';
//            eq = $( '#' + id ).parent().parent().index();
            $a = $("a[href='#"+id+"']");
            if($a.length === 0){$a=$('.promos-menu-wrapper a').eq( eq );}
        }
        console.log(eq);
        setTimeout(function(){
            $a.trigger('click');
        }, 1000 );
    } else {
        if (IS_MOBILE) {
            $(".promos-wrapper").css("padding-top", 0);
        }
    }


    //// No Promo form

    var $no_promo_name = $('#no_promo_name');
    var $no_promo_email = $('#no_promo_email');

    $no_promo_name.on('focusout', function(){
        $.validate_input( $no_promo_name );
    });
    $no_promo_email.on('focusout', function(){
        $.validate_input( $no_promo_email );
    });
    $.no_promo_join_form = function(){

        var form_errors = 0;
        if( !$.validate_input( $no_promo_email ) ){
            form_errors++;
            $no_promo_email.focus();
        }
        if( !$.validate_input( $no_promo_name ) ){
            form_errors++;
            $no_promo_name.focus();
        }

        if( form_errors == 0 ){
            var data = {
                email       : $no_promo_email.val(),
                name        : $no_promo_name.val(),
                source      : 'No Promo'
            };
            var service_url = 'services/request/newsletter.json';
            $.ajax({
                cache       : false,
                data        : data,
                dataType    : 'json',
                type        : 'post',
                success     : function( data ){
                    if( data.status == 'ok' ){
                        $no_promo_email.val('');
                        $no_promo_name.val('');
                        ga('send', 'event', 'Newsletter', 'Confirmacion', 'Promociones', 600 );
                    }
                    alert( data.message );
                },
                url     : service_url
            });
        }

    }


});
