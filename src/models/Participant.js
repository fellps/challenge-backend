import mongoose from 'mongoose'

import { KudoSchema } from './Kudo'

const ParticipantSchema = new mongoose.Schema({ 
  name: String, 
  kudos: [KudoSchema]
}, {
  timestamps: true
})

export default mongoose.model('Participant', ParticipantSchema)