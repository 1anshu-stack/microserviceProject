// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';
// import request from 'supertest';
// import { app } from '../app';
// import jwt from 'jsonwebtoken';

// declare global {
//   var signin: () => string[];
// }


// jest.mock('../nats-wrapper')


// let mongo: any;
// beforeAll(async () => {
//   process.env.JWT_KEY = 'asdfasdf';
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//   const mongo = await MongoMemoryServer.create();
//   const mongoUri = mongo.getUri();

//   await mongoose.connect(mongoUri, {});
// }, 30000);

// beforeEach(async () => {
//   jest.clearAllMocks();
//   if (mongoose.connection.db) {
//     const collections = await mongoose.connection.db.collections();

//     for (let collection of collections) {
//       await collection.deleteMany({});
//     }
//   }
// });

// afterAll(async () => {
//   if (mongo) {
//     await mongo.stop();
//   }
//   await mongoose.connection.close();
// });

// global.signin = () => {
//   // Build a JWT payload.  { id, email }
//   const payload = {
//     id: new mongoose.Types.ObjectId().toHexString(),
//     email: 'test@test.com',
//   };

//   // Create the JWT!
//   const token = jwt.sign(payload, process.env.JWT_KEY!);

//   // Build session Object. { jwt: MY_JWT }
//   const session = { jwt: token };

//   // Turn that session into JSON
//   const sessionJSON = JSON.stringify(session);

//   // Take JSON and encode it as base64
//   const base64 = Buffer.from(sessionJSON).toString('base64');

//   // return a string thats the cookie with the encoded data
//   return [`session=${base64}`];
// };


import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

jest.mock('../nats-wrapper');

let mongo: MongoMemoryServer;  // ✅ Use a global variable

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();  // ✅ Assign globally
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
}, 30000);

beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) { 
    await mongo.stop();  // ✅ Ensure MongoMemoryServer stops
  }
  await mongoose.connection.close(); // ✅ Ensure DB closes properly
});

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
