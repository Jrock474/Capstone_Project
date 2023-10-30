const express = require("express")
const bcrypt = require("bcrypt")
const pg = require("pg-promise")()
const app = express()
const port = 3000
const cors = require("cors")
const {Users} = require("./models")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const { async } = require("regenerator-runtime")
app.use(express.json())
app.use(bodyParser.json())

app.use(cors(
  {
    methods: ["POST", "GET"],
    credentials: true
  }
))



// Shows all users in the database
app.get('/', async(req, res) => {
    const allUsers = await Users.findAll()
    res.send(allUsers)
})

app.get(`/Login:email`, async(req, res) => {
  const email = req.params.email
  const exitingUser = await email.findOne({
    where: {
      email: email
    }
  });
  res.send(exitingUser)
})

// Account registration endpoint
app.post('/Registration', async (req, res) => {
    const { username, email, password, secquestion, secanswer } = req.body;

    const exitingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (exitingUser){
      return res.send('Email is already in use')
    }

    
    //  Generate a salt and hash the password
    //  const saltRounds = 10; // You can adjust the number of salt rounds for more security
    //  const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = await Users.create({
        username: username,
        email: email,
        secquestion: secquestion,
        secanswer: secanswer,
        password: password, // Store the hashed password in the database
  });

  res.send(newUser)

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sbarashang76@gmail.com', // My Gmail email address
      pass: 'dcrodlsynxbtyfks', // My application-specific password
    },
  });
  console.log(username)
  
  
  const mailOptions = {
    from: 'sbarashang76@gmail.com',
    to: newUser.email, // User's email address
    subject: 'Password Reset Request',
    text: `Click the following link to reset your password: http://localhost:5173/Home`,
  }; // To do: make the above link send you to the updatepassword (put)  page instead of the login page
  
  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.response);
    res.send('Email sent');
  } catch (error) {
    console.error('Email not sent:', error);
    res.send('Email not sent');
  }
});


app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    const userEnteredPassword = password;
  
    const returningUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!returningUser){
      return res.send('User not found')
    }

    if(returningUser.password == userEnteredPassword){
      console.log(returningUser.username)
     return res.send(returningUser.username)
    } else {
      res.send({errorMessage: "invalid login"})
    }
})




app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})


