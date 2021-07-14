import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useParams } from "react-router-dom";

import DiscussionPanel from './DiscussionPanel';
import DiscussionChatPanel from './DiscussionChatPanel';

import  style from './index.module.scss';

const { Sider } = Layout;

const Chat = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState({
    id: 1,
    name: "Discussion Group",
    code: "1234",
    imageUrl: null,
    members: [
      { name: "Arda Firdaus Ramadhan" },
      { name: "Emir Syahreza" },
      { name: "Lentera Ruh" },
      { name: "Rafel Permata" },
      { name: "Lanang Ishanda" },
      { name: "Rizky Ramadhan" },
    ]
  });
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
        <DiscussionChatPanel discussion={selectedDiscussion} />
      </Layout>
    )
  }

  // mobile on discussion list page
  if (mobile) {
    return (
      <Layout className={style.container}>
        <Sider theme="light" width="100%">
          <DiscussionPanel onSelect={setSelectedDiscussion} />
        </Sider>
      </Layout>
    )
  }

  // web
  return (
    <Layout className={style.container}>
      <Sider theme="light" width={410}>
        <DiscussionPanel onSelect={setSelectedDiscussion} />
      </Sider>
      <Layout>
        <DiscussionChatPanel discussion={selectedDiscussion} />
      </Layout>
    </Layout>
  );
}

export default Chat;