import 'module-alias/register'
import config from '@config'

import app from './app'

app()
  .then(app => app.listen(config.apiPort, () => {
    console.log('info', `Server is listening on port ${config.apiPort}!`)
  }))
  .catch(err => console.log(err))

// Utilizado nos testes
if (process.env.TEST_MODE) {
  module.exports = app
}