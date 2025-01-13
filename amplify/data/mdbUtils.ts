import { Collection, Db, MongoClient } from 'mongodb';

// Environment variables
const ATLAS_CONNECTION_STRING = process.env.ATLAS_CONNECTION_STRING as string;
const COLLECTION_NAME = process.env.COLLECTION_NAME as string;
const DB_NAME = process.env.DB_NAME as string;

let cachedClient: MongoClient | null = null;

export async function connectToMongodb(): Promise<
	[MongoClient, Db, Collection]
> {
	if (cachedClient) {
		await cachedClient.connect();
		const db = cachedClient.db(DB_NAME);
		const collection = db.collection(COLLECTION_NAME);
		return [cachedClient, db, collection];
	} else {
		const client = new MongoClient(ATLAS_CONNECTION_STRING);
		await client.connect();
		const db = client.db(DB_NAME);
		const collection = db.collection(COLLECTION_NAME);
		cachedClient = client;
		return [client, db, collection];
	}
}
