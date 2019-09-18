import { Schema, model, Document } from 'mongoose'

interface CategoryInterface extends Document {
  codePT: string;
  codeEN: string;
  namePT: string;
  nameEN: string;
  icon?: string;
}

export interface CategoryModel {
  id?: string;
  codePT?: string;
  codeEN?: string;
  namePT: string;
  nameEN: string;
  icon?: string;
}

const CategorySchema = new Schema({
  codePT: String,
  codeEN: String,
  namePT: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

export default model<CategoryInterface>('Category', CategorySchema)
