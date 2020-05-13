import 'module-alias/register'
import config from '@config'

import app from './app'

// Start app
function initialize() {
  return app()
    .then(app => {
      app.listen(config.apiPort, () => {
        console.log('info', `Server is listening on port ${config.apiPort}!`)
      })
      return app
    })
    .catch(err => console.log(err))
}

initialize()

// Used in unit tests
if (process.env.TEST_MODE) {
  module.exports = app()
}