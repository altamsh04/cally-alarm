require('dotenv').config();
import twilio from 'twilio';

export default async function handler(req, res) {
  const { secret } = req.query;
  if (secret !== process.env.CALL_SECRET) {
    return res.status(403).json({ error: 'Unauthorized request' });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const call = await client.calls.create({
      twiml: '<Response><Say>Good morning! Wake up! This is your scheduled call.</Say></Response>',
      to: process.env.MY_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    res.status(200).json({ message: 'Call placed', sid: call.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
