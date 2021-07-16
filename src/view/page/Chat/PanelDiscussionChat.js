import { useContext } from 'react';
import { useParams } from 'react-router';

import { StoreContext } from "../../../store";
import { getDiscussionByCode } from "../../../store/discussion/selector";

import  style from './PanelDiscussionChat.module.scss';

import DiscussionInformation from './DiscussionInformation';
import DiscussionChat from './DiscussionChat';

const DiscussionEmptyPanel = () => (
  <div className={style.emptyContainer}>
    <img src="/assets/images/vector/quickchat.svg" alt="Start Chat" className={style.image}/>
    <h1>Start your discussion</h1>
    <h3>Create a discussion and invite your friends to start your discussion<br/> or Join a discussion by click on the discussion link from your friend.</h3>
  </div>
);

const PanelDiscussionChat = () => {
  const { discussionCode } = useParams();
  const { state } = useContext(StoreContext);
  const discussion = getDiscussionByCode(state, discussionCode);

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

export default PanelDiscussionChat;