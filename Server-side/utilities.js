const request = require("request");
const csv = require("csv-parser");
const fs = require("fs");
const { coviddataurl } = require("./config");

const getJSONFromWWWPromise = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(`Unable to retrieve data from the link: ${url}`);
        return;
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};
//get current date/time
var date = new Date();
var fileName = `${
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
}-${
  date.getDate() < 10 ? "0" + (date.getDate() - 1) : date.getDate() - 1
}-${date.getFullYear()}.csv`;

const file = fs.createWriteStream(fileName);
const results = [];
const parseCSVFromExternalSourcePromise = () => {
  return new Promise((resolve, reject) => {
    request(`${coviddataurl}${fileName}`, error => {
      if (error) {
        reject(
          `Unable to retrieve data from the link: ${coviddataurl}${fileName}`
        );
        return;
      }
    })
      .pipe(file)
      .on("finish", () => {
        fs.createReadStream(fileName)
          .pipe(csv())
          .on("data", data => results.push(data))
          .on("end", () => {
            resolve(results);
          });
      });
  });
};

module.exports = {
  getJSONFromWWWPromise,
  parseCSVFromExternalSourcePromise
};
