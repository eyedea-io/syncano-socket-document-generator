/* global describe it */
import {run} from '@syncano/test'

describe('generate', function () {
  let args = {
    template: '<p>Hello, my name is {{firstName}}</p>',
    data: {
      firstName: 'John'
    }
  }

  it('simple generation', async () => {
    const result = await run('generate', {args})
    expect(result).toHaveProperty('code', 200)
    expect(result).toHaveProperty('data', '<p>Hello, my name is John</p>')
    expect(result).toHaveProperty('mimetype', 'text/html')

  })

  it('without args', async () => {
    const argsWithoutData = Object.assign({}, args)
    delete argsWithoutData.data

    const result = await run('generate', {argsWithoutData})
    expect(result).toHaveProperty('code', 400)
    expect(result).toHaveProperty('mimetype', 'application/json')
    expect(result.data).toHaveProperty('message', 'Failed to generate document.')
  })
})
