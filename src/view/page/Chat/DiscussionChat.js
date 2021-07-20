import { useEffect, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Layout,
  Row,
  Col,
  Avatar,
  Form,
  Input,
  Button,
  Upload
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import humps from 'humps';

import { StoreContext } from '../../../store';
import { getUser } from '../../../store/user/selector';
import { getMessagesByDiscussionId } from '../../../store/discussion-chat/selector';
import { addMessage, addOldMessages } from '../../../store/discussion-chat/action';
import discussionAPI from '../../../adapter/discussAPI';
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
  const endOfChatRef = useRef(null);
  const sendButton = useRef(null);

  const [form] = Form.useForm();
  const sendMessage = async () => {
    const { message } = await form.getFieldsValue();
    if (!message) {
      return
    }

    const sentMessage = await discussionWS.sendTextToDiscussion(discussion.id, message);
    sentMessage.sender = {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    };
    form.resetFields();
    dispatch(addMessage(sentMessage));
  };

  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchMessages = async () => {
      const size = 10;
      const { data: payload } = await discussionAPI.get(`discussions/${discussion.id}/messages?page=${page}&size=${size}`)
      const { data: messages } = payload;
      const formatedMessages = humps.camelizeKeys(messages)
      dispatch(addOldMessages({ id: discussion.id, messages: formatedMessages }));
      setPage(page + 1)
    }
    fetchMessages();
  }, [])

  const history = useHistory();
  useEffect(() => {
    const exitChat = (event) => {
      if (event.key === 'Escape') {
        history.goBack();
      }
    }

    const sendMessageOnEnter = (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    }
    document.addEventListener('keydown', exitChat);
    document.addEventListener('keydown', sendMessageOnEnter);
    return () => {
      document.removeEventListener('keydown', exitChat);
      document.removeEventListener('keydown', sendMessageOnEnter);
    }
  })

  const discussionMessages = getMessagesByDiscussionId(state, discussion.id);
  useEffect(() => {
    endOfChatRef.current.scrollIntoView(true);
  }, [discussionMessages])

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
          form={form}
          autoComplete="off">
            <Row
              justify="center"
              align="middle">
              <Col flex="40px" >
                <Upload name="media" action="/upload.do" listType="picture" maxCount={1}>
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPaperclip} />}
                    onClick={sendMessage} />
                </Upload>
              </Col>
              <Col flex="auto">
                <Form.Item name="message" style={{marginBottom: 0}}>
                  <Input
                    autoFocus={true}
                    placeholder="Send a message" />
                </Form.Item>
              </Col>
              <Col flex="40px" >
                <Form.Item style={{marginBottom: 0}}>
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPaperPlane} />}
                    onClick={sendMessage}
                    ref={sendButton} />
                </Form.Item>
              </Col>
            </Row>
        </Form>
      </div>
    </Content>
  );
}

export default DiscussionChat;