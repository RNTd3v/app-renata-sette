import { Schema, model, Document } from 'mongoose'

interface BioInterface extends Document {
  titlePT: string;
  titleEN: string;
  contentPT?: string;
  contentEN?: string;
}

export interface BioModel {
  id?: string;
  titlePT: string;
  titleEN: string;
  contentPT?: string;
  contentEN?: string;
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
  contentEN: String
})

export default model<BioInterface>('Bio', BioSchema)
