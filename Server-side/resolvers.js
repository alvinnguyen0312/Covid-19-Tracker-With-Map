const dbRtns = require("./dbroutines");
const dataSetup = require("./datasetup");
const { countries, reports } = require("./config");

const resolvers = {
  loaddata: async () => {
    let db = await dbRtns.loadDb();
    let result = await dataSetup.loadData();
    return result;
  },
  getsummaryreport: async () => {
    let db = await dbRtns.loadDb();
    let result = await dbRtns.getSummaryReport(db, reports);
    return result[0];
  },
  getalldetailedreports: async () => {
    let db = await dbRtns.loadDb();
    let result = await dbRtns.getAllDetailedReports(db, reports);
    return result;
  },
  getallcountries: async () => {
    let db = await dbRtns.loadDb();
    let result = await dbRtns.findDistinct(db, countries, "country");
    return result;
  }
};

module.exports = { resolvers };
