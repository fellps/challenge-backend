import mongoose from 'mongoose'

const kindsOfActs = Object.freeze({
  Awesome: 'awesome',
  Grateful: 'grateful',
  Learned: 'learned',
})

export const KudoSchema = new mongoose.Schema({ 
  kudo: {
    type: String,
    enum: Object.values(kindsOfActs),
  },
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: [true, 'Participant is required']
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