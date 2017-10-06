import {compile} from 'template7'
import md from 'marked'

import Syncano from 'syncano-server'

export default (ctx) => {
  const {response} = Syncano(ctx)

  let {template: t, data} = ctx.args

  try {
    t = md(t) // Parse markdown
    t = compile(t) // Create template
    t = t(data) // Parse template with data
    response(t, 200, 'text/html')
  } catch (err) {
    response.json({message: 'Failed to generate document.'}, 400)
  }
}
