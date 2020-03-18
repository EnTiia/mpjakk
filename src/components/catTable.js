import React from "react";
import PropTypes from "prop-types";
import CatRow from "./catRow";

const CatTable = ({ media }) => {
  return (
    <table>
      <tbody>
        {
            media.map((file, index) => {
            return <CatRow file={file} key={index} />;
            })
        }
      </tbody>
    </table>
  );
};

CatTable.propTypes = {
  media: PropTypes.array
};

export default CatTable;
