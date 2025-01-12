import { Collection, Db, MongoClient } from 'mongodb';

// Environment variables
const ATLAS_CONNECTION_STRING = process.env.ATLAS_CONNECTION_STRING as string;
const COLLECTION_NAME = process.env.COLLECTION_NAME as string;
const DB_NAME = process.env.DB_NAME as string;

let cachedClient: [MongoClient, Db, Collection] | null = null;

export function connectToMongodb(): [MongoClient, Db, Collection] {
	if (cachedClient) {
		return cachedClient;
	} else {
		const client = new MongoClient(ATLAS_CONNECTION_STRING);
		const db = client.db(DB_NAME);
		const collection = db.collection(COLLECTION_NAME);
		cachedClient = [client, db, collection];
		return [client, db, collection];
	}
}
