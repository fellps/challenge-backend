import 'dotenv/config'

export default {
  environment: process.env.ENVIRONMENT,
  apiPort: process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URI
  }
}