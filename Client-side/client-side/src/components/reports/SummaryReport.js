import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexFlow: "row nowrap",
    height: "100%",
    margin: "15px 0"
  },
  root: {
    marginLeft: "10px",
    width: "25%",
    borderRadius: "12px",
    textAlign: "center",
    textShadow: "rgba(0,0,0,.2) 2px 6px 5px,rgba(255,255,255,.4) 0 -4px 30px",
    color: "rgba(0,0,0,.6)"
  }
}));
const SummaryReport = ({ reportData }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Card className={classes.root} style={{ background: "#F8D800" }}>
        <CardHeader title="Confirmed" />
        <CardContent>
          {Intl.NumberFormat().format(reportData.confirmed)}
        </CardContent>
      </Card>
      <Card className={classes.root} style={{ background: "#E80505" }}>
        <CardHeader title="Deaths" />
        <CardContent>
          {Intl.NumberFormat().format(reportData.deaths)}
        </CardContent>
      </Card>
      <Card className={classes.root} style={{ background: "#32CCBC" }}>
        <CardHeader title="Recovered" />
        <CardContent>
          {Intl.NumberFormat().format(reportData.recovered)}
        </CardContent>
      </Card>
      <Card className={classes.root} style={{ background: "#49C628" }}>
        <CardHeader title="Active" />
        <CardContent>
          {Intl.NumberFormat().format(reportData.active)}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryReport;
