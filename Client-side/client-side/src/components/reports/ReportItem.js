import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Table,
  TableHead,
  TableRow,
  TableBody
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    height: 150,
    margin: "10px auto",
    display: "flex",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);"
  },
  left: {
    display: "flex",
    flexDirection: "column"
  },
  right: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0 auto"
  },
  media: {
    height: 90,
    width: 150
  }
}));
const TableCell = withStyles({
  root: {
    borderBottom: "none",
    textAlign: "center",
    paddingBottom: "1px"
  }
})(MuiTableCell);
const ReportItem = ({ reportData, clickToSelectCountryCard }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={clickToSelectCountryCard}>
      {reportData.flag_url && (
        <div className={classes.left}>
          <CardMedia className={classes.media} image={reportData.flag_url} />
          <CardHeader title={reportData._id} />
        </div>
      )}
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Confirmed</TableCell>
              <TableCell>Deaths</TableCell>
              <TableCell>Recovered</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ alignContent: "center" }}>
              <TableCell>
                {Intl.NumberFormat().format(reportData.confirmed)}
              </TableCell>
              <TableCell>
                {Intl.NumberFormat().format(reportData.deaths)}
              </TableCell>
              <TableCell>
                {Intl.NumberFormat().format(reportData.recovered)}
              </TableCell>
              <TableCell>
                {Intl.NumberFormat().format(reportData.active)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ReportItem;
