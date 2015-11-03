var assert = require('assert')
var ifdef = require('../')

if (ifdef('ifdef_fixture')) {
  module.exports = ifdef('ifdef_fixture')
} else {
  assert(!global.required, 'Multiple require!')

  global.required = true

  module.exports = ifdef('ifdef_fixture', {
    test: true
  })
}
