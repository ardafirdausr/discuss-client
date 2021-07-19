import { useEffect, useContext, useRef } from 'react';
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
import dayjs from 'dayjs';

import { StoreContext } from '../../../store';
import { getUser } from '../../../store/user/selector';
import { getMessagesByDiscussionId } from '../../../store/discussion-chat/selector';
import { addMessage } from '../../../store/discussion-chat/action';
import discussionWS from '../../../adapter/discussWS';

import style from './DiscussionChat.module.scss';

const { Content } = Layout;

const Message = ({ sender, message }) => {
  if (message.contentType === 'message.content.event') {
    return (
      <div className={style.eventMessage}>
        <div className={style.content}>{message.content}</div>
      </div>
    );
  }

  return (
    <div className={sender ? style.sentMessage : style.incomingMessage}>
      {
        message.sender.imageUrl
          ? <Avatar className={style.avatar} src={message.sender.imageUrl} />
          : <Avatar className={style.avatar}>{message.sender.name.charAt(0)}</Avatar>
      }
      <div className={style.message}>
          <div className={style.sender}>{message.sender.name}</div>
          <div className={style.text}>{message.content}</div>
          <div className={style.time}>{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm')}</div>
      </div>
    </div>
  );
}

const DiscussionChat = ({ discussion }) => {
  const { state, dispatch } = useContext(StoreContext);
  const user = getUser(state);
  const history = useHistory();
  const [form] = Form.useForm();
  const discussionMessages = getMessagesByDiscussionId(state, discussion.id);
  const endOfChatRef = useRef(null);

  const sendMessage = async () => {
    const { message } = await form.validateFields();
    const sentMessage = await discussionWS.sendTextToDiscussion(discussion.id, message);
    sentMessage.sender = {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    };
    dispatch(addMessage(sentMessage));
    endOfChatRef.current.scrollIntoView();
    form.resetFields();
  };

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
        {
          discussionMessages.map((message) =>
            <Message key={message.id} sender={message.sender.id === user.id} message={message} />)
        }
        <div ref={endOfChatRef}></div>
      </div>
      <div className={style.messageFormContainer}>
        {/* <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faPaperclip} />} /> */}
        <Form
          name="send_chat"
          layout="inline"
          form={form}
          wrapperCol={24}>
          <Form.Item name="message" wrapperCol={{ flex: "auto" }}>
            <Input placeholder="Send a message" />
          </Form.Item>
          <Form.Item wrapperCol={{ flex: "40px" }}>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPaperPlane} />}
              onClick={sendMessage} />
          </Form.Item>
        </Form>
        {/* <Row
          justify="space-between"
          align="middle"
          gutter={{ xs: 8, sm: 16 }}>
          <Col flex="none">
          </Col>
          <Col flex="auto">

          </Col>
        </Row> */}
      </div>
    </Content>
  );
}

export default DiscussionChat;