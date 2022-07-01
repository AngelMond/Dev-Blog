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

    async getUserId(){
        return this.id;
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
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8]
            },
        },
    },
    {
        hooks: {

            beforeCreate: async (userInput) => {
                userInput.password = await bcrypt.hash(userInput.password, 10);
                return userInput;
            },
            beforeUpdate: async (userInput) => {
                userInput.password = await bcrypt.hash(userInput.password, 10);
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users'
    }
);


module.exports = Users;