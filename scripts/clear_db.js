import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);

async function clearDatabase() {
  console.log('Cleaning database...');
  try {
    // Disable foreign key checks for MySQL to truncate tables with relationships
    await db.raw('SET FOREIGN_KEY_CHECKS = 0');
    
    await db('reservation').truncate();
    console.log('Table "reservation" truncated.');
    
    await db('review').truncate();
    console.log('Table "review" truncated.');
    
    await db('users').truncate();
    console.log('Table "users" truncated.');
    
    await db.raw('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Database cleaned successfully.');
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await db.destroy();
  }
}

clearDatabase();
