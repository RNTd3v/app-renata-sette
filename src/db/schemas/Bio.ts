import { Schema, model, Document } from 'mongoose'

interface BioInterface extends Document {
  titlePT: string;
  titleEN: string;
  contentPT?: string;
  contentEN?: string;
  picture?: string;
}

export interface BioModel {
  id?: string;
  titlePT: string;
  titleEN: string;
  contentPT?: string;
  contentEN?: string;
  picture?: string;
}

const BioSchema = new Schema({
  titlePT: {
    type: String,
    required: true
  },
  titleEN: {
    type: String,
    required: true
  },
  contentPT: String,
  contentEN: String,
  picture: String
})

export default model<BioInterface>('Bio', BioSchema)
