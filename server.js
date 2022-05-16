const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/image')

const pg = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:false
  }
});
// pg.select('*').from('users').then(data=>console.log(data));

app.use(cors());
// const database = {
//     user:[
//           {
//               id: '1',
//               password: '123456',
//               name: 'Cindy',
//               email: 'qq82501',
//               entries: 0,
//               joined: new Date()
//             },
//             {
//               id: '2',
//               password: '234567',
//               name: 'Nick',
//               email: 'Nickderder@gmail.com',
//               entries: 10,
//               joined: new Date()
//             }
//    ],
//    login:[
//      {
//        id:'987',
//        hash:'',
//        email:'qq82501@gmail.com'
//      }
//    ]
// }
app.use(express.json());

app.get('/',(req,res)=>{res.send(`It's working!!`);})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,pg,bcrypt)})

app.post('/register',(req,res) => {register.handleRegister(req,res,pg,bcrypt)})

app.get('/profile/:id',(req,res)=> {profile.handleProfileGet(req,res,pg)})

app.put('/image',(req,res)=>{image.handleImage(req,res,pg)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3001,()=>{
    console.log(`app is running on port ${process.env.PORT}.`)
})

/*
'/' >>> this is working.
'/signin' >>> POST, return  success/ fail
'/register' >>> POST, return user
'/profile/:userID' >>> GET user
'/image' >>> PUT user
*/