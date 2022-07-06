
'use strict';

//TODO: require
require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');



const routes = require('./controllers/index');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // Stored in milliseconds (3_600_000 === 1 hour)
        maxAge: 3_600_000,
      },
  };

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Turn on routes
app.use(routes)


const init = async ()=>{
    try{
        await sequelize.sync({force:true});
        app.listen(PORT, ()=>console.log('Web server now listening'))
    }catch(err){
       console.log(err);
       console.log('Unable to connect to Web server and DataBase')
    }
}

init();