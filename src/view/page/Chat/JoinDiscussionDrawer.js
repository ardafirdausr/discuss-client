import { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Row,
  Col,
  Form,
  Input
} from "antd";

const JoinDrawer = ({ open, onCloseDrawer }) => {
  const [mobile, setMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const changeOnMobile = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", changeOnMobile);
    return () => {
      window.removeEventListener("resize", changeOnMobile);
    }
  }, [])

  return (
    <Drawer
      title="Join a discussion"
      placement="left"
      width={`${mobile ? '100%' : '410px' }`}
      onClose={onCloseDrawer}
      visible={open}
      footer={
        <div style={{textAlign: 'right',}}>
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </div>
      }>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={{ xs: 8, sm: 16}}>
          <Col span={24}>
            <Form.Item
              name="code"
              label="Code"
              rules={[{ required: true, message: 'Please enter discussion code' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter discussion password' }]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default JoinDrawer;
