import { useState, useContext } from 'react';
import { useParams } from 'react-router';

import { StoreContext } from "../../../store";
import { getDiscussionByCode } from "../../../store/discussion/selector";

import  style from './PanelDiscussionChat.module.scss';

import DiscussionInformation from './DiscussionInformation';
import DiscussionChat from './DiscussionChat';
import DrawerDiscussionDetail from './DrawerDiscussionDetail';
import DrawerEditDiscussion from './DrawerEditDiscussion';
import DrawerInviteMember from './DrawerInviteMember';

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
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [openInviteDrawer, setOpenInviteDrawer] = useState(false)

  if (!discussion) {
    return <DiscussionEmptyPanel />;
  }

  return (
    <>
      <DiscussionInformation
        discussion={discussion}
        onClickDetail={() => setOpenDetailDrawer(true)}
        onClickEdit={() => setOpenEditDrawer(true)}
        onClickInvite={() => setOpenInviteDrawer(true) }/>
      <DiscussionChat discussion={discussion} />
      <DrawerDiscussionDetail
        discussion={discussion}
        open={openDetailDrawer}
        onCloseDrawer={() => setOpenDetailDrawer(false)} />
      {/* <DrawerEditDiscussion
        discussion={discussion}
        open={openEditDrawer}
        onCloseDrawer={() => setOpenEditDrawer(false)} /> */}
      {/* <DrawerInviteMember
        open={openInviteDrawer}
        onCloseDrawer={() => setOpenInviteDrawer(false)} /> */}
    </>
  );
}

export default PanelDiscussionChat;