//const { coll } = require("./config");
const express = require("express");
const router = express.Router();
const dbRtns = require("./dbroutines");
const loadData = require("./datasetup");
// define a default route to retrieve all users
router.get("/", async (req, res) => {
  try {
    let db = await dbRtns.loadDb();
    let result = await loadData.loadData();
    res.status(200).send({ result: result });
  } catch (err) {
    console.log(err.stack);
    //res.status(500).send("get all users failed - internal server error");
  }
});

module.exports = router;
