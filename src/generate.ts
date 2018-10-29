import * as S from '@eyedea/syncano'
import md from 'marked'
import * as Mustache from 'mustache'
import helpers from './helpers'

interface Args {
  template: string
  data: object
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {response}: S.Core,
    {args}: S.Context<Args>
  ) {
    let template = args.template
    template = md(template)
    const rendered = Mustache.render(template, {...args.data, ...helpers})

    response(rendered, 200, 'text/html')
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch() {
    this.syncano.response.json({message: 'Failed to generate document.'}, 400)
  }
}

export default ctx => new Endpoint(ctx)
