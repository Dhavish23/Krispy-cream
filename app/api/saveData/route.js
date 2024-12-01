import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  // Access the session
  let session = await getCustomSession();

  // Save data to the session
  session.role = 'customer'; // Example role
  session.email = 'mymail@mail.com'; // Example email address

  await session.save(); // Ensure session changes are saved
  console.log("Data saved to session");

  return new Response(JSON.stringify({ message: "Data saved" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
