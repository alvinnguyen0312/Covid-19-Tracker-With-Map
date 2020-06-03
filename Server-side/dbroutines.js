const MongoClient = require("mongodb").MongoClient;
const { dbconnection, appdb } = require("./config");
let db;
const loadDb = async () => {
  if (db) {
    console.log("using current established connection");
    return db;
  }
  try {
    console.log("establishing new connection to DB");
    const client = await MongoClient.connect(dbconnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = client.db(appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);
const deleteAll = (db, coll) => db.collection(coll).deleteMany({});
const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);
const findAll = (db, coll, criteria, projection) =>
  db
    .collection(coll)
    .find(criteria)
    .project(projection)
    .toArray();
const findDistinct = (db, coll, criteria) =>
  db.collection(coll).distinct(criteria);

const getSummaryReport = (db, coll) =>
  db
    .collection(coll)
    .aggregate([
      {
        $group: {
          _id: "$Last_Update",
          active: { $sum: "$Active" },
          confirmed: { $sum: "$Confirmed" },
          deaths: { $sum: "$Deaths" },
          recovered: { $sum: "$Recovered" }
        }
      }
    ])
    .toArray();

const getAllDetailedReports = (db, coll) =>
  db
    .collection(coll)
    .aggregate([
      {
        $group: {
          _id: "$Country_Region",
          active: {
            $sum: "$Active"
          },
          confirmed: {
            $sum: "$Confirmed"
          },
          deaths: {
            $sum: "$Deaths"
          },
          recovered: {
            $sum: "$Recovered"
          }
        }
      },
      {
        $lookup: {
          from: "countries",
          localField: "_id",
          foreignField: "country",
          as: "fromCountries"
        }
      },
      {
        $project: {
          active: 1,
          confirmed: 1,
          deaths: 1,
          recovered: 1,
          flag_url: {
            $arrayElemAt: ["$fromCountries.flag", 0]
          },
          longitude: {
            $arrayElemAt: ["$fromCountries.longitude", 0]
          },
          latitude: {
            $arrayElemAt: ["$fromCountries.latitude", 0]
          }
        }
      }
    ])
    .toArray();

module.exports = {
  loadDb,
  addOne,
  deleteAll,
  findOne,
  findAll,
  findDistinct,
  getSummaryReport,
  getAllDetailedReports
};
