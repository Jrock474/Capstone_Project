const express = require("express")
const bcrypt = require("bcrypt")
const pg = require("pg-promise")()
const app = express()
const port = 3000

const db =pg("postgres://oibmtylz:pr7Db6Isdh55dkfrm-md5ItPFhA1IPQi@suleiman.db.elephantsql.com/oibmtylz")
// const pg = require('pg-promise')();

// url - postgres://oibmtylz:pr7Db6Isdh55dkfrm-md5ItPFhA1IPQi@suleiman.db.elephantsql.com/oibmtylz


app.get('/', (req, res) => {
    res.send("ayo")
})
app.post('/Registration', async (req, res) => {

    const { username, email, password, securityQuestion, securityAnswer } = req.body;
    res.send("registered")
     // Generate a salt and hash the password
     const saltRounds = 10; // You can adjust the number of salt rounds for more security
     const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Create a new user with the hashed password
  const newUser = await users.create({
    username,
    email,
    securityQuestion,
    securityAnswer,
    password: hashedPassword, 
    reEnterPassword: hashedPassword// Store the hashed password in the database
  });

})

app.get('/Login', (req, res) => {
    res.render('Login', { errorMessage: '' })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userEnteredPassword = password;
  
    const returningUser = await Users.findOne({
      where: {
        email: email,
      },
    });
})

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})

