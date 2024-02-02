// fetch-tide-data.test.js

const fetchTideData = require('../../../../app/fetch-tide-data')
const nock = require('nock')

const url = 'https://environment.data.gov.uk/flood-monitoring/id/stations/E71739/measures'
const invalidUrl = 'https://example.com/invalid-url'

describe('Surf Report API', () => {
  beforeEach(() => {
    // Set up a mock for the valid URL
    nock('https://environment.data.gov.uk')
      .get('/flood-monitoring/id/stations/E71739/measures')
      .reply(200, {
        items: [{ latestReading: { value: -3 } }]
      })
    // Set up a mock for the invalid URL
    nock('https://example.com')
      .get('/invalid-url')
      .reply(404)
  })

  test('should return defined payload', async () => {
    const response = await fetchTideData({ url })
    expect(response).toBeDefined()
  })
  test('should return payload with items', async () => {
    const response = await fetchTideData({ url })
    expect(response.items).toBeDefined()
  })
  test('should return payload with items array', async () => {
    const response = await fetchTideData({ url })
    expect(response.items).toBeInstanceOf(Array)
  })
  test('should return payload with items array with length greater than zero', async () => {
    const response = await fetchTideData({ url })
    expect(response.items.length).toBeGreaterThan(0)
  })
  test('should return error if url is invalid', async () => {
    await expect(fetchTideData({ url: invalidUrl })).rejects.toThrow()
  })
})
