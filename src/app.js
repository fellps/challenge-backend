import bodyParser from 'body-parser'
import express from 'express'
import swaggerParser from 'swagger-parser'
import { connector } from 'swagger-routes-express'
import swaggerUi from 'swagger-ui-express'

import * as controllers from '@controllers'

const app = async () => {
  const parser = new swaggerParser()
  const apiDescription = await parser.validate('./src/routes/swagger.yml')
  const connect = connector(controllers, apiDescription)
  const app = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // provides a route for accessing API documentation
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDescription))

  // attach the routes
  connect(app)

  return app
}

export default app