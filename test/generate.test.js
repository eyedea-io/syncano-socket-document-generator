/* global describe it */
import {assert} from 'chai'
import {run, generateMeta} from 'syncano-test'

describe('generate', function () {
  const meta = generateMeta()

  let args = {
    template: '<p>Hello, my name is {{firstName}}</p>',
    data: {
      firstName: 'John'
    }
  }

  it('simple generation', function (done) {
    run('generate', {args, meta})
      .then(res => {
        assert.propertyVal(res, 'code', 200)
        assert.propertyVal(res, 'data', '<p>Hello, my name is John</p>')
        assert.propertyVal(res, 'mimetype', 'text/html')
        done()
      })
  })

  it('without args', function (done) {
    const argsWithoutData = Object.assign({}, args)
    delete argsWithoutData.data

    run('generate', {argsWithoutData, meta})
      .then(res => {
        assert.propertyVal(res, 'code', 400)
        assert.propertyVal(res, 'mimetype', 'application/json')
        assert.propertyVal(res.data, 'message', 'Failed to generate document.')
        done()
      })
  })
})
