import 'module-alias/register'
import config from '@config'

import app from './app'

// Start app
(function initialize() {
  app()
    .then(app => {
      app.listen(config.apiPort, () => {
        console.log('info', `Server is listening on port ${config.apiPort}!`)
      })
      // Used in unit tests
      if (process.env.TEST_MODE) {
        module.exports = app
      }
    })
    .catch(err => console.log(err))
})()