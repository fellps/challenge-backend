import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import swaggerParser from 'swagger-parser'
import { connector } from 'swagger-routes-express'
import swagger from 'swagger-tools'
import swaggerUi from 'swagger-ui-express'

import * as controllers from '@controllers'
import database from '@database'
import { errorHandler } from '@middlewares/errors'
import { verifyToken } from '@middlewares/security'

const app = async () => {
  const parser = new swaggerParser()
  const apiDescription = await parser.validate('./src/routes/swagger.yml')
  const connect = connector(controllers, apiDescription)
  const app = express()

  // Connecting to the database
  database()
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err))

  return new Promise((resolve, reject) => {
    // Initialize the Swagger Middleware
    swagger.initializeMiddleware(apiDescription, (middleware) => {
      try {
        // Interpret Swagger resources and attach metadata to request
        app.use(middleware.swaggerMetadata())

        // Configure body parser and cors
        app.use(cors())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        // Provides a route for accessing API documentation
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDescription))

        // Provide the security handlers
        app.use(middleware.swaggerSecurity({
          Bearer: verifyToken
        }))

        // Validate Swagger requests
        app.use(middleware.swaggerValidator({
          validateResponse: true
        }))

        // Global error handler
        app.use(errorHandler)

        // Attach the routes
        connect(app)

        resolve(app)
      } catch (err) {
        reject(err)
      }
    })
  })
}

export default app