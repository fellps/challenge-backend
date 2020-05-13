import Jwt from 'jsonwebtoken'

import config from '@config'

export const verifyToken = (req, def, scopes, callback) => {
  let token = req.headers['authorization']

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  if (token) {
    Jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (!err) {
        req.decoded = decoded
        callback()
      } else {
        return req.res.status(403).send({ 
          error: true,
          message: 'Invalid token'
        })
      }
    })
  } else {
    return req.res.status(400).send({
      error: true,
      message: 'Auth token is not supplied'
    })
  }
}