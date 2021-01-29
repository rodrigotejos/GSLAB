import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "../../components/Table/Table";
import axios from "axios";

const MainPage = ({ selectId }) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/produto/all");
      console.log("axios data::::", response);
      setData(response.data);
    })();
  }, []);
  return (
    <Fragment>
      <Table result={data} />
    </Fragment>
  );
};
export default MainPage;
