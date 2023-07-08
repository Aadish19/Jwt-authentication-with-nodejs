const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://adish8511:adish@node@cluster0.hw9nbyh.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,err=>{
      if(err){console.error("Error occured")}
      console.log(`Started on port ${port} and successfully connected to database`)
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

//cookies
app.get('/set-cookies',(req,res)=>{
  // res.setHeader('Set-Cookie','newUser=true')

  res.cookie('newUser',false)

  //maxAge -> cookie will remove only after this time ends not just after browser closes
  // secure -> will work only upon https
  res.cookie('isEmployee',true,{maxAge: 1000*60*60*24, httpOnly:true})
  
  res.send('You got the cookies')
})

app.get('/read-cookies',(req,res)=>{
  // res.setHeader('Set-Cookie','newUser=true')

  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);

  res.send('You got the cookies')
})