import React from "react";
import MediaTable from "../components/MediaTable";
import { Typography } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        Home
      </Typography>
      <MediaTable />
    </>
  );
};

export default Home;
