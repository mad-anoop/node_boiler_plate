import dotenv from 'dotenv';
// export default {
//   PORT: process.env.PORT,
//   DATABASE_NAME: process.env.DATABASE_NAME,
//   DATABASE_USER: process.env.DATABASE_USER,
//   DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
//   DATABASE_HOST: process.env.DATABASE_HOST,
//   DATABASE_PORT: process.env.DATABASE_PORT,
//   DATABASE_DIALECT: 'mysql',
//   JWT_SECRET: process.env.JWT_SECRET,
//   JWT_ALGORITHM: process.env.JWT_ALGORITHM,
// };

export default {
  PORT: 3000,
  DATABASE_NAME: 'datingAppDB',
  DATABASE_USER: 'root',
  DATABASE_PASSWORD: 'qburst@123',
  DATABASE_HOST: '127.0.0.1',
  DATABASE_PORT: 3306,
  DATABASE_DIALECT: 'mysql',
  JWT_SECRET: 'xxxcasasd',
  JWT_ALGORITHM: 'HS256',
};
