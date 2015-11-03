var assert = require('assert')

function emptyCache() {
  if (!require.cache) {
    return
  }

  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}

function checkFixture(fixture) {
  assert(fixture.test, 'Bad module')
  return fixture
}

function reset() {
  emptyCache()
  global.required = false
  global.ifdefGuards = {}
}

describe('ifdef', function () {
  beforeEach(reset)

  it('should not allow the same module to be multiply required', function () {
    checkFixture(require('./fixture'))
    emptyCache()
    checkFixture(require('./fixture'))
  })

  it('should preserve the exports when multiply required', function () {
    var fixture = checkFixture(require('./fixture'))
    emptyCache()
    assert(fixture === checkFixture(require('./fixture')), 'Wrong exports')
  })
})
