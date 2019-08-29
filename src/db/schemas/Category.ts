import { Schema, model, Document } from 'mongoose'

interface CategoryInterface extends Document {
  namePT: string;
  nameEN: string;
  icon?: string;
}

export interface CategoryModel {
  id?: string;
  namePT: string;
  nameEN: string;
  icon?: string;
}

const CategorySchema = new Schema({
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
