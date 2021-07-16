import { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Layout,
  Row,
  Col,
  Avatar,
  Form,
  Input,
  Button
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';


import style from './DiscussionChat.module.scss';

const { Content } = Layout;

const DiscussionChat = () => {
  const onFinish = (values) => console.log(values);
  const history = useHistory();
  useEffect(() => {
    const exitChat = (event) => {
      if (event.key === 'Escape') {
        history.goBack();
      }
    }
    document.addEventListener('keydown', exitChat);
    return () => {
      document.removeEventListener('keydown', exitChat);
    }
  })

  return (
    <Content className={style.container}>
      <div className={style.messageContainer}>
        {/* <div className={style.eventMessage}>
          <div className={style.content}>Arda created discussion</div>
        </div>
        <div className={style.incomingMessage}>
          <Avatar className={style.avatar}>U</Avatar>
          <div className={style.message}>
              <div className={style.sender}>Arda Firdaus Ramadhan</div>
              <div className={style.text}>hei</div>
              <div className={style.time}>14/07/2021 16:00</div>
          </div>
        </div>
        <div className={style.incomingMessage}>
          <Avatar className={style.avatar}>U</Avatar>
          <div className={style.message}>
              <div className={style.sender}>Arda Firdaus Ramadhan</div>
              <div className={style.text}>hei</div>
              <div className={style.time}>14/07/2021 16:00</div>
          </div>
        </div> */}
      </div>
      <div className={style.messageFormContainer}>
        <Row
          justify="space-between"
          align="middle"
          gutter={{ xs: 8, sm: 16 }}>
          <Col flex="none">
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPaperclip} />} />
          </Col>
          <Col flex="auto">
            <Form
              name="send_chat"
              layout="inline"
              onFinish={onFinish}
              wrapperCol={24}>
              <Form.Item name="message" wrapperCol={{xs: {span: 24}}}>
                <Input
                  placeholder="Send a message" />
              </Form.Item>
              <Form.Item wrapperCol={{xs: {span: 24}}}>
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faPaperPlane} />} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export default DiscussionChat;