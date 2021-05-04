import React, { useEffect, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import Park from "./Park";
/**
 *{results.map((park) => (
        <Park park={park} />
      ))}
 */
function Results({ apiUrl }) {
  const [results, setResults] = useState([]);
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  useEffect(() => {
    queryList(apiUrl); //通过上级组件传来的props中的apiurl进行请求
  }, []);
  const queryList = (url) => {
    axios.get(url).then((data) => {
      //date is an object that is returned from express response (data是后台返回给前端的对象(express中response里返回的))
      //reasign value
      setResults(data.data.data);
    });
  };
  const clickDetail = (id) => {
    //跳转详情页,拼接路由动态参数
    history.push({ pathname: `/parkDetails/${id}` });
  };
  return (
    <div className="results">
      {results.map((park) => (
        //添加点击事件并传入pardid作为参数
        <div onClick={() => clickDetail(park.id)} aria-hidden="true">
          <Park park={park} />
        </div>
      ))}
    </div>
  );
}

export default Results;
