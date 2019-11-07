"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
















const BioSchema = new (0, _mongoose.Schema)({
  titlePT: {
    type: String,
    required: true
  },
  titleEN: {
    type: String,
    required: true
  },
  contentPT: String,
  contentEN: String
})

exports. default = _mongoose.model('Bio', BioSchema)
