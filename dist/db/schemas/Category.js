"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


















const CategorySchema = new (0, _mongoose.Schema)({
  codePT: String,
  codeEN: String,
  namePT: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

exports. default = _mongoose.model('Category', CategorySchema)
