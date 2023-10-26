const express = require("express")


const app = express()
const port = 3000

// const pg = require('pg-promise')();

// const db = pg("postgres://dretaylor@localhost:5432/postgres");

app.get('/', (req, res) => {
    res.send("ayo")
})

app.get('/Login', (req, res) => {
    res.render('Login', { errorMessage: '' })
})

app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    const userEnteredPassword = Password;
  
    const returningUser = await Users.findOne({
      where: {
        Email: Email,
      },
    });
})

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
})

