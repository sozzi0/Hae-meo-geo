import { Tag } from "@components/Button/Button";
import List from "@components/Recipe/List/List";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RcpList() {
  const axios = useCustomAxios(true);
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    const { data } = await axios(url);
    setData(data.COOKRCP01.row);
  };

  useEffect(() => {
    fetchData("/1/100");
  }, []);

  const recipeItem = data?.map((item) => (
    <li key={item["RCP_SEQ"]}>
      <Link to={`/recipe/list/${item["RCP_NM"]}`}>
        <img src={item["ATT_FILE_NO_MAIN"]} alt={item["RCP_NM"]} />
        <p>{item["RCP_NM"]}</p>
        <Tag>{item["RCP_PAT2"]}</Tag>
        <Tag>{item["RCP_WAY2"]}</Tag>
      </Link>
    </li>
  ));

  return (
    <>
      <Title>해머거 레시피</Title>
      <Search fetchData={fetchData} />
      <List recipeItem={recipeItem} />
    </>
  );
}

export default RcpList;
