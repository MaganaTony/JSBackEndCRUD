const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

function encrypt(plainText) {
  return bcrypt.hashSync(plainText, SALT_ROUNDS);
}

function compare(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = {
  encrypt,
  compare,
};
