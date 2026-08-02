import React from "react";

import { Typography, Card, Statistic, Row, Col, Calendar } from "antd";

const ExplorePage = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Tài liệu" value={1128} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Người dùng" value={93} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Lượt tải xuống" value={1128} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card title="Lịch sự kiện">
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExplorePage;
