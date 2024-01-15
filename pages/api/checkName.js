// pages/api/checkName.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const { db } = await connectToDatabase();

    // Check if the name exists in the database
    const existingUser = await db.collection('users').findOne({ name });

    if (existingUser) {
      return res.json({ result: 1 }); // Name exists
    } else {
      // Add the name to the database
      await db.collection('users').insertOne({ name });
      return res.json({ result: 2 }); // Name added
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}