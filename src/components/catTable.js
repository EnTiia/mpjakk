import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CatRow from "./catRow";

const CatTable = () => {
  const [picArray, setPicArray] = useState([]);
 const loadMedia = async () => {
   const response = await fetch('test.json');
   const json = await response.json();
   console.log(json);
   setPicArray(json);
 };

 useEffect( () => {
   loadMedia();
 }, []);

  return (
    <table>
      <tbody>
        {
            picArray.map((file, index) => <CatRow file={file} key={index} />)
        }
      </tbody>
    </table>
  );
};

export default CatTable;
 