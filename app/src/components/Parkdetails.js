import React, { useEffect, useState } from "react";

import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

function Popup({ requestUrl }) {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  //组件渲染时会调用useEffect
  //在里面请求数据渲染到页面中
  useEffect(() => {
    queryDetails(id);
  }, []);
  const queryDetails = (detailId) => {
    const apiUrl = `${requestUrl}?id=${detailId}`;
    axios.get(apiUrl).then((data) => {
      const res = data.data.data[0];
      setDetails(res);
      setCurrentImg(res.images.length > 0 ? res.images[0].url : "");
      setIsLoad(true);
    });
  };
  const imgClick = (detail) => {
    setCurrentImg(detail.url);
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="details-container ">
      <div>
        <Button variant="light" className="back-btn" onClick={goBack}>
          Back
        </Button>
      </div>
      <Row xs={1} md={2} lg={2}>
        <Col>
          <div className="details-img">
            <img src={isLoad ? currentImg : ""} alt="" />
          </div>
        </Col>
        <Col>
          <div className="details-info">
            <h3>{details.fullName}</h3>
            <h5>{details.states}</h5>
            <div className="details-desc">{details.description}</div>
            <div className="details-coveritems">
              {isLoad
                ? details.images.map((detail, index) =>
                    index < 4 ? (
                      <img
                        onClick={() => imgClick(detail)} //图片点击事件，传入的参数为循环的每一项
                        aria-hidden="true"
                        className={"details-coverimg"}
                        src={detail.url}
                        alt={DataTransferItemList.title}
                      />
                    ) : (
                      ""
                    ),
                  )
                : ""}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Popup;
