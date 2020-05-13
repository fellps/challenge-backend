import mongoose from 'mongoose'

export const BroocheSchema = new mongoose.Schema({ 
  name: String,
  total: Number
}, {
  timestamps: true
})

export default mongoose.model('Brooche', BroocheSchema)