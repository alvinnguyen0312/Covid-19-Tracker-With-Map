const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query{
    loaddata: String,
    getsummaryreport: SummaryReport,
    getalldetailedreports:[DetailedReport],
    getallcountries:[String]
}
type SummaryReport{
    _id:String,
    active: Int,
    confirmed: Int,
    deaths: Int,
    recovered:Int,
}
type DetailedReport{
    _id:String,
    active: Int,
    confirmed: Int,
    deaths: Int,
    recovered:Int,
    flag_url: String,
    longitude: Float,
    latitude: Float,
}
`);

module.exports = { schema };
