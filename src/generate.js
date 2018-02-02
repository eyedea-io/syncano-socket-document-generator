import Mustache from 'mustache'
import md from 'marked'
import helpers from './helpers'

import Syncano from '@syncano/core'

export default (ctx) => {
  const {response} = new Syncano(ctx)

  let {template: t, data} = ctx.args

  try {
    t = md(t) // Parse markdown
    t = Mustache.render(t, {...data, ...helpers})
    return response(t, 200, 'text/html')
  } catch (err) {
    response.json({message: 'Failed to generate document.', details: err.toString()}, 400)
  }
}
