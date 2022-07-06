require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize( 
'mysql://b2551357e488f1:6b55890c@us-cdbr-east-06.cleardb.net/heroku_b177fec47b1d76a?reconnect=true', {
      host: 'us-cdbr-east-06.cleardb.net',
      dialect: 'mysql',
      port: 3306,
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
