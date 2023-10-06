export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    name: process.env.DATABASE_NAME || 'demo',
    password: process.env.DATABASE_PWD || '123'
  }
});
