const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Введите не менее 2 символов'],
    maxlength: [30, 'Введите не более 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/.test(link);
      },
      message: (props) => `${props.value} ссылка невалидна`,
    },
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: Array,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
