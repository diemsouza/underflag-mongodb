import { Underflag } from 'underflag';
import { MongodbDataProvider } from '../../src/providers/MongodbDataProvider';
import { MongoClient } from 'mongodb';
import config from './config.json';

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.getFeature(key);
    return {
        key,
        status: data?.isOn() ? 'on' : 'off',
        value: data?.value,
        origin: data?.origin
    };
};

(async () => {
    // config data provider
    const client = new MongoClient(config.mongoUrl);
    await client.connect();
    const db = client.db();

    // use data privider
    const dataProvider = new MongodbDataProvider({ db });
    const underflag = new Underflag({ dataProvider });

    // check feature flags
    const list: any[] = [];
    for (const key of config.features) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);

    await client.close();
})();