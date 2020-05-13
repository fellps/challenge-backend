import mongoose from 'mongoose'

import { BroocheSchema } from './Brooche'

const UserSchema = new mongoose.Schema({ 
  name: String,
  email: String,
  brooches: [BroocheSchema],
  password: { type: String, select: false },
  roles: Array
}, {
  timestamps: true
})

export default mongoose.model('User', UserSchema)