const express = require('express');
const path = require('path');
require('dotenv').config();


//App de Express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


  
// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


// app.listen(3000, (err) =>{
server.listen(process.env.PORT, (err) =>{

    if (err) throw new Error(err);

    console.log('Servidor corriento en puerto:', process.env.PORT);
});