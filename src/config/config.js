import dotenv from 'dotenv';

dotenv.config();

// export default {
//   PORT: process.env.PORT,
//   DATABASE_NAME: process.env.DATABASE_NAME,
//   DATABASE_USER: process.env.DATABASE_USER,
//   DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
//   DATABASE_HOST: process.env.DATABASE_HOST,
//   DATABASE_PORT: process.env.DATABASE_PORT,
//   DATABASE_DIALECT: 'mysql',
//   LIFE_CYCLE: process.env.LIFE_CYCLE,
//   ELASTIC_SEARCH_HOST: process.env.ELASTIC_SEARCH_HOST,
//   SWAGGER_USER: process.env.SWAGGER_USER,
//   SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,
//   FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
//   FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   JWT_SECRET: process.env.JWT_SECRET,
// };

export default {
  PORT:3000,
  DATABASE_NAME:'datingAppDB',
  DATABASE_USER:'root',
  DATABASE_PASSWORD:'qburst@123',
  DATABASE_HOST:'127.0.0.1',
  DATABASE_PORT:3306,
  DATABASE_DIALECT:'mysql',
  JWT_SECRET:'xxxcasasd'
}

