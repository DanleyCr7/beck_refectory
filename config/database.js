const mongoose = require('mongoose');

const student = require('../models/student-model');
const menu = require('../models/menu-model'); 

exports.connect = () => {
  return new Promise((resolve, reject) => {

    mongoose.connect('mongodb://localhost:27017/refectory', {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
    
    mongoose.connection.on('connected', () => {
      console.log('[Mongoose] - Connected');
      resolve();
    });
    
    mongoose.connection.on('err', err => {
      console.log('[Mongoose] - Err: ', err);
      reject();
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('[Mongoose] - Disconnected');
    });
  });
}