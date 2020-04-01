import React from "react";
import PropTypes from "prop-types";
import { useSingleMedia } from "../hooks/ApiHooks";
import { Typography } from "@material-ui/core";

const mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = ({ match }) => {
  console.log("match", match.params.id);
  const file = useSingleMedia(match.params.id);

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h5" component="h2">
        {file.title}
      </Typography>
      <img src={mediaUrl + file.filename} alt={file.title} />
    </React.Fragment>
  );
};

Single.propTypes = {
  match: PropTypes.object
};

export default Single;
