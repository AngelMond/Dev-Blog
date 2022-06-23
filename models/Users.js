const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Users extends Model{
    async validatePassword(userPassword){
        if(userPassword){
            return await bcrypt.compare(userPassword, this.password);
        }
        return false;
    }

    async validateUsername(username){
        if(username){
            return compare(username, this.username)
        }
        return false;
    }
}


Users.init(
    {
       id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [6]
            },
        },
    },
    {
        hooks: {
            async beforeCreate(userInput){
                userInput.password = await bcrypt.hash(userInput.password, 10);
                return userInput;
            },
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users'
    }
);


module.exports = Users;