var assert = require('assert')
const wiki = require('../index')

describe('Array', function () {
  describe('#wiki', function () {
    it('should return JSON object when wikipedia entry found. Otherwise null', function () {
      this.timeout(15000)
      return wiki({
        url: 'https://en.wikipedia.org/wiki/Node.js'
      }).then(function (data) {
        assert.ok(data)
      }).catch(function (error) {
        assert.fail(error)
      })
    })
  })
})
