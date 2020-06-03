const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  countries: process.env.COUNTRYCOLLECTION,
  countryurl: process.env.COUNTRYURL,
  coviddataurl: process.env.COVIDDATAURL,
  dbconnection: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
  server: process.env.SERVER,
  reports: process.env.DAILYREPORT
};
