import { IDataProvider, BaseFeature } from 'underflag';
import * as mongoDB from 'mongodb';

const DEFAULT_COLLECTION = 'features';

interface Options {
    /** Collection name of data. Default: 'features' */
    collectionName?: string,
    /** An instance of mongodb */
    db: mongoDB.Db
}

export class MongodbDataProvider implements IDataProvider {
    private db: mongoDB.Db;
    private collection: mongoDB.Collection<BaseFeature>;

    constructor(options: Options) {
        this.db = options.db;
        this.collection = this.db.collection<BaseFeature>(options.collectionName || DEFAULT_COLLECTION);
    }

    async getAll(): Promise<BaseFeature[]> {
        const dataResult = await this.collection.find({}, { projection: { _id: 0 } }).toArray();
        return dataResult as BaseFeature[];
    }

    async get(key: string): Promise<BaseFeature | undefined> {
        const dataResult = await this.collection.findOne({ key }, { projection: { _id: 0 } });
        if (!dataResult) return undefined;
        return dataResult as BaseFeature;
    }
}