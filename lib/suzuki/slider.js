//Specifications Slider controls and functionality
var specifications_i = 0;
var specifications_total =  $('.specifications-wrapper .specification').length - 1;
$('a.specifications-controls').on('click', function( e ){
    e.preventDefault();
    var direction, fake_div, copy_div;
    $('.specifications-wrapper .fake_div').remove();
    if( $(this).attr('href') == '#left' ){
        if( specifications_i > 0 ){
            specifications_i--;
        }else{
            specifications_i = specifications_total ;
            fake_div = true;
            copy_div = $('#features-wrapper .specification').eq( 0).clone();
            copy_div.addClass('fake_div');
            $('#features-wrapper').append( copy_div ).css({marginLeft: ( ( specifications_i + 1 ) * -100 )+'%' }).stop().animate({marginLeft: ( specifications_i * -100) + '%' });
        }
    }else{
        if( specifications_i < specifications_total ){
            specifications_i++;
        }else{
            fake_div = true;
            specifications_i = 0;
            copy_div = $('#features-wrapper .specification').eq( specifications_i -1  ).clone();
            $('#features-wrapper').prepend( copy_div ).css({marginLeft: '100%' }).stop();
            copy_div.addClass('fake_div').css({marginLeft:"-99%", position:"absolute", width: "100%"}).stop().animate({marginLeft:'-100%'} );
            $('#features-wrapper').animate({marginLeft: '0'});
        }
    }
    if( !fake_div ){
        $('.specifications-wrapper .specifications').stop().animate({marginLeft: ( specifications_i * -100) + '%' });
    }
});
