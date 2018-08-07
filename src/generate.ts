import Mustache from 'mustache'
import md from 'marked'
import helpers from './helpers'
import * as S from '@eyedea/syncano'

interface Args {
  template: string
  data: object
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {response, logger}: S.Core,
    {args}: S.Context<Args>
  ) {
    let template = args.template
    template = md(template) // Parse markdown
    const rendered = Mustache.render(template, {...args.data, ...helpers})
    return response(rendered, 200, 'text/html')
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
