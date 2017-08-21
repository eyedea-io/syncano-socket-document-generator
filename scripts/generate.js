/* global ARGS */
import {response} from 'syncano-server'
import {compile} from 'template7'
import md from 'marked'

let {template: t, data} = ARGS

try {
  t = md(t) // Parse markdown
  t = compile(t) // Create template
  t = t(data) // Parse template with data
  response(t, 200, 'text/html')
} catch (err) {
  response.json({message: 'Failed to generate document.'}, 400)
}
