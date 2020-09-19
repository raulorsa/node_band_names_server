
const {io} = require('../index.js');
const Bands = require('../models/bands.js');

const bands = new Bands();
bands.addBand( new Bands('Queen'));
bands.addBand( new Bands('Metalica'));
bands.addBand( new Bands('The Cranberries'));
bands.addBand( new Bands('Heroes del Silencio'));

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

    client.on('vote-band', (payload)=> {
        bands.voteBand(payload);

        //Usamos IO para enviar a todo el mundo
        io.emit('active-bands', bands.getBands());
    });


    client.on('add-band', (payload)=> {
        const newBand = new Band(payload.name);
        bands.addBAnd(newBand);

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
        const newBand = new Band(payload.name);
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

        io.emit('Escuchandp', payload);
    });
});