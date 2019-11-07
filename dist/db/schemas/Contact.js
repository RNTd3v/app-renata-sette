"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');




























const ContactSchema = new (0, _mongoose.Schema)({
  phone: String,
  cellPhone: String,
  email: String,
  email2: String,
  street: String,
  number: String,
  district: String,
  city: String,
  state: String,
  cep: String,
  created: {
    type: Date,
    default: Date.now
  }
})

exports. default = _mongoose.model('Contact', ContactSchema)
