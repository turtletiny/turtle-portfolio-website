import { db } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

// --- API Logic ---

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const client = await db.connect();

  try {
    // 1. GET: Fetch all messages
    if (request.method === 'GET') {
      const { rows } = await client.sql`
        SELECT * FROM guestbook 
        ORDER BY created_at DESC;
      `;
      return response.status(200).json(rows);
    }
    // POST
    if (request.method === 'POST') {
  const { name, message } = request.body;

  // Check for existence and also length
  if (!name || !message) {
    return response.status(400).json({ error: 'Name and message are required' });
  }

  if (name.length > 40 || message.length > 200) {
    return response.status(400).json({ error: 'Input too long' });
  }

  await client.sql`
    INSERT INTO guestbook (name, message)
    VALUES (${name.slice(0, 40)}, ${message.slice(0, 200)});
  `;
  
  return response.status(201).json({ success: true });
}
    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error: unknown) {
    console.error('Database Error:', error);
    
    // Check if error is an instance of the Error object
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return response.status(500).json({ error: errorMessage });
  } finally {
    client.release();
  }
}