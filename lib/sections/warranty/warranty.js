$(document).ready(function(){
    var previous_index = -1;
    function appears( index ){
        $('.hidden-content').addClass('hidden');
        $('.hidden-content').eq( index ).removeClass('hidden').stop().hide().slideDown(500);
        previous_index = index;
        $.scroll_to( index == 1 ? 'ordinaria': 'extendida' );
    }
    $('a.close-warranty-button').on('click', function( e ){
        e.preventDefault();
        $('.hidden-content:visible').slideUp(500);
        previous_index = -1;
        $.scroll_to( 'top' );

    });
    $('.main-buttons a').on('click', function( e ){
        e.preventDefault();
        var index = $(this).index();
        if( previous_index != index ){
            if( $('.hidden-content:visible').length ){
                $('.hidden-content:visible').slideUp(500, function(){
                    appears( index );
                });
            }else{
                appears( index );
            }
        }else{
            $('a.close-warranty-button').trigger('click')
        }
    });

    var auto_open = ( window.location.hash ).split('#')
    if( auto_open.length > 0 ){
        if( auto_open[1] == 'extendida' ){
            $('.main-buttons a').eq(1).trigger('click');
        }else  if( auto_open[1] == 'ordinaria' ){
            $('.main-buttons a').eq(0).trigger('click');
        }

    }
});

