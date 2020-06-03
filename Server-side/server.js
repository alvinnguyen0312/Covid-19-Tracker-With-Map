const { port, graphql, server } = require("./config");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { schema } = require("./schema");
const { resolvers } = require("./resolvers");
const loadDataRoute = require("./routes");

app.use(cors());
//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/loaddata", loadDataRoute);
app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true //in-browser tool for queries
  })
);

app.listen(port, () => {
  console.log(`Server is ready at ${server}${port}${graphql}`);
});
