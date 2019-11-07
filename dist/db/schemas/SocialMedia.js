"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');














const SocialMediaSchema = new (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String
  }
})

exports. default = _mongoose.model('SocialMedia', SocialMediaSchema)
