const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('db.online');

        console.log('init db config')
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el Administrador')
    }

}

module.exports = {
    dbConnection
}