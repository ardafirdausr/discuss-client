import { useContext } from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Button,
  Modal,
} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSignOutAlt,
  faPlusCircle,
  faExternalLinkSquareAlt,
} from '@fortawesome/free-solid-svg-icons'

import { StoreContext } from '../../../store';
import { getUser } from '../../../store/user/selector';

import style from './UserInformation.module.scss';

const UserInformation = ({ onClickCreate, onClickJoin }) => {
  const { state } = useContext(StoreContext);
  const user = getUser(state);
  const logoutConfirm = () => {
    Modal.confirm({
      title: 'Are you sure to logout?',
      okText: 'Logout',
      cancelText: 'Cancel',
      onOk: () => { window.location = '/auth/logout'}
    });
  }

  const UserInformationMenu = () => (
    <Menu>
      <Menu.Item key="user-menu-1">
        <div onClick={onClickCreate} style={{fontWeight: "bold", color: "#6f6f6f"}}>
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "10px" }}/> Create Discussion
        </div>
      </Menu.Item>
      <Menu.Item key="user-menu-2">
        <div onClick={onClickJoin} style={{fontWeight: "bold", color: "#6f6f6f"}}>
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{ marginRight: "10px" }}/> Join Discussion
        </div>
      </Menu.Item>
      <Menu.Item key="user-menu-3" style={{borderTop: "1px solid #eaeaea"}}>
        <div onClick={logoutConfirm} style={{fontWeight: "bold", color: "deeppink"}}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "10px" }}/> Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.container}>
      <div className={style.userWrapper}>
        <div className={style.imageWrapper}>
          {
            user.imageUrl
            ? <Avatar src={user.imageUrl} size={40} />
            : <Avatar size={40}>{user.name.charAt(0)}</Avatar>
          }
        </div>
        <div className={style.infoWrapper}>
          <div className={style.name}>{user.name}</div>
          <div className={style.email}>{user.email}</div>
        </div>
      </div>
      <Dropdown trigger={["click"]} overlay={UserInformationMenu} placement="bottomRight">
        <Button
          type="text"
          icon={<FontAwesomeIcon icon={faEllipsisV} className={style.menuButton}/>} />
      </Dropdown>
    </div>
  );
}

export default UserInformation;