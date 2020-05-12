import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import swaggerParser from 'swagger-parser'
import { connector } from 'swagger-routes-express'
import swaggerUi from 'swagger-ui-express'

import * as controllers from '@controllers'
import database from '@database'

const app = async () => {
  const parser = new swaggerParser()
  const apiDescription = await parser.validate('./src/routes/swagger.yml')
  const connect = connector(controllers, apiDescription)
  const app = express()

  // Connecting to the database
  database()
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err))

  // Configure body parser and cors
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Provides a route for accessing API documentation
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDescription))

  // Attach the routes
  connect(app)

  return app
}

export default app