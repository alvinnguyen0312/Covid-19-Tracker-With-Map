import { ACTION_TYPES, BASE_URL } from "./actionTypes";

export const fetchSummaryReport = () => dispatch => {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      query: `{getsummaryreport{
        _id,
    active,
    confirmed,
    deaths,
    recovered,
    }}`
    })
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: ACTION_TYPES.FETCH_SUMMARY_REPORT,
        payload: data.data.getsummaryreport
      });
    });
};

export const fetchDetailedReport = () => dispatch => {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      query: `{getalldetailedreports{
        _id,
        active,
        confirmed,
        deaths,
        recovered,
        flag_url,
        longitude,
        latitude}
    }`
    })
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: ACTION_TYPES.FETCH_DETAILED_REPORT,
        payload: data.data.getalldetailedreports
      });
    });
};

export const fetchCountryData = () => dispatch => {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ query: `{getallcountries}` })
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: ACTION_TYPES.FETCH_COUNTRY_DATA,
        payload: data.data.getallcountries
      });
    });
};
