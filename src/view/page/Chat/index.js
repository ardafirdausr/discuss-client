import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useParams } from "react-router-dom";

import DiscussionPanel from './DiscussionPanel';
import DiscussionChat from './DiscussionChat';

import  style from './index.module.scss';

const { Sider } = Layout;

const Chat = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const { discussionId } = useParams();
  const [mobile, setMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const changeOnMobile = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", changeOnMobile);
    return () => {
      window.removeEventListener("resize", changeOnMobile);
    }
  }, [])

  // mobile on chat page
  if (mobile && discussionId) {
    return (
      <Layout className={style.container}>
        <Layout className={style.discussion}>
          <DiscussionChat discussion={selectedDiscussion} />
        </Layout>
      </Layout>
    )
  }

  // mobile on discussion list page
  if (mobile) {
    return (
      <Layout className={style.container}>
        <Sider theme="light" width="100%" className={style.discussionPanel}>
          <DiscussionPanel onSelect={setSelectedDiscussion} />
        </Sider>
      </Layout>
    )
  }

  // web
  return (
    <Layout className={style.container}>
      <Sider theme="light" width={410} className={style.discussionPanel}>
        <DiscussionPanel onSelect={setSelectedDiscussion} />
      </Sider>
      <Layout className={style.discussion}>
        <DiscussionChat discussion={selectedDiscussion} />
      </Layout>
    </Layout>
  );
}

export default Chat;