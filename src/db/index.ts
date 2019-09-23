import mongoose from 'mongoose'
import Bio from './schemas/Bio'
import Category from './schemas/Category'
import Contact from './schemas/Contact'
import Media from './schemas/Media'
import Project from './schemas/Project'
import Slider from './schemas/Slider'
import SocialMedia from './schemas/SocialMedia'
import User from './schemas/User'
import Work from './schemas/Work'

mongoose.Promise = global.Promise

// mongodb+srv://renatasetteapp:<password>@cluster0-f2n8w.mongodb.net/test?retryWrites=true&w=majority

export const startDB = ({ user, pwd, url, db }): any => mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

export const models = {
  Bio,
  Category,
  Contact,
  Media,
  Project,
  Slider,
  SocialMedia,
  User,
  Work
}
