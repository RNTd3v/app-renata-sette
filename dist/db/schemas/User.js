"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');








const UserSchema = new (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

exports. default = _mongoose.model('User', UserSchema)
