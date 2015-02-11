$(document).ready( function() {
    var bubble;
    function add_instant_drive_messages(){
        // Benchmark.
        var name = [ 'Itzel', 'Eduardo', 'Iván', 'Axel', 'Andrés', 'Bryan', 'José Carlos', 'Bernardo', 'Raquel', 'Rocío', 'Diego', 'Vicky', 'Marco', 'Óscar', 'Guillermo', 'Fernanda', 'Rafael', 'Luis', 'Guido', 'Rodrigo', 'Magdiel', 'Manuel', 'David', 'Alejandro' ];
        var car = [ 'un Swift', 'una Grand Vitara', 'un Swift Sport', 'una SX4 Crossover', 'un SX4 Sedán', 'un Kizashi' ];

        for (var i = 0; i < 3; i++) {
            var n = name[Math.floor(Math.random() * name.length )],
                c = car[Math.floor(Math.random() * car.length )],
                message = n + ' está probando ' + c + ' en este momento.';
            bubble.addMessage({
                'persona': n,
                'carro': c,
                'text'  : message,
                'class' : 'alert-instantdrive',
                'url'   : '/instantdrive'
            });
        }
    }
    bubble = new _bubble([
        {
            'text': 'Los autos Suzuki son fabricados con los más altos estándares de calidad.',
            'class': 'alert-suzuki',
            'url': '/razones'
        },{
            'text': 'El S-Cross ha sido reconocido por su alto desempeño, su eficiencia y su manejo ágil y seguro.',
            'class': 'alert-suzuki',
            'url': '/razones'
        },{
            'text': 'Suzuki ha sido reconocida en 2014 con la distinción de Superbrands México por su calidad y el éxito de su posicionamiento.',
            'class': 'alert-suzuki',
            'url': '/razones'
        },{
            'text': '',
            'class': 'alert-suzuki',
            'url': '/razones'
        },{
            'text': 'Suzuki, número 10 de 33 marcas con menos fallas después de 3 años de antigüedad.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-2'
        }, {
            'text': 'El Swift ha sido reconocido como el hatchback subcompacto con mejor valor de reventa.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-4'
        }, {
            'text': 'El precio de mantenimiento de los autos Suzuki es menor a $343 al mes.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-5'
        }, {
            'text': 'Suzuki es una marca con bajo índice de robo, reduciendo su costo de seguro anual.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-6'
        }, {
            'text': 'Nuestra garantía básica es por 3 años o 60,000 km. La garantía opcional es hasta por 6 años o 125,000 km.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-7'
        }, {
            'text': 'Somos especialistas fabricando vehículos de alto rendimiento de combustible.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-1'
        }, {
            'text': 'Tenemos más de 40 años de experiencia fabricando vehículos 4X4, y 25 manufacturando SUV.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-3'
        }, {
            'text': 'Marca creadora del vehículo más vendido en Japón del 2003 al 2011.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-8'
        }, {
            'text': 'La Póliza de seguro Sukicredit  te asegura reparaciones con partes originales hasta por 5 años.',
            'class': 'alert-suzuki',
            'url': '/razones#razon-9'
        }
    ]);
    /*
    Habilitar ya que esté el sitio de Suzuki
    if( instant_drive_available_time() ){
        add_instant_drive_messages();
    }
    */
    var no_open = ['instantdrive','razones'],
        current_url = ( window.location.pathname.split('/') )[1];
    if( $.inArray( current_url, no_open ) < 0 ){
        bubble.daemon(true);
    }

});
