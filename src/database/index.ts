import { Client } from 'pg';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } from '@config';

export const client = new Client({
  // connectionString: `postgres://bitespeed_8kyr_user:yBJDi1k0SI5Q43NAClfe3izEJQtfGqCf@dpg-cojuahud3nmc73c3jdk0-a.oregon-postgres.render.com/bitespeed_8kyr`,
  connectionString: `postgres://bitespeed_8kyr_user:yBJDi1k0SI5Q43NAClfe3izEJQtfGqCf@dpg-cojuahud3nmc73c3jdk0-a.oregon-postgres.render.com/bitespeed_8kyr`,
  ssl: {
    rejectUnauthorized: true, // Only use this for development or testing with self-signed certificates
  },
});

client.connect().catch((err)=>{
console.log(err);
});

export default client;
