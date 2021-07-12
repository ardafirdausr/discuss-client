import { Layout } from 'antd';

import  style from './DiscussionChat.module.scss';

const { Header, Content } = Layout;

const DiscussionChatPanel = () => {
  <>
    <Header className={style.header}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, mollitia dolore atque voluptas porro esse sapiente eveniet quis saepe?
    </Header>
    <Content>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae blanditiis quasi eos corrupti dolorum necessitatibus in impedit doloribus magnam dicta.
    </Content>
  </>
}

const DiscussionEmptyPanel = () => (
  <div className={style.emptyContainer}>
    <img src="/assets/images/vector/quickchat.svg" alt="Start Chat" className={style.image}/>
    <h1>Start your discussion</h1>
    <h3>Create a discussion and invite your friends to start your discussion<br/> or Join a discussion by click on the discussion link from your friend.</h3>
  </div>
)

const DiscussionChat = ({ discussion }) => {
  if (!discussion) {
    return <DiscussionEmptyPanel />
  }

  return <DiscussionChatPanel />
}

export default DiscussionChat;