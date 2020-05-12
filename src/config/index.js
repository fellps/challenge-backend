import 'dotenv/config'

export default {
  environment: process.env.ENVIRONMENT,
  apiPort: process.env.PORT || 3001,
  mongo: {
    uri: process.env.MONGO_URI
  }
}