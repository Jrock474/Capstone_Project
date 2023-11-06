const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3000;
const cors = require("cors")
const {Users, MonoStats} = require("./models");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const session = require("express-session")
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'digitalCrafts',
  resave: false,
  saveUninitialized: true,
  cookie: {
    userID: null,
    secure: false, // Set to true in production if using HTTPS
    maxAge: 3600000, // Session expiration time in milliseconds (e.g., 1 hour)
  },
}));

app.use(cors(
  {
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
  }
))

//UPDATE PASSWORD ENDPOINT
app.put('/UpdatePassword', async (req, res) => {
  const { email, secanswer, newPassword } = req.body;

  let userAnswer = secanswer

  // Check if the email exists in the database
  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return res.status(400).send('Email not found');
  }

  if (existingUser.secanswer != userAnswer){
    return res.status(400).json("Invalid credentials")
  }

  // Generate a salt and hash the new password
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update the user's password with the new hashed password
  try {
    await existingUser.update({ password: hashedPassword });
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})

// Shows all users in the database
app.get('/', async(req, res) => {
    const allUsers = await Users.findAll()
    res.send(allUsers)
})

// Redirects to Play Game upon successful login
app.get('/Login', async(req, res) => {
    res.redirect(`/playgame/${req.params.userID}`)
})

// Session endpoint that also sends UserData to Client 
app.get('/playgame/:userID', async (req, res) => {
  try {
    const foundUser = await Users.findOne({ where: { id: req.params.userID }});

    if (req.session.isAuthenticated && req.params.userID == req.session.userID) {
      // User is authenticated, proceed to the dashboard
      const JSONdata = foundUser.dataValues
      console.log(JSONdata)
      res.json(JSONdata);
    } else {
      // User is not authenticated, redirect to the login page
      res.json('Authentication Expired');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error'); // Handle other unexpected errors
  }
});

app.get('/checkEmail', async (req, res) => {
  const { email } = req.query; // Get the email from the query parameters
  // Use your Sequelize model to check if the email exists in your database
  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    res.status(200).send('Email found');
  } else {
    res.status(404).json('Email not found in database');
  }
});

app.get('/checkAnswer', async (req, res) => {
  const { secanswer } = req.query; // Get the email from the query parameters
  // Use your Sequelize model to check if the email exists in your database
  const existingUser = await Users.findOne({
    where: {
      secanswer: secanswer,
    },
  });
  if (existingUser) {
    res.status(200).send(' Correct');
  } else {
    res.status(404).send('Wrong Answer');
  }
});
app.get('/getQuestion/:email', async (req, res) => {
  const { email } = req.params; // Get the email from the route parameter
  
  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return res.status(404).send('Email not found');
  }

  const securityQuestion = existingUser.secquestion;
  
  if (securityQuestion) {
    res.status(200).send(securityQuestion);
  } else {
    res.status(404).send('Error found in fetching Sec Question');
  }
});
app.get('/getAnswer/:email', async (req, res) => {
  const { email } = req.params; // Get the email from the route parameter
  
  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return res.status(404).send('Wrong Answer');
  }

  const securityAnswer = existingUser.secanswer;
  
  if (securityAnswer) {
    res.status(200).send(securityAnswer);
  } else {
    res.status(404).send('Error found in fetching Sec Question');
  }
});

app.get("/monostats/:userID", async (req, res)=>{
  const userID = req.params.userID
  let monoData = await MonoStats.findOne({ where: { userID: userID } });
  res.json(monoData)
})

app.get("/monostats", async (req, res)=>{
  const userID = req.params.userID
  let monoData = await MonoStats.findAll();
  res.json(monoData)
})

// Mono save data
app.put("/save/:userID", async (req, res) =>{
  const {monoData} = req.body
  const userID = req.params.userID
  await MonoStats.update({monoData}, { where: { userID: userID } });
  res.json("Save Successful")
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
      return res.status(400).json('Email is already in use')
    }

    //  Generate a salt and hash the password
     const saltRounds = 10; 
     const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = await Users.create({
        username: username,
        email: email,
        secquestion: secquestion,
        secanswer: secanswer,
        password: hashedPassword, // Store the hashed password in the database
  });

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sbarashang76@gmail.com', // My Gmail email address
      pass: 'dcrodlsynxbtyfks', // My application-specific password
    },
  });
  
  const mailOptions = {
    from: 'sbarashang76@gmail.com',
    to: newUser.email, // User's email address
    subject: 'Kanari-Mono Registration',
    text: `Congrats on your registration ${newUser.username} click here to login: https://capstone-project-jrock474.vercel.app/Login`,
  }; 
  
  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.response);
    res.send('Email sent');
  } catch (error) {
    console.error('Email not sent:', error);
  }

  req.session.isAuthenticated = true;
  req.session.userID = newUser.id; // Store the user's ID in the session

  res.redirect(`/playgame/${newUser.id}`)
});

// Login endpoint
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  const userEnteredPassword = password;

  const returningUser = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!returningUser) {
    return res.status(400).send('User not found');
  }

  const userID = returningUser.id;
  const storedHashedPassword = returningUser.password; // this is the password that is stored in the database

  try {
    const result = await bcrypt.compare(userEnteredPassword, storedHashedPassword);
    if (result) {
      // Passwords match, redirect to the game with the User's ID
      req.session.isAuthenticated = true;
      req.session.userID = returningUser.id; // Store the user's ID in the session

      res.redirect(`/playgame/${returningUser.id}`)
    } else {
      // Passwords do not match, render the login page with an error message
      return res.status(400).send(`Invalid login`);
    }
  } catch (error) {
    console.error(error);
    // Handle any errors that may occur during password comparison
    res.status(500).send('Internal server error');
  }
});

app.delete('/Delete', async (req, res) => {
  const { email, secanswer } = req.body;

  let userAnswer = secanswer

  const userToDelete = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!userToDelete) {
    return res.json('User not found');
  }

  if (userToDelete.secanswer == userAnswer){
  try {
    await userToDelete.destroy(); // Delete the user
    return res.json(userToDelete);
  } catch (error) {
    return res.status(500).json('User deletion failed');
  }
} else {
  return res.status(400).json("Invalid credentials")
}



});
//placeholder logic from the documentation
app.get('/logout', function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})


// app.post('/sendEmail', async (req, res) => {
//   // Email sending logic using Nodemailer
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'sbarashang76@gmail.com', // My Gmail email address
//         pass: 'dcrodlsynxbtyfks', // My application-specific password
//       },
//     });

//     const mailOptions = {
//       from: 'sbarashang76@gmail.com',
//       to: 'recipient@example.com', 
//       subject: 'Gaming info',
//       text: 'placeholder',
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//     res.send('Email sent successfully');
//   } catch (error) {
//     console.error('Email not sent:', error);
//     res.status(500).send('Email sending failed');
//   }
// });


app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})


