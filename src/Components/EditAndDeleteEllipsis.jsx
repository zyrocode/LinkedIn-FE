import React from "react";
import "../../node_modules/antd/dist/antd.css";
import { Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";

export default ({ _id, openForEdit, removePost, text }) => {
  const content = (
    <div>
      <Row>
        <Col>
          <i onClick={() => openForEdit(text, _id)} className=" fa fa-pencil">
          </i>
        </Col>
      </Row>
      <Row>
        <Col>
          <i onClick={() => removePost(_id)} className="  far fa-trash-alt"></i>
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
      <Popover placement="bottomLeft" content={content}>
        <EllipsisOutlined style={{ fontSize: "38px" }}>
          Hover me
        </EllipsisOutlined>
      </Popover>
    </div>
  );
};
