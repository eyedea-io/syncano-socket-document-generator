/* global describe it */
import {run} from '@syncano/test'

describe('generate', function () {
  it('simple test', async () => {
    require('@syncano/core').__setMocks({
      data: {
        profiles: {
          list: jest.fn().mockImplementationOnce((eventName, params) => {
            return Promise.resolve()
          })
        }
      }})

      const args = {
        template: '<p>Hello, my name is {{name}}</p>',
        data: {
          name: 'John'
        }
      }

      const result = await run('generate', {args})
      expect(result).toHaveProperty('code', 200)
      expect(typeof result.data).toEqual('string')
      expect(result.data).toContain(args.data.name)
  })
})
