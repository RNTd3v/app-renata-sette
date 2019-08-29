import mongoose from 'mongoose'
import Bio from './schemas/Bio'
import Category from './schemas/Category'
import Media from './schemas/Media'
import Slider from './schemas/Slider'
import SocialMedia from './schemas/SocialMedia'
import User from './schemas/User'
import Work from './schemas/Work'

mongoose.Promise = global.Promise

export const startDB = ({ user, pwd, url, db }): any => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}?authSource=admin`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

export const models = {
  Bio,
  Category,
  Media,
  Slider,
  SocialMedia,
  User,
  Work
}
