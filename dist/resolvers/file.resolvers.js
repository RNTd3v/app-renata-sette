"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _fs = require('fs');

var _apollouploadserver = require('apollo-upload-server');
var _shortid = require('shortid'); var shortid = _interopRequireWildcard(_shortid);

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${id}-${filename}`

  return new Promise(
    (resolve, reject) =>
      stream
        .pipe(_fs.createWriteStream.call(void 0, path))
        .on('finish', () => resolve({ id, path }))
        .on('error', reject)
  )
}

const recordFile = file => {
  // TODO
  console.log(file)
}

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype, encoding } = await upload
  console.log(upload)
  /*const stream = createReadStream()
  const { id, path } = await storeUpload({ stream, filename })
  return recordFile({ id, filename, mimetype, encoding, path })*/
  return { path: ''}
}

exports. default = {
  Upload: _apollouploadserver.GraphQLUpload,
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { stream, mimetype } = await file;
      console.log("teste")
      console.log(stream);

      return { path: ''}
    }
  }
}
