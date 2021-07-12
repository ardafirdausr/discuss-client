import { useState } from 'react';
import { Layout } from 'antd';

import DiscussionList from './DiscussionList';
import DiscussionChat from './DiscussionChat';

import  style from './index.module.scss';

const { Sider } = Layout;

const Chat = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const isMobile = window.innerWidth <= 768;

  return (
    <Layout className={style.container}>
      <Sider theme="light" width={`${isMobile ? '100%' : '410px'}`} className={style.discussionList}>
        <DiscussionList onSelect={setSelectedDiscussion} />
      </Sider>
      <Layout className={style.discussion}>
        <DiscussionChat discussion={selectedDiscussion} />
      </Layout>
    </Layout>
  );
}

export default Chat;