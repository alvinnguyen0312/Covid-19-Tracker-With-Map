const { countries, countryurl, reports } = require("./config");
const dbRtns = require("./dbroutines");
const utility = require("./utilities");

const loadData = async () => {
  let resultMsg = "";
  try {
    //load db
    db = await dbRtns.loadDb();

    //delete any existing documents in country & reports collection
    let result1 = await dbRtns.deleteAll(db, countries);
    resultMsg += `Deleted ${result1.deletedCount} existing documents from countries collection. `;

    let result2 = await dbRtns.deleteAll(db, reports);
    resultMsg += `Deleted ${result2.deletedCount} existing documents from reports collection. `;

    //obtain country data JSON
    let countryJSON = await utility.getJSONFromWWWPromise(countryurl);
    resultMsg += `Retrieved country JSON from remote data source. `;

    // add countries to DB
    await Promise.allSettled(
      countryJSON.map(async country => {
        let res = await dbRtns.addOne(db, countries, {
          country: country.country,
          code: country.code,
          flag: country.flag,
          latitude: country["coordinates"][0],
          longitude: country["coordinates"][1]
        });
      })
    );

    //obtain covid-19 data CSV
    let dataCSV = await utility.parseCSVFromExternalSourcePromise();
    resultMsg += `Retrieved covid-19 daily report CSV from remote data source. `;

    // add covid-19 data to DB
    await Promise.allSettled(
      dataCSV.map(async data => {
        let res = await dbRtns.addOne(db, reports, {
          Province_State: data.Province_State,
          Country_Region: data.Country_Region,
          Last_Update: data.Last_Update,
          Lat: data.Lat,
          Long_: data.Long_,
          Confirmed: parseInt(data.Confirmed),
          Deaths: parseInt(data.Deaths),
          Recovered: parseInt(data.Recovered),
          Active: parseInt(data.Active)
        });
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    return resultMsg;
    process.exit();
  }
};

module.exports = {
  loadData
};
