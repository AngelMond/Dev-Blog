
'use strict';

//TODO: require
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controllers/index');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', './views');

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Turn on routes
app.use(routes)


const init = async ()=>{
    try{
        await sequelize.sync({force:false});
        app.listen(PORT, ()=>console.log('Web server now listening'))
    }catch(err){
       console.log(err);
       console.log('Unable to connect to Web server and DataBase')
    }
}

init();