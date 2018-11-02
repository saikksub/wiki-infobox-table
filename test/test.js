var assert = require('assert')
const wiki = require('../index')

describe('Array', function () {
  describe('#wiki', function () {
    it('should return JSON object when wikipedia entry found. Otherwise null', function () {
      this.timeout(15000)
      return wiki({
        data: 'microsoft'
      }).then(function (data) {
        assert.equal(data.ok === 'ok', true)
      })
    })
  })
})
