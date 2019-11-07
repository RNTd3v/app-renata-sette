"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


















const MediaSchema = new (0, _mongoose.Schema)({
  workID: {
    type: String,
    required: true
  },
  titlePT: {
    type: String,
    required: true
  },
  titleEN: {
    type: String,
    required: true
  },
  isMovie: Boolean,
  url: {
    type: String,
    required: true
  }
})

exports. default = _mongoose.model('Media', MediaSchema)
