

// Load environment variables
require('dotenv').config();

// Dependencies
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


mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

// Twilio configuration
const accountSid = ''; 
const authToken = '';               
const client = new twilio(accountSid, authToken);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Twilio configuration
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


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

          .catch(err => res.status(500).json(err));

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
    to:'',
  })
  .then(message => {
    res.status(200).json({ success: true, messageSid: message.sid });
  })
  .catch(err => {
    console.error('Twilio error:', err); // Log Twilio error details
    res.status(500).json({ success: false, error: err.message, details: err });
  });

    from: process.env.TWILIO_PHONE_NUMBER,
    to: to,
  })
    .then(message => {
      res.status(200).json({ success: true, messageSid: message.sid });
    })
    .catch(err => {
      console.error('Twilio error:', err); // Log Twilio error details
      res.status(500).json({ success: false, error: err.message, details: err });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');

});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);

});

});

