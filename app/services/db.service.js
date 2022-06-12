

const mongoose = require('mongoose')
require('dotenv/config')


const dbService = () => {
  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log("Terkoneksi ke DB!"); 
  // mongoose.set('debug', (collection, method, query) => {
  //   console.log({
  //     type: 'query',
  //     collection,
  //     method,
  //     query
  //   });
  // });
  });
  mongoose.connection.on('connected', () => {
    console.log('Mongo has connected succesfully')
  })
  mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
  })
  mongoose.connection.on('error', error => {
    console.log('Mongo connection has an error', error)
    mongoose.disconnect()
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection is disconnected')
  })
};

module.exports = dbService;