/* global describe, it */
import Syncano from 'syncano-client'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

const assert = chai.assert
const s = new Syncano(process.env.SYNCANO_INSTANCE_NAME)

// TODO: Initialize temporary instance name

describe('document generator', function () {
  let document = {
    template: '<p>Hello, my name is {{firstName}}</p>',
    data: {
      firstName: 'John'
    }
  }

  it('generator', function (done) {
    s
      .post('document-generator/generate', document)
      .then(response => {
        assert.equal(response, '<p>Hello, my name is John</p>')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})
