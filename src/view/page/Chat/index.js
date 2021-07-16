import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useParams } from "react-router-dom";

import PanelDiscussion from './PanelDiscussion';
import PanelDiscussionChat from './PanelDiscussionChat';

import  style from './index.module.scss';

const { Sider } = Layout;

const Chat = () => {
  const { discussionCode } = useParams();

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