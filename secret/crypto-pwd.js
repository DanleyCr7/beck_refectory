const crypto = require('crypto');
const dataSecret = require('./data-secret');

exports.cipherPwd = (pwd) => {
  const cipher = crypto.createCipher(dataSecret.algorithm, dataSecret.secret);
  cipher.update(`${pwd}`);
  return cipher.final(dataSecret.format);
}

exports.decipherPwd = (pwd) => {
  const decipher = crypto.createDecipher(dataSecret.algorithm, dataSecret.secret);
  decipher.update(`${pwd}`, dataSecret.format);
  return decipher.final();
}