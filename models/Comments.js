const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model{}


Comments.init(
    {
       id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: 'posts',
                key: 'id'
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments'
    }
);


module.exports = Comments;