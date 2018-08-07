# Syncano Socket for generating documents from mustache templates

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-document-generator/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-document-generator/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-document-generator/master.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/document-generator.svg)](https://www.npmjs.com/package/@eyedea-sockets/)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-document-generator.svg)

Main Socket features:

* **document-generator/generate** — generate document

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/document-generator --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

const params = {
  template: '<p>Hello, my name is {{firstName}}</p>',
  data: {
    firstName: 'John'
  }
}
const generatedDoc = await s.post('document-generator/generate', params)

```

## Endpoints

### document-generator/generate

#### Input:

| Parameter | Type   | Description | Example                                 |
|-----------|--------|-------------|-----------------------------------------|
| template  | string | Template    | `<p>Hello, my name is {{firstName}}</p>`|
| data      | object | Data        | `{firstName: 'John'}`                   |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: text/html

**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Invitation failed      | `Internal error.`    |
