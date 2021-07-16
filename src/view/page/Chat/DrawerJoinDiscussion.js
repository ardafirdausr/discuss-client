import { useState, useEffect, useContext } from "react";
import {
  Drawer,
  Button,
  Row,
  Col,
  Form,
  Input,
  message
} from "antd";
import humps from 'humps';

import discussAPI from '../../../adapter/discussAPI';
import slugify from '../../../lib/slugify';
import { StoreContext } from '../../../store';
import * as action from '../../../store/discussion/action';

const DrawerJoinDiscussion = ({ open, onCloseDrawer }) => {
  const { dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
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
      let values = await form.validateFields()
      const { data: response } = await discussAPI.post('/discussions/join', values);
      const { data: discussionData } = response;
      const discussion = humps.camelizeKeys(discussionData);
      dispatch(action.addDiscussion(discussion))
      form.resetFields();
      onCloseDrawer();
      message.success("Success")
    } catch (err) {
      const { data } = err.response
      message.error(data.message || "Failed")
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer
      title="Create a new discussion"
      placement="left"
      width={`${mobile ? '100%' : '410px' }`}
      onClose={onCloseDrawer}
      visible={open}
      footer={
        <div style={{textAlign: 'right',}}>
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" loading={submitting} onClick={handleFormSubmit}>
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
              name="code"
              label="Code"
              rules={[
                { required: true, message: 'Please enter discussion code' },
                { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Valid code example: this-is-valid-code-123' },
                { transform: (value) => slugify(value) }
              ]}>
              <Input placeholder="ex: stock-discussion-2020"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default DrawerJoinDiscussion;
