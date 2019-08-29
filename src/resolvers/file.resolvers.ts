import { createWriteStream } from 'fs'
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
  const stream = createReadStream()
  const { id, path } = await storeUpload({ stream, filename })
  return recordFile({ id, filename, mimetype, encoding, path })
}

export default {
  Mutation: {
    singleUpload: (obj, { file }): Promise<any> => processUpload(file)
  }
}
