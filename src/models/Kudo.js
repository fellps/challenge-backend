import mongoose from 'mongoose'

const kindsOfActs = Object.freeze({
  Awesome: 'awesome',
  Grateful: 'grateful',
  Learned: 'learned',
})

const KudoSchema = new mongoose.Schema({ 
  kudo: {
    type: String,
    enum: Object.values(kindsOfActs),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
}, {
  timestamps: true
})

export default mongoose.model('Kudo', KudoSchema)