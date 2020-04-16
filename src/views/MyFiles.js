import React from "react";
import MyTable from "../components/MyTable";
import { Typography } from "@material-ui/core";

const MyFiles = () => {
  return (
    <>
      <Typography component="h1" variant="h2" gutterBottom>
        My files
      </Typography>
      <MyTable />
    </>
  );
};

export default MyFiles;
