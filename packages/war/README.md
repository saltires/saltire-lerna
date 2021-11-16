# @ahau2019/war

Compresses a specified directory into a war file

By default, WAR will operate on the DIST directory under the project, which will render some content to the Dist directory according to some templates of the deploy directory, and finally compress all files.

## Install

```bash
npm install @ahau2019/war -D
```

## Quick Start

```js
// With war installed locally, you can execute the following commands
npx war
```

## Options

You can specify the default behavior of the WAR through some options.

### [-t] [--template]

Specify the address of the deploy template directory

```js
// Assume that the deploy directory exists in the layer above the current project
npx war -t '../'
```

### [-s] [--src]

Specifies which folder to package

```js
npx war -s '../dist'
```

### [-o] [--output]

Specify output address

```js
npx war -s '../'
```

## config

SEE configuration stored in package.json

```js
"see": {
  "packageName": "xxxx",
  "systemType": "xxxx",
  "appType": "xxxx",
  "packageVersion": "xxx",
  "miniVersion": "xxxx",
  "appDescription": "xxxx"
},
```
