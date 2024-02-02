// server.js

require('./insights').setup()
const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT
})

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/surf-report')
)

server.route(routes)

// Manually set CORS headers in the onPreResponse extension
server.ext('onPreResponse', (request, h) => {
  const response = request.response
  if (response.isBoom) {
    // Handle Boom errors (e.g., validation errors)
    return h.continue
  }

  // Enable CORS for all routes
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

  return h.continue
})

module.exports = server
