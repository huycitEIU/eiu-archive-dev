import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Form,
  Grid,
  Input,
  Layout,
  Modal,
  Rate,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";

import type { Document } from "../../types/document";
import type { FileInfo } from "../../types/file";
import type { ColumnsType } from "antd/es/table";
import {
  BookOutlined,
  DownloadOutlined,
  EyeOutlined,
  FlagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import documentService from "../../services/documentService";
import Description from "./components/Description";
import type { Category } from "../../types/category";
import categoryService from "../../services/categoryService";
import { fileService } from "../../services/fileService";

const { Title, Text } = Typography;

const columns: ColumnsType<FileInfo> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (value) => <a>{value}</a>,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    render: (value) => {
      return convertFileSize(value);
    },
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: FileInfo) => (
      <Space>
        <Button
          size="small"
          type="text"
          onClick={async () => {
            await fileService.downloadFileById(record.id);
          }}
        >
          <DownloadOutlined />
        </Button>
        <Button disabled type="text">
          <EyeOutlined />
        </Button>
      </Space>
    ),
  },
];

const convertFileSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

const reportOptions: string[] = ["Selection 1", "Selection 2", "Selection 3"];

const OverviewPage: React.FC = () => {
  const sceens = Grid.useBreakpoint();
  const [isOpenReport, setReportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentData, setDocumentData] = useState<Document | null>(null);
  const [categoryData, setCategoryData] = useState<Category[] | null>(null);
  const [fileList, setFileList] = useState<FileInfo[]>([]);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleOpenReport = (): void => {
    setReportOpen(!isOpenReport);
  };

  React.useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        setDocumentData(await documentService.getDocumentById(id));
        setCategoryData(await categoryService.getCategories());
        setFileList(await fileService.getFilesByDocumentId(id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Flex
          justify="center"
          align="center"
          style={{ width: "100%", minHeight: 200 }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Layout.Content>
          <Modal
            open={isOpenReport}
            onOk={handleOpenReport}
            onCancel={handleOpenReport}
            footer={[]}
            loading={loading}
          >
            <Form name="report" layout="vertical">
              <Title style={{ margin: 0 }} level={3}>
                Report
              </Title>
              <Divider></Divider>
              <Text>Document ID: {documentData?.id}</Text>
              <Divider></Divider>
              <Form.Item name={"content"}>
                <Input.TextArea placeholder="Enter problem here.."></Input.TextArea>
              </Form.Item>
              <Form.Item>
                <Checkbox.Group options={reportOptions} />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Report
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Layout.Content>
            <Title level={4}>Author</Title>
            <Flex justify="space-between" align="center">
              <Space>
                <Avatar size={"large"}>
                  <UserOutlined />
                </Avatar>

                <Space vertical>
                  <Text>
                    <strong>Tran Gia Huy</strong>
                    <Tag color={"green"}>Student</Tag>
                  </Text>
                  <Text>huy.trangia.cit23@eiu.edu.vn</Text>
                </Space>
              </Space>
              <Space>
                <Tooltip title="Bookmark">
                  <Button disabled type="text" size="large">
                    <BookOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Report">
                  <Button onClick={handleOpenReport} type="text" size="large">
                    <FlagOutlined />
                  </Button>
                </Tooltip>
              </Space>
            </Flex>

            <Divider></Divider>
            <Title level={4}>Information</Title>
            <Flex vertical={!sceens.md}>
              <Card loading={loading} style={{ flex: 1 }}>
                <Card.Meta
                  title={documentData?.title}
                  description={
                    <>
                      <Description
                        documentData={documentData}
                        categoryData={categoryData}
                      />
                    </>
                  }
                />
              </Card>
              <Divider vertical={sceens.md}></Divider>
              <Card>
                <Card.Meta
                  title="Rating"
                  description={
                    <>
                      <Rate
                        defaultValue={documentData?.averageRating}
                        size="large"
                      ></Rate>
                    </>
                  }
                />
              </Card>
            </Flex>
            <Divider></Divider>
            <Title level={4}>Files</Title>
            <Table
              loading={loading}
              dataSource={fileList}
              columns={columns}
            ></Table>
          </Layout.Content>
          <Title level={3}>Comments</Title>
          <Layout.Content>
            <Form>
              <Form.Item
                name={"commentContent"}
                rules={[
                  { required: true, message: "Please enter comment content" },
                ]}
              >
                <Input.TextArea
                  allowClear
                  showCount
                  placeholder="Write your comment here"
                ></Input.TextArea>
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Comment
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Card>
              <Card.Meta
                avatar={<Avatar></Avatar>}
                title="Username"
                description={
                  <>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Hic blanditiis eius officiis temporibus officia deleniti
                      maxime nihil beatae necessitatibus a dignissimos, minima
                      laboriosam molestiae mollitia veniam nam dolorum ad
                      aperiam.
                    </p>
                  </>
                }
              />
            </Card>
          </Layout.Content>
        </Layout.Content>
      )}
    </>
  );
};

export default OverviewPage;
