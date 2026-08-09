import React from "react";

import {
  Typography,
  Input,
  Radio,
  Form,
  Button,
  Rate,
  Checkbox,
  theme,
  message,
} from "antd";

import type { FormProps } from "antd";

import { SmileOutlined, FrownOutlined, MehOutlined } from "@ant-design/icons";

import { feedbackService } from "../../services/feedbackService";
import type { FeedbackSubmission } from "../../types/feedback";

const { Title } = Typography;

// Make the radio buttons larger and circle
const radioButtonStyle: React.CSSProperties = {
  width: 100,
  height: 100,
  lineHeight: "100px",
  textAlign: "center",
  borderRadius: "50%",
  margin: "0 8px",
  fontSize: 50,
  padding: 0,
  backgroundColor: "transparent",
};

export const FeedbackPage: React.FC = () => {
  const {
    token: { colorSuccess, colorWarning, colorError },
  } = theme.useToken();

  const [form] = Form.useForm<FeedbackSubmission>();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FeedbackSubmission>["onFinish"] = async (
    values,
  ) => {
    const response = await feedbackService.submitFeedback(values);
    if (response.success) {
      messageApi.success(response.message);
      form.resetFields();
    } else {
      messageApi.error(response.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 24 }}>
          Feedback
        </Title>

        <Form.Item
          name="mood"
          label="How would you describe your mood after using our product for the first time?"
          rules={[{ required: true, message: "Please select your mood!" }]}
        >
          <Radio.Group>
            <Radio.Button
              value="good"
              style={{ ...radioButtonStyle, color: colorSuccess }}
            >
              <SmileOutlined />
            </Radio.Button>
            <Radio.Button
              value="neutral"
              style={{ ...radioButtonStyle, color: colorWarning }}
            >
              <MehOutlined />
            </Radio.Button>
            <Radio.Button
              value="bad"
              style={{ ...radioButtonStyle, color: colorError }}
            >
              <FrownOutlined />
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="rating"
          label="How would you rate your overall experience with our product?"
          rules={[{ required: true, message: "Please provide a rating!" }]}
        >
          <Rate size="large" />
        </Form.Item>
        <Form.Item name="content" label="Your feedback">
          <Input.TextArea
            rows={4}
            placeholder="Anything you'd like to add? Your feedback is valuable to us!"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit Feedback
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FeedbackPage;
