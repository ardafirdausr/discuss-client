import { useState } from 'react';

import UserInformation from './UserInformation';
import CreateDiscussionDrawer from './CreateDiscussionDrawer';
import JoinDiscussionDrawer from './JoinDiscussionDrawer';
import DiscussionList from './DiscussionList';

const DiscussionPanel = ({ onSelect }) => {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openJoinDrawer, setOpenJoinDrawer] = useState(false)

  return (
    <>
      <UserInformation
        onClickCreate={() => setOpenCreateDrawer(true)}
        onClickJoin={() => setOpenJoinDrawer(true)}/>
      <DiscussionList
        onClickCreate={() => setOpenCreateDrawer(true)}
        onClickJoin={() => setOpenJoinDrawer(true)}
        onSelect={onSelect} />
      <CreateDiscussionDrawer
        open={openCreateDrawer}
        onCloseDrawer={() => setOpenCreateDrawer(false)} />
      <JoinDiscussionDrawer
        open={openJoinDrawer}
        onCloseDrawer={() => setOpenJoinDrawer(false)} />
    </>
  )
}

export default DiscussionPanel;