
# MongoDB Provider

This is a MongoDB provider for underflag (feature flag/feature toggle)

> ⚠️ This repository has been **archived** for visual organization on GitHub.  
> It is part of the [`underflag`](https://github.com/diemsouza/underflag) monorepo, where it's maintained and updated.  
> The package is still available on [NPM](https://www.npmjs.com/package/underflag-mongodb).

## Install

Using npm:

```bash
npm install underflag-mongodb
```

Using yarn:

```bash
yarn add underflag-mongodb
```

## How to use

Import the underflag and prepare to load data provider

```js
import { Underflag } from "underflag";
import { MongodbDataProvider } from "underflag-mongodb";
import { MongoClient } from 'mongodb';

const client = new MongoClient(config.mongoUrl);
await client.connect();
const dataProvider = new MongodbDataProvider({ db: client.db() });
const underflag = new Underflag({ dataProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

_Attention: Do not forget of create the features collection in mongodb with the key and value fields._

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)
