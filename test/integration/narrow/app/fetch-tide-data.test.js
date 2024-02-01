// fetch-tide-data.test.js

const fetchTideData = require('../../../../app/fetch-tide-data')

const url = 'https://environment.data.gov.uk/flood-monitoring/id/stations/E71739/measures'

describe('Surf Report API', () => {
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
    const invalidUrl = 'https://example.com/invalid-url'

    await expect(fetchTideData({ url: invalidUrl })).rejects.toThrow()
  })
})
