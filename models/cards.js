const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Заполните поле'],
    minlength: [2, 'Введите не менее 2 символов'],
    maxlength: [30, 'Введите не более 30 символов'],
  },
  link: {
    type: String,
    require: [true, 'Заполните поле'],
    validate: {
      validator: (v) => /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v),
      message: 'Введите ссылку',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    require: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("card", cardSchema);
