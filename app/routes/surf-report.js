// surf-report.js

const fetchTideData = require('../fetch-tide-data')

module.exports = {
  method: 'GET',
  path: '/surf-report',
  handler: async (request, h) => {
    try {
      const data = await fetchTideData({ url: 'https://environment.data.gov.uk/flood-monitoring/id/stations/E71739/measures' })

      const value = data.items && data.items.length > 0 ? data.items[0].latestReading.value : null

      let message

      if (value !== null && value <= -1) {
        message = 'Go paddling!'
      } else {
        message = 'Stay at home'
      }

      return h.response({ value, message }).code(200)
    } catch (error) {
      console.error('Error fetching tide data:', error.message)
      return h.response({ error: 'Internal Server Error', message: error.message }).code(500)
    }
  }
}
