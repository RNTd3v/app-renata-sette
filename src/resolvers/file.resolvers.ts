import { createWriteStream, existsSync, mkdirSync  } from 'fs';
import path from "path";
import { GraphQLUpload } from 'apollo-upload-server';
import * as shortid from 'shortid'

const storeUpload = async ({ stream, filename }): Promise<any> => {
  const id = shortid.generate()
  const path = `${id}-${filename}`

  return new Promise(
    (resolve, reject): Promise<any> =>
      stream
        .pipe(createWriteStream(path))
        .on('finish', () => resolve({ id, path }))
        .on('error', reject)
  )
}

const recordFile = file => {
  // TODO
  console.log(file)
}

const processUpload = async (upload): Promise<any> => {
  const { createReadStream, filename, mimetype, encoding } = await upload
  console.log(upload)
  /*const stream = createReadStream()
  const { id, path } = await storeUpload({ stream, filename })
  return recordFile({ id, filename, mimetype, encoding, path })*/
  return { path: ''}
}

export default {
  Upload: GraphQLUpload,
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { stream, mimetype } = await file;
      console.log("teste")
      console.log(stream);

      return { path: ''}
    }
  }
}
