import mongoose from 'mongoose'

export default () => {
  mongoose.Promise = global.Promise

  // Return mongoose connection
  return mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(() => {
    console.log('Successfully connected to the database')
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
  })
}