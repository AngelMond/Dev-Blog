const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');


//User relationships
Users.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id'
});


Users.hasMany(Comments, {
    foreignKey: 'user_id'
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id'
});

//Posts relationships
Posts.hasMany(Comments, {
    foreignKey: 'post_id'
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id'
});
