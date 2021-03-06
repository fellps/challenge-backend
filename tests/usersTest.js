/* global before describe it */
process.env.TEST_MODE = true
import 'module-alias/register'
import should from 'should'
import request from 'supertest'

import app from '../src/app'
import { validUser, invalidUser } from './mockData/Users'

describe('Novatics Challenge', () => {
  let server

  before(async () => {
    server = await app()
  })

  describe('Login', () => {
    it('Should log in user and return a valid token', done => {
      request(server)
        .post('/v1/authenticate')
        .send({ login: validUser.login, password: validUser.password})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(200)
          res.body.should.be.instanceOf(Object)
          res.body.message.should.equal('Successfully authenticated')
          res.body.should.have.properties('error', 'message', 'name', 'token')
          done()
        })
    })
    it('Should return login not found message', done => {
      request(server)
        .post('/v1/authenticate')
        .send({ login: invalidUser.login, password: invalidUser.password})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(404)
          res.body.should.be.instanceOf(Object)
          res.body.message.should.equal('Email not found or password is invalid')
          res.body.should.have.properties('error', 'message')
          done()
        })
    })
    it('Should return 400 Bad Request when no parameters are informed', done => {
      request(server)
        .post('/v1/authenticate')
        .send({ login: validUser.login })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(400)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('error', 'message')
          res.body.message.should.equal('Request validation failed: Parameter (password) is required')
          done()
        })
    })
    it('Should return 400 Bad Request when the password field is empty', done => {
      request(server)
        .post('/v1/authenticate')
        .send({ login: validUser.login, password: '' })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.be.eql(400)
          res.body.should.be.instanceOf(Object)
          res.body.should.have.properties('error', 'message')
          res.body.message.should.equal('Request validation failed: Parameter (password) is too short (0 chars), minimum 1')
          done()
        })
    })
  })
})