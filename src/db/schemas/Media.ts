import { Schema, model, Document } from 'mongoose'

interface MediaInterface extends Document {
  workID: string;
  titlePT: string;
  titleEN: string;
  url: string;
}

export interface MediaModel {
  id?: string;
  workID: string;
  titlePT: string;
  titleEN: string;
  url: string;
}

const MediaSchema = new Schema({
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
  url: {
    type: String,
    required: true
  }
})

export default model<MediaInterface>('Media', MediaSchema)
