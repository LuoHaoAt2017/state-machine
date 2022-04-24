import React from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

export default function Counter() {
  return (
    <>
      <Button>
        <PlusOutlined />
      </Button>
      <Button>
        <MinusOutlined />
      </Button>
    </>
  );
}
