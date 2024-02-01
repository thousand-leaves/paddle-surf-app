// sure-report.test.js

const request = require('supertest')
const server = require('../../../../app/server')

describe('Surf Report API', () => {
  test('should return the correct response for valid tide data', async () => {
    const response = await request(server.listener).get('/surf-report')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('message')
  })
})
