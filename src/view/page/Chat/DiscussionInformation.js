import { useContext, useState } from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Button,
  Modal,
  message
} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSignOutAlt,
  faInfoCircle,
  faEdit,
  faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons'

import discussAPI from '../../../adapter/discussAPI';
import { StoreContext } from '../../../store';
import { removeDiscussion } from '../../../store/discussion/action';

import style from './DiscussionInformation.module.scss';


const DiscussionInformation = ({ discussion, onClickDetail, onClickEdit, onClickInvite }) => {
  const { dispatch } = useContext(StoreContext);

  const leave = async () => {
    try {
      await discussAPI.post(`/discussions/${discussion.id}/leave`);
      dispatch(removeDiscussion({id: discussion.id}));
    } catch (err) {
      const { data } = err.response
      message.error(data.message || "Failed")
    }
  }

  const leaveConfirm = () => {
    Modal.confirm({
      title: 'Are you sure to leave this discussion?',
      okText: 'Leave',
      cancelText: 'Cancel',
      onOk: leave,
    });
  }

  const DiscussionInformationMenu = () => (
    <Menu>
      <Menu.Item key="discussion-menu-1">
        <div onClick={onClickDetail} style={{fontWeight: "bold", color: "#6f6f6f"}}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px" }}/> Discussion Detail
        </div>
      </Menu.Item>
      <Menu.Item key="discussion-menu-2">
        <div onClick={onClickEdit} style={{fontWeight: "bold", color: "#6f6f6f"}}>
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }}/> Edit Discussion
        </div>
      </Menu.Item>
      <Menu.Item key="discussion-menu-3">
        <div onClick={onClickInvite} style={{fontWeight: "bold", color: "#6f6f6f"}}>
          <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginRight: "10px" }}/> Invite Member
        </div>
      </Menu.Item>
      <Menu.Item key="discussion-menu-4" style={{borderTop: "1px solid #eaeaea"}}>
        <div onClick={leaveConfirm} style={{fontWeight: "bold", color: "deeppink"}}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "10px" }}/> Leave Discussion
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.container}>
      <div className={style.discussionWrapper}>
        <div className={style.imageWrapper}>
          {
            discussion.imageUrl
            ? <Avatar src={discussion.imageUrl} size={40} />
            : <Avatar size={40}>{discussion.name.charAt(0)}</Avatar>
          }
        </div>
        <div className={style.infoWrapper}>
          <div className={style.name}>{discussion.name}</div>
          <div className={style.member}>
            {
              !discussion.members
                ? null
                : discussion.members.map(member => member.name.split(" ")[0]).join(', ')
            }
          </div>
        </div>
      </div>
      <Dropdown trigger={["click"]} overlay={DiscussionInformationMenu} placement="bottomRight">
        <Button
          type="text"
          icon={<FontAwesomeIcon icon={faEllipsisV} className={style.menuButton}/>} />
      </Dropdown>
    </div>
  );
}

export default DiscussionInformation;