import  style from './DiscussionChatPanel.module.scss';

import DiscussionInformation from './DiscussionInformation';
import DiscussionChat from './DiscussionChat';

const DiscussionEmptyPanel = () => (
  <div className={style.emptyContainer}>
    <img src="/assets/images/vector/quickchat.svg" alt="Start Chat" className={style.image}/>
    <h1>Start your discussion</h1>
    <h3>Create a discussion and invite your friends to start your discussion<br/> or Join a discussion by click on the discussion link from your friend.</h3>
  </div>
);

const DiscussionChatPanel = ({ discussion }) => {
  if (!discussion) {
    return <DiscussionEmptyPanel />;
  }

  return (
    <>
      <DiscussionInformation discussion={discussion} />
      <DiscussionChat discussion={discussion} />
    </>
  );
}

export default DiscussionChatPanel;