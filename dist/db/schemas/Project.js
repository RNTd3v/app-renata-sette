"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');




























const ProjectSchema = new (0, _mongoose.Schema)({
  namePT: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  },
  codePT: String,
  codeEN: String,
  descriptionPT: String,
  descriptionEN: String,
  date: String,
  picture: String,
  movie: String,
  icon: String
})

exports. default = _mongoose.model('Project', ProjectSchema)
