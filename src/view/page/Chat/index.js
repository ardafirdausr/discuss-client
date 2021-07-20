import { useState, useEffect, useContext } from 'react';
import { Layout } from 'antd';
import { useParams } from "react-router-dom";

import { StoreContext } from '../../../store';
import { getUser } from '../../../store/user/selector';
import { getDiscussions } from '../../../store/discussion/selector';
import { addMessage } from '../../../store/discussion-chat/action';
import { updateFetchDiscussionMeta } from '../../../store/discussion/action';
import discussionWS from '../../../adapter/discussWS';

import PanelDiscussion from './PanelDiscussion';
import PanelDiscussionChat from './PanelDiscussionChat';

import  style from './index.module.scss';

const { Sider } = Layout;

const Chat = () => {
  const { state, dispatch } = useContext(StoreContext);
  const discussions = getDiscussions(state);
  const { token } = getUser(state)
  const { discussionCode } = useParams();

  useEffect(() => {
    const incomingMessageHandler = (message) => {
      dispatch(addMessage(message))

      if (message.receiverType === "message.receiver.discussion") {
        dispatch(updateFetchDiscussionMeta(message.receiverId, {
          lastMessageSender: message.sender.name,
          lastMessageType: message.contentType,
          lastMessage: message.content,
        }));
      }
    }

    discussionWS.start(token)
    discussionWS.listenToIncomingMessage(incomingMessageHandler)
    return () => {
      discussionWS.close()
    }

  }, [token, discussions, dispatch])

  const [mobile, setMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const changeOnMobile = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", changeOnMobile);
    return () => {
      window.removeEventListener("resize", changeOnMobile);
    }
  }, [])

  // mobile on chat page
  if (mobile && discussionCode) {
    return (
      <Layout className={style.container}>
        <PanelDiscussionChat />
      </Layout>
    )
  }

  // mobile on discussion list page
  if (mobile) {
    return (
      <Layout className={style.container}>
        <Sider theme="light" width="100%">
          <PanelDiscussion />
        </Sider>
      </Layout>
    )
  }

  // web
  return (
    <Layout className={style.container}>
      <Sider theme="light" width={410}>
        <PanelDiscussion />
      </Sider>
      <Layout>
        <PanelDiscussionChat />
      </Layout>
    </Layout>
  );
}

export default Chat;