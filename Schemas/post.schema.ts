import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  content: String,
})

export default model('PostSchema', PostSchema)
