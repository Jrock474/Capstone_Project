const express = require("express")


const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("ayo")
})
app.post('/Registration', async (req, res) => {
    const { Username, Password, ConfirmPassword, SecQuestion, SecAnswer, Email } = req.body;
    res.send("ayo")
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

