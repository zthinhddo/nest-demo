export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  type: "postgres",
});
