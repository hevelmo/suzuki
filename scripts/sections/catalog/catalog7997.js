$(document).ready(function(){


    var PageTransition = ( function( options ) {
        var prev_slide = 'prev_slide';
        var next_slide = 'next_slide';
        var wrapper = options.wrapper;

        this.transitions = {
            'next': {
                'init': options.next_in_transition,
                'end': options.next_out_transition
            },
            'prev': {
                'init': options.prev_in_transition,
                'end': options.prev_out_transition
            }
        }

        this.pages  = $(options.wrapper).children('.et-section');
        this.current_page = this.pages[ (options.init_page ) ];
        $( this.current_page ).addClass('et-page-current');
        $( this.current_page ).prevAll('.et-section').addClass('after');
        $( this.current_page ).nextAll('.et-section').addClass('after');

    });

    PageTransition.prototype.move_to = function( div ){
        var current_page = this.current_page;
        var next_page = div;

        if( ! $(next_page).hasClass('et-page-current') ){

            if( $(next_page).hasClass( 'after' ) ) {
                direction = 'next';
            } else if( $(next_page).hasClass( 'before' ) ) {
                direction = 'prev';
            }

            if( ! Modernizr.csstransitions) {
                    
                $('.et-section').removeClass('before after');
                $( current_page ).removeClass().addClass('item et-section et-page-current');
                $( next_page ).addClass('et-page-current').stop().animate({
                    bottom: 0
                }, 600, 'linear', function(){
                    $( current_page ).removeClass().addClass('item et-section');
                    $( next_page ).prevAll('.et-section').addClass('before');
                    $( next_page ).nextAll('.et-section').addClass('after');
                });

                this.current_page = next_page;

            } else {

                in_transition = ( direction == 'next' ) ? this.transitions.next.init : this.transitions.prev.init;
                out_transition = ( direction == 'next' ) ? this.transitions.next.end : this.transitions.prev.end;

                $('.et-section').removeClass('before after');

                $( current_page ).removeClass().addClass('item et-section et-page-current '+'pt-page-'+out_transition);
                $( next_page ).addClass('et-page-current '+'pt-page-'+in_transition).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                    $( current_page ).removeClass().addClass('item et-section');
                    $( next_page ).prevAll('.et-section').addClass('before');
                    $( next_page ).nextAll('.et-section').addClass('after');
                });
                this.current_page = next_page;
            }
        }
    };


    var init_slide_load = location.hash.slice(1); 
    $('.catalog_cars_wrapper').find('.catalog_car').each(function( index ) {
        if( $(this).hasClass(init_slide_load) )
            init_slide_load = index;
    });
    

    var pages = new PageTransition({
        wrapper:             document.getElementById('catalog-wrapper'),
        init_page:           init_slide_load,

        prev_in_transition:  'moveFromTop',
        prev_out_transition: 'moveToBottom ontop',

        next_in_transition:  'moveFromBottom',
        next_out_transition: 'moveToTop ontop'
    });



    $('.catalog_cars_wrapper').delegate('a.switch-catalog', 'click', function( e ){
        e.preventDefault();
        var car_key = $(this).data('key');
        var slide = $("#catalog-"+ car_key);
        $('.catalog_car').removeClass('active');
        $(this).parent('.catalog_car').addClass('active');
        pages.move_to( slide );
    });

})

