import mongoose from 'mongoose'

import { KudoSchema } from './Kudo'

export const ParticipantSchema = new mongoose.Schema({ 
  name: String,
  image: String,
  kudos: [KudoSchema]
}, {
  timestamps: true
})

export default mongoose.model('Participant', ParticipantSchema)