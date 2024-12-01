export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // =================================================
  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);
  const dbName = 'app'; // database name
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');


  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Sign_up'); // collection name
  const findResult = await collection.insertOne({ "username": email, "password":pass, });
  console.log('Found documents =>', findResult);
  //==========================================================
  // at the end of the process we need to send something back.
  return Response.json(findResult)
  }
  