// fetch-tide-data.js

const Wreck = require('@hapi/wreck')

const fetchTideData = async ({ url }) => {
  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching data:', error.message)
    throw error
  }
}

module.exports = fetchTideData
