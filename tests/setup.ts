import { beforeAll, afterAll, afterEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	const uri = mongo.getUri();

	// 👇 مهم جدًا: نتأكد إن مفيش اتصال مفتوح قبل ما نبدأ
	if (mongoose.connection.readyState !== 0) {
		await mongoose.disconnect();
	}

	await mongoose.connect(uri);
});

afterEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongo.stop();
});
