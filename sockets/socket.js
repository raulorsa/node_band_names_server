
const {io} = require('../index.js');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Metalica'));
bands.addBand( new Band('The Cranberries'));
bands.addBand( new Band('Heroes del Silencio'));

// Mensajes de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands)

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });


    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('Escuchandp', payload);
    });

    client.on('vote-band', (payload) => {

        bands.voteBand( payload.id );

        //Usamos IO para enviar a todo el mundo
        io.emit('active-bands', bands.getBands());
    });


    client.on('add-band', (payload)=> {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);

        //Usamos IO para enviar a todo el mundo
        io.emit('active-bands', bands.getBands());
    });


    client.on('delete-band', (payload)=> {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
    });
    
    // client.on('emitir-mensaje', (payload) => {
    //     //io.emit('nuevo-mensaje', payload);
    //     //Pero para emitir a todos menos al que emite cambiar por:
    //     client.broadcast.emit('nuevo-mensaje', payload);
    //     console.log(payload);
    // });
    
    client.on('nuevo-mensaje', (payload) => {
        console.log('Escuchando: ', payload);

        io.emit('Escuchando', payload);
    });
});