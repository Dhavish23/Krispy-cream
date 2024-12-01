// Import MongoClient from the 'mongodb' package
import { MongoClient } from 'mongodb';

// Define the GET handler for the API
export async function GET(req, res) {
  // Log that the API is accessed
  console.log("in the putInCart API page");

  // Get the query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const pname = searchParams.get('pname'); 
  console.log("Product Name:", pname);

  // MongoDB connection string and client setup
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to server');

    // Specify the database and collection
    const dbName = 'app';  // Your database name
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart');  // 'shopping_cart' collection

    // Create a new object for the cart item
    const cartItem = { pname: pname, username: "sample@test.com" };  // Replace with actual user info

    // Insert the cart item into the 'shopping_cart' collection
    const insertResult = await collection.insertOne(cartItem);
    console.log('Insert Result:', insertResult);

    // Return a success message in the response
    return new Response(JSON.stringify({ data: "Inserted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error inserting item into cart:', error);
    // Return an error response if something goes wrong
    return new Response(JSON.stringify({ error: "Failed to insert item" }), {
      status: 500,
    });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}
