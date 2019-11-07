"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

















const SliderSchema = new (0, _mongoose.Schema)({
  titlePT: {
    type: String,
    required: true
  },
  titleEN: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  linkPT: String,
  linkEN: String
})

exports. default = _mongoose.model('Slider', SliderSchema)
