import React from "react";

import { Typography, Card, Statistic, Row, Col, Calendar } from "antd";

const { Title, Text } = Typography;

const Overview = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Tổng số tài liệu" value={120} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Tổng số danh mục" value={15} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Tài liệu mới trong tháng" value={30} />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic title="Dung lượng lưu trữ đã sử dụng" value="50 GB" />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Calendar fullscreen={false} />
      </Col>
    </Row>
  );
};

export default Overview;
