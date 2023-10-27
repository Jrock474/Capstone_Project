const express = require("express")
const bcrypt = require("bcrypt")
const pg = require("pg-promise")()
const app = express()
const port = 3000
const cors = require("cors")
const {Users} = require("./models")
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

// Account registration endpoint
app.post('/Registration', async (req, res) => {
    const { username, email, password, secquestion, secanswer } = req.body;
    
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
  console.log(username)

})


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
     return res.send(`welcome back ${returningUser.username}`)
    } else {
      res.send(`invalid login`)
    }
})

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})

