import Mustache from 'mustache'
import md from 'marked'
import helpers from './helpers'

import Syncano from 'syncano-server'

export default (ctx) => {
  const {response} = Syncano(ctx)

  let {template: t, data} = ctx.args

  try {
    t = md(t) // Parse markdown
    t = Mustache.render(t, {...data, ...helpers})
    response(t, 200, 'text/html')
  } catch (err) {
    response.json({message: 'Failed to generate document.', details: err.toString()}, 400)
  }
}
