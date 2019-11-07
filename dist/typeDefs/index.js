"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }Object.defineProperty(exports, "__esModule", {value: true});var _path = require('path'); var path = _interopRequireWildcard(_path);
var _mergegraphqlschemas = require('merge-graphql-schemas');

const typesArray = _mergegraphqlschemas.fileLoader.call(void 0, path.join(__dirname, './'))
const typesMerged = _mergegraphqlschemas.mergeTypes.call(void 0, typesArray)

exports. default = typesMerged
