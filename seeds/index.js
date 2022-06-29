const sequelize = require('../config/connection');

const seedUsers = require('./seedUsers');
const seedPosts = require('./seedPosts');
const seedComments = require('./seedComments');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
  console.log('\n----- Users SEEDED -----\n');

  await seedPosts();
  console.log('\n----- Posts SEEDED -----\n');

  await seedComments();
  console.log('\n----- Comments SEEDED -----\n');

  process.exit(0);
};

seedAll();
