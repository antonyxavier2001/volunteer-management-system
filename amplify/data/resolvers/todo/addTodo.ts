import type { AppSyncIdentityCognito } from 'aws-lambda';

import type { Schema } from '@/data/resource';
import { connectToMongodb } from '@/shared/mdbUtils';

function successResponse(body: unknown): object {
	return {
		statusCode: 200,
		todo: body,
	};
}
function errorResponse(err: Error): object {
	const errorMessage = err.message;
	return {
		statusCode: 400,
		body: errorMessage,
		headers: {
			'Content-Type': 'application/json',
		},
	};
}
export const handler: Schema['addTodo']['functionHandler'] = async (event) => {
	// console.log("got event: " + JSON.stringify(event));
	// console.log("got context: " + JSON.stringify(context));

	// Connect to MongoDB
	const [client, , collection] = await connectToMongodb();
	try {
		console.log('Connected to MongoDB');
		let user = null;
		if ((event.identity as AppSyncIdentityCognito).username)
			user = (event.identity as AppSyncIdentityCognito).username;

		const payload = { content: event.arguments.content, username: user };
		const insertResult = await collection.insertOne(payload);
		const todo = { _id: insertResult.insertedId.toString(), ...payload };

		return successResponse(todo);
	} catch (e) {
		return errorResponse(e as Error);
	} finally {
		if (client) {
			await client.close();
		}
	}
};
