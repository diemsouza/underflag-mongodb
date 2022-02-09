import { IDataProvider, Feature } from 'underflag';
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
    private collection: mongoDB.Collection<Feature>;

    constructor(options: Options) {
        this.db = options.db;
        this.collection = this.db.collection<Feature>(options.collectionName || DEFAULT_COLLECTION);
    }

    async getAll(): Promise<Feature[]> {
        const dataResult = await this.collection.find({}, { projection: { _id: 0 } }).toArray();
        return dataResult as Feature[];
    }

    async get(key: string): Promise<Feature | undefined> {
        const dataResult = await this.collection.findOne({ key }, { projection: { _id: 0 } });
        if (!dataResult) return undefined;
        return dataResult as Feature;
    }
}