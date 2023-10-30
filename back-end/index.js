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
const session = require('express-session')
app.use(express.json())
app.use(session({
  secret: 'digitalCrafts',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true in production if using HTTPS
    maxAge: 3600000, // Session expiration time in milliseconds (e.g., 1 hour)
  },
}));
app.use(bodyParser.json())

app.use(cors(
  {
    methods: ["POST", "GET", "DELETE"],
    credentials: true
  }
))



// Shows all users in the database
app.get('/', async(req, res) => {
    const allUsers = await Users.findAll()
    res.send(allUsers)
})

app.get('/playgame:userID', async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      const foundUser = await Users.findOne({ where: { id: req.params.userID } });
      if (!foundUser) {
        return res.status(404).send('User not found'); // Handle the case when the user is not found
      }
      let userName = foundUser.dataValues.Name;
      let userExpenses = foundUser.dataValues.Expenses
      let userIncome = foundUser.dataValues.Income
      let userNet = foundUser.dataValues.Net
      // User is authenticated, proceed to the dashboard
      res.render('income', { userName, userExpenses, userIncome, userNet });
    } else {
      // User is not authenticated, redirect to the login page
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error'); // Handle other unexpected errors
  }
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
     const saltRounds = 10; // You can adjust the number of salt rounds for more security
     const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = await Users.create({
        username: username,
        email: email,
        secquestion: secquestion,
        secanswer: secanswer,
        password: hashedPassword, // Store the hashed password in the database
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

  if (!returningUser) {
    return res.render('login', { errorMessage: 'User not found' });
  }

  const userName = returningUser.Name;
  const userID = returningUser.id;
  const storedHashedPassword = returningUser.password; // this is the password that is stored in the database

  try {
    const result = await bcrypt.compare(userEnteredPassword, storedHashedPassword);

    if (result) {
      // Passwords match, redirect to the dashboard
      res.send("login")
    } else {
      // Passwords do not match, render the login page with an error message
      res.send('invalid');
    }
  } catch (error) {
    console.error(error);
    // Handle any errors that may occur during password comparison
    res.status(500).send('Internal server error');
  }
});

app.delete('/Delete', async (req, res) => {
  const { email } = req.body;

  const userToDelete = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!userToDelete) {
    return res.send('User not found');
  }

  try {
    await userToDelete.destroy(); // Delete the user
    return res.send('User deleted successfully');
  } catch (error) {
    return res.status(500).send('User deletion failed');
  }
});

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})


