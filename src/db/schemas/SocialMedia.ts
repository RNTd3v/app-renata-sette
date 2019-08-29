import { Schema, model, Document } from 'mongoose'

interface SocialMediaInterface extends Document {
  titlePT: string;
  titleEN: string;
  url: string;
}

export interface SocialMediaModel {
  id?: string;
  titlePT: string;
  titleEN: string;
  url: string;
}

const SocialMediaSchema = new Schema({
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

export default model<SocialMediaInterface>('SocialMedia', SocialMediaSchema)
