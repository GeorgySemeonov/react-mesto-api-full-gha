const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => validator.isURL(url),
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => validator.isEmail(email),
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

  },
);

module.exports = mongoose.model('user', userSchema);
