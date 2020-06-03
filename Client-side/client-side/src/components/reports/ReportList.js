import React, { useEffect, useState } from "react";
import ReportItem from "./ReportItem";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import SearchBar from "./SearchBar";
import SummaryReport from "./SummaryReport";
import { Typography } from "@material-ui/core";

const ReportList = ({ selectCountryCard, ...props }) => {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    props.fetchDetailedReport();
    props.fetchSummaryReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countryChange = value => {
    if (value) {
      setSelectedOption(value._id);
    } else {
      setSelectedOption("");
    }
  };

  return (
    <div
      style={{
        width: "40%"
      }}
    >
      <div>
        <SummaryReport reportData={props.summaryReport} />
        <div style={{ marginLeft: "10px", fontStyle: "italic" }}>
          <Typography>Last updated: {props.summaryReport._id}</Typography>
          <Typography>Source: CSSE - Johns Hopkins University</Typography>
        </div>
      </div>
      <SearchBar
        country={props.reportList}
        handleCountryChange={countryChange}
      />
      <div style={{ maxHeight: 810, overflow: "auto" }}>
        {props.reportList
          .filter(report =>
            selectedOption !== "" ? report._id === selectedOption : report
          )
          .map((report, idx) => {
            return (
              <ReportItem
                key={idx}
                reportData={report}
                clickToSelectCountryCard={() => selectCountryCard(idx, report)}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  reportList: state.reports.data,
  summaryReport: state.reports.summary
});

const mapActionToProps = {
  fetchDetailedReport: actions.fetchDetailedReport,
  fetchSummaryReport: actions.fetchSummaryReport
};

export default connect(mapStateToProps, mapActionToProps)(ReportList);
