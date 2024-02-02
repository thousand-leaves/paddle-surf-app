// surf-report.test.js

const { handler } = require('../../../../app/routes/surf-report')

// Mock the fetchTideData module
jest.mock('../../../../app/fetch-tide-data')

describe('Surf Report API', () => {
  let mockFetchTideData
  let mockH

  // Common setup before all tests
  beforeAll(() => {
    // Additional setup code that should run once before all tests
    mockFetchTideData = jest.requireMock('../../../../app/fetch-tide-data')
    mockH = setupMockH()
  })

  // Common setup before each test
  beforeEach(() => {
    // Additional setup code that runs before each test
    mockFetchTideData.mockClear()
    mockH.response.mockClear()
  })

  test('should return the "go paddling" response for valid tide data', async () => {
    const request = {
      query: {
        value: -3
      }
    }

    mockFetchTideData.mockResolvedValue({
      items: [{ latestReading: { value: -3 } }]
    })

    const response = await handler(request, mockH)

    expect(mockH.response).toHaveBeenCalledWith({
      value: -3,
      message: 'Go paddling!'
    })
    expect(response).toEqual({
      value: -3,
      message: 'Go paddling!'
    })
  })

  test('should return the "stay at home" response for valid tide data', async () => {
    const request = {
      query: {
        value: 2
      }
    }

    mockFetchTideData.mockResolvedValue({
      items: [{ latestReading: { value: 2 } }]
    })

    const response = await handler(request, mockH)

    expect(mockH.response).toHaveBeenCalledWith({
      value: 2,
      message: 'Stay at home'
    })
    expect(response).toEqual({
      value: 2,
      message: 'Stay at home'
    })
  })

  test('should return an error for invalid data', async () => {
    const request = { query: { value: -3 } }

    // Mock the h object with a response function having a code method
    const h = { response: jest.fn().mockReturnValue({ code: jest.fn() }) }

    // Mock the fetchTideData function to simulate an error
    const errorMessage = 'Simulated error fetching tide data'

    const mockFetchTideData = jest.requireMock('../../../../app/fetch-tide-data')

    // Use mockImplementation to handle the rejection
    mockFetchTideData.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    const response = await handler(request, h)

    // Expect the response to contain an error message due to the simulated error
    expect(h.response).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: errorMessage
    })
    // Expect the response code to be 500 due to the simulated error
    expect(h.response().code).toHaveBeenCalledWith(500)

    // Ensure the response structure matches expectations
    expect(response).toEqual(undefined)
  })
})

// Common function to set up a mock h object
function setupMockH () {
  return {
    response: jest.fn().mockImplementation((data) => ({
      code: jest.fn().mockReturnValue(data)
    }))
  }
}
