import { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Row,
  Col,
  Form,
  Input,
  message,
} from "antd";

import discussAPI from '../../../adapter/discussAPI';

const DrawerEditPassword = ({ discussion, open, onCloseDrawer }) => {
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm();

  const [mobile, setMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const changeOnMobile = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", changeOnMobile);
    return () => {
      window.removeEventListener("resize", changeOnMobile);
    }
  }, [])

  const handleFormSubmit = async () => {
    try {
      setSubmitting(true);
      let values = await form.validateFields();
      if (values.password !== values.password_confirmation) {
        message.error("Invalid password confirmation")
        return;
      }

      await discussAPI.put(`/discussions/${discussion.id}/password`, values);
      form.resetFields();
      onCloseDrawer();
      message.success("Discussion password updated")
    } catch (err) {
      console.log(err)
      if (!err.response) {
        message.error("Failed")
      } else {
        const { data } = err.response
        message.error(data.message || "Failed")
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer
      title="Edit discussion"
      placement="left"
      width={mobile ? '100%' : '410px' }
      onClose={onCloseDrawer}
      visible={open}
      footer={
        <div style={{textAlign: 'right',}}>
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button loading={submitting} onClick={handleFormSubmit} type="primary">
            Submit
          </Button>
        </div>
      }>
      <Form
        layout="vertical"
        form={form}>
        <Row gutter={{ xs: 8, sm: 16}}>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter discussion password' },
                { transform: (value) => value.trim() }
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password_confirmation"
              label="Password Confirmation"
              rules={[
                { required: true, message: 'Please enter password confirmation' },
                { transform: (value) => value.trim() }
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default DrawerEditPassword;
