import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    margin: "10px auto",
    maxWidth: 400
  }
});

const SearchBar = ({ country, handleCountryChange }) => {
  const classes = useStyle();

  return (
    <div>
      <Autocomplete
        className={classes.root}
        options={country}
        getOptionLabel={option => option._id}
        onChange={(e, value) => handleCountryChange(value)}
        renderInput={param => (
          <TextField {...param} label="Country" variant="outlined" />
        )}
      />
    </div>
  );
};

export default SearchBar;
