import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({ 
  name: String,
  email: String,
  password: { type: String, select: false },
  roles: Array
}, {
  timestamps: true
})

export default mongoose.model('User', UserSchema)