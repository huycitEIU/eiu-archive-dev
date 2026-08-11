import { useState, type CSSProperties } from "react";
import { Card, Tag, Space, theme, Grid } from "antd";
import { BookOutlined, DownloadOutlined, StarFilled } from "@ant-design/icons";

export interface DocumentCardProps {
  id: string;
  name: string;
  category: string;
  username: string;
  downloadCount: number;
  bookmarkCount: number;
  averageRating: number;
  coverUrl?: string;
  onClick?: (id: string) => void;
}

const coverStyle: CSSProperties = {
  width: "100%",
  height: "80px",
  objectFit: "cover",
};

const altColors = [
  "#F599C6",
  "#efd974",
  "#7DCCAD",
  "#1B5E20",
  "#66BB6A",
  "#4D6787",
  "#0D47A1",
  "#2196F3",
  "#293681",
  "#452829",
  "#57595B",
  "#C08552",
];

const DocumentCard = ({
  id,
  name,
  category,
  username,
  coverUrl,
  bookmarkCount,
  downloadCount,
  averageRating,
  onClick,
}: DocumentCardProps) => {
  const {
    token: { orange, green, purple },
  } = theme.useToken();
  const [randomCorlor] = useState(
    () => altColors[Math.floor(Math.random() * altColors.length)],
  );

  const screens = Grid.useBreakpoint();

  return (
    <Card
      hoverable
      style={{ width: screens.md ? "30%" : "100%", margin: "auto" }}
      cover={
        coverUrl == "/" ? (
          <div
            style={{
              ...coverStyle,
              backgroundColor: randomCorlor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {name.split(" ")[0]}
          </div>
        ) : (
          <img style={coverStyle} draggable={false} alt={name} src={coverUrl} />
        )
      }
      onClick={() => onClick?.(id)}
    >
      <Card.Meta
        title={name}
        description={
          <>
            <Space vertical={screens.md}>
              <Space>
                <Tag color={purple}>{category}</Tag>
                <Tag color={green}>{username}</Tag>
              </Space>
              <Space>
                <Tag variant="filled" color={orange}>
                  <strong>
                    <StarFilled /> {averageRating}
                  </strong>
                </Tag>
                <Tag>
                  <BookOutlined /> {bookmarkCount}
                </Tag>
                <Tag>
                  <DownloadOutlined /> {downloadCount}
                </Tag>
              </Space>
            </Space>
          </>
        }
      />
    </Card>
  );
};

export default DocumentCard;
