const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const taskRouter = require('./routes/task');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

// Twilio configuration
const accountSid = 'ACb7a2980f65780caff4210d33bc3a1186'; 
const authToken = 'f96c550f5dc52feb5dac17dfc0722456';               
const client = new twilio(accountSid, authToken);

// User routes
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Already registered");
      } else {
        FormDataModel.create(req.body)
          .then(newUser => res.json(newUser))
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.status(500).json(err));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.json("No records found!");
      } else {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      }
    })
    .catch(err => res.status(500).json(err));
});

// Task routes
app.use('/tasks', taskRouter);

// SMS route
app.post('/send-sms', (req, res) => {
  const { body, to } = req.body;
  console.log(`Sending SMS to ${to} with body: ${body}`); // Log request data

  client.messages.create({
    body: body,
    from: '+13344893639', // Your Twilio phone number
    to:'+917995979829',
  })
  .then(message => {
    res.status(200).json({ success: true, messageSid: message.sid });
  })
  .catch(err => {
    console.error('Twilio error:', err); // Log Twilio error details
    res.status(500).json({ success: false, error: err.message, details: err });
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});