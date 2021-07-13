import { useContext } from 'react';
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Menu,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSignOutAlt,
  faPlusCircle,
  faExternalLinkSquareAlt
} from '@fortawesome/free-solid-svg-icons'

import { StoreContext } from '../../../store';
import { getUser } from '../../../store/user/selector';

import style from './UserInformation.module.scss'

const UserInformation = ({ onClickCreate, onClickJoin }) => {
  const { state } = useContext(StoreContext);
  const user = getUser(state);

  const UserInformationMenu = () => (
    <Menu>
      <Menu.Item>
        <div onClick={onClickCreate}>
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "10px" }}/> Create Discussion
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={onClickJoin}>
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{ marginRight: "10px" }}/> Join Discussion
        </div>
      </Menu.Item>
      <Menu.Item>
        <Link to="/auth/logout" style={{ color: "deeppink" }}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "10px" }}/> Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.container}>
      <Row
        justify="space-around"
        align="middle"
        gutter={{ xs: 8, sm: 16}}
        className={style.userWrapper}>
        <Col className={style.imageWrapper}>
          {
            user.imageUrl
            ? <Avatar src={user.imageUrl} size={40} />
            : <Avatar size={40}>{user.name.charAt(0)}</Avatar>
          }
        </Col>
        <Col flex="auto">
          <div className={style.name}>{user.name}</div>
          <div className={style.email}>{user.email}</div>
        </Col>
        <Col>
          <Dropdown overlay={UserInformationMenu} placement="bottomRight">
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faEllipsisV} className={style.menuButton}/>} />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}

export default UserInformation;