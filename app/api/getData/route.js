import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  // Access the session
  let session = await getCustomSession();

  // Retrieve data from the session
  let customersRole = session.role;
  let email = session.email;

  console.log("Customer Role:", customersRole);
  console.log("Customer Email:", email);

  return new Response(JSON.stringify({ role: customersRole, email }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
