import { useState } from 'react';

import UserInformation from './UserInformation';
import DrawerCreateDiscussion from './DrawerCreateDiscussion';
import DrawerJoinDiscussion from './DrawerJoinDiscussion';
import DiscussionList from './DiscussionList';

const PanelDiscussion = () => {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openJoinDrawer, setOpenJoinDrawer] = useState(false)

  return (
    <>
      <UserInformation
        onClickCreate={() => setOpenCreateDrawer(true)}
        onClickJoin={() => setOpenJoinDrawer(true)}/>
      <DiscussionList
        onClickCreate={() => setOpenCreateDrawer(true)}
        onClickJoin={() => setOpenJoinDrawer(true)} />
      <DrawerCreateDiscussion
        open={openCreateDrawer}
        onCloseDrawer={() => setOpenCreateDrawer(false)} />
      <DrawerJoinDiscussion
        open={openJoinDrawer}
        onCloseDrawer={() => setOpenJoinDrawer(false)} />
    </>
  )
}

export default PanelDiscussion;