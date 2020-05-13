import 'dotenv/config'

export default {
  environment: process.env.ENVIRONMENT,
  apiPort: process.env.PORT || 3000,
  passwordSecret: process.env.PASSWORD_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    uri: process.env.MONGO_URI
  }
}