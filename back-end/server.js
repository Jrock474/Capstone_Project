const express = require("express")
const bcrypt = require("bcrypt")
const pg = require("pg-promise")()
const app = express()
const port = 3000
const {Users} = require("./models")
app.use(express.json())
const bodyParser = require('body-parser')
const { async } = require("regenerator-runtime")
app.use(bodyParser.json())


// Shows all users in the database
app.get('/', async(req, res) => {
    const allUsers = await Users.findAll()
    res.send(allUsers)
})

// Account registration endpoint
app.post('/Registration', async (req, res) => {
    const { username, email, password, secquestion, secanswer } = req.body;
    
     // Generate a salt and hash the password
     const saltRounds = 10; // You can adjust the number of salt rounds for more security
     const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = await Users.create({
        username : username,
        email : email,
        secquestion : secquestion,
        secanswer : secanswer,
        password: hashedPassword, // Store the hashed password in the database
  });

  res.send(newUser)

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

