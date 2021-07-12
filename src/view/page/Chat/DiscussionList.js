import { useState, useContext } from 'react';
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Menu,
  Empty,
  Button,
  Space
} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSignOutAlt,
  faPlusCircle,
  faExternalLinkSquareAlt
} from '@fortawesome/free-solid-svg-icons'

import { StoreContext } from '../../../store';

import style from './DiscussionList.module.scss'

const UserInformationMenu = () => (
  <Menu>
    <Menu.Item>
      <div>
        <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "10px" }}/> Create Discussion
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{ marginRight: "10px" }}/> Join Discussion
      </div>
    </Menu.Item>
    <Menu.Item>
      <a href="/auth/logout" style={{ color: "deeppink" }}>
        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "10px" }}/> Logout
      </a>
    </Menu.Item>
  </Menu>
);

const UserInformation = () => {
  const { state } = useContext(StoreContext)
  return (
    <div className={style.userInformationContainer}>
      <Row
        justify="space-around"
        align="middle"
        gutter={{ xs: 8, sm: 16}}
        className={style.userWrapper}>
        <Col className={style.imageWrapper}>
          <Avatar src={state.user.imageUrl} size={40} />
        </Col>
        <Col flex="auto">
          <div className={style.name}>{state.user.name}</div>
          <div className={style.email}>{state.user.email}</div>
        </Col>
        <Col>
          <Dropdown overlay={UserInformationMenu} placement="bottomRight">
            <FontAwesomeIcon icon={faEllipsisV} className={style.menuButton}/>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}

const Discussion = ({ discussion, onClick }) => {
  <div className={style.dicussionContainer} onClick={onClick}>
    <Row
      justify="space-around"
      align="middle"
      gutter={{ xs: 8, sm: 16}}
      className={style.discussionWrapper}>
      <Col className={style.imageWrapper}>
        <Avatar src={discussion.imageUrl} size={40} />
      </Col>
      <Col flex="auto">
        <div className={style.main}>{discussion.name}</div>
        <div className={style.secondary}>{discussion.lastMessage}</div>
      </Col>
      <Col>
        <div className={style.secondary}>08:00</div>
        {/* <div className={style.email}>{discussion.lastMessage}</div> */}
      </Col>
    </Row>
  </div>
}

const EmptyDiscussion = () => (
  <div className={style.empty}>
    <Empty description="Discussion is not found" />
    <div>
      <Space>
        <Button
          size="small"
          type="primary"
          shape="round"
          style={{color: "#fff"}}
          >
            Create
        </Button>
        <Button type="text">or</Button>
        <Button
          size="small"
          type="primary"
          shape="round"
          style={{color: "#fff"}}
          >
            Join
        </Button>
      </Space>
    </div>
  </div>
)

const DiscussionList = ({ onSelect }) => {
  const [discussions] = useState([])

  return (
    <>
      <UserInformation />
      {
        discussions.length < 1
        ? <EmptyDiscussion />
        : discussions.map((discussion) => (<Discussion discussion={discussion} onClick={onSelect} />))
      }
    </>
  );
}

export default DiscussionList