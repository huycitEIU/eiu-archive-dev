import { Modal, Typography } from "antd";
import { useState } from "react";

const { Paragraph } = Typography;
const VersionModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <Modal
      title="Version Notification"
      onCancel={handleCloseModal}
      open={isModalOpen}
      footer={[]}
    >
      <Paragraph>What's news? - First thing - Second thing</Paragraph>
    </Modal>
  );
};

export default VersionModal;
