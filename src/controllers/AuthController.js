import Crypto from 'crypto'
import Jwt from 'jsonwebtoken'
import _ from 'lodash'

import config from '@config'
import User from '@models/User'

const login = async (req, res) => {
  try {
    // Calculate password hash
    const hash = Crypto.createHmac('sha256', config.passwordSecret)
      .update(req.body.password)
      .digest('hex')

    // Search for user with email and password
    const user = await User.findOne({
      email: req.body.login,
      password: hash
    })

    if(_.isEmpty(user)) {
      return res.status(404).send({ 
        error: true, 
        message: 'Email not found or password is invalid' 
      })
    }
    
    const { 
      _id: id, 
      name,
      brooches
    } = user
    
    const result = {
      error: false,
      message: 'Successfully authenticated',
      name,
      brooches,
      token: Jwt.sign({ id }, config.jwtSecret, {
        expiresIn: 60 * 60 * 12 // expires in 12h
      })
    }

    return res.send(result)
  } catch (err) {
    return res.status(500).send({ 
      error: true,
      message: 'Internal server error'
    })
  }
}

const logout = async (req, res) => {
  return res.send({ 
    error: false,
    message: 'Logout successful',
    token: null 
  })
}

export {
  login,
  logout
}