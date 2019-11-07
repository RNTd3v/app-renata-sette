"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _Bio = require('./schemas/Bio'); var _Bio2 = _interopRequireDefault(_Bio);
var _Category = require('./schemas/Category'); var _Category2 = _interopRequireDefault(_Category);
var _Contact = require('./schemas/Contact'); var _Contact2 = _interopRequireDefault(_Contact);
var _Media = require('./schemas/Media'); var _Media2 = _interopRequireDefault(_Media);
var _Project = require('./schemas/Project'); var _Project2 = _interopRequireDefault(_Project);
var _Slider = require('./schemas/Slider'); var _Slider2 = _interopRequireDefault(_Slider);
var _SocialMedia = require('./schemas/SocialMedia'); var _SocialMedia2 = _interopRequireDefault(_SocialMedia);
var _User = require('./schemas/User'); var _User2 = _interopRequireDefault(_User);
var _Work = require('./schemas/Work'); var _Work2 = _interopRequireDefault(_Work);

_mongoose2.default.Promise = global.Promise

// mongodb+srv://renatasetteapp:<password>@cluster0-f2n8w.mongodb.net/test?retryWrites=true&w=majority

 const startDB = ({ user, pwd, url, db, dbInitial, dbFinal }) => _mongoose2.default.connect(`${dbInitial}://${user}:${pwd}@${url}/${db}?${dbFinal}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}); exports.startDB = startDB

 const models = {
  Bio: _Bio2.default,
  Category: _Category2.default,
  Contact: _Contact2.default,
  Media: _Media2.default,
  Project: _Project2.default,
  Slider: _Slider2.default,
  SocialMedia: _SocialMedia2.default,
  User: _User2.default,
  Work: _Work2.default
}; exports.models = models
