require('dotenv').config();
const cron = require('node-cron');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

cron.schedule('40 5 * * *', () => {
  console.log('Running morning call job at 5:40 AM');

  client.calls.create({
    twiml: '<Response><Say>Good morning! Wake up! This is your 5:40 AM call.</Say></Response>',
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER
  }).then(call => {
    console.log(`Call initiated with SID: ${call.sid}`);
  }).catch(err => {
    console.error('Call failed:', err.message);
  });
});
