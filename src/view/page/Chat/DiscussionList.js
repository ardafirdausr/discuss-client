import { useState, useContext, useEffect } from 'react';
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Menu,
  Empty,
  Button,
  Space,
  Drawer,
  Form,
  Input
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

import style from './DiscussionList.module.scss'

const JoinDrawer = ({ open, onCloseDrawer }) => {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const changeOnMobile = () => {
      if (window.innerWidth <= 768) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    };
    window.addEventListener("resize", changeOnMobile);
    return () => {
      window.removeEventListener("resize", changeOnMobile);
    }
  })

  return (
    <Drawer
      title="Join a discussion"
      placement="left"
      width={`${mobile ? '100%' : '410px' }`}
      onClose={onCloseDrawer}
      visible={open}
      footer={
        <div style={{textAlign: 'right',}}>
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onCloseDrawer} type="primary">
            Submit
          </Button>
        </div>
      }>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={{ xs: 8, sm: 16}}>
          <Col span={24}>
            <Form.Item
              name="code"
              label="Code"
              rules={[{ required: true, message: 'Please enter discussion code' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter discussion password' }]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

const CreateDrawer = ({ open, onCloseDrawer }) => {
  const [usePassword, setUsePassword] = useState(false)
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const changeOnMobile = () => {
      if (window.innerWidth <= 768) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    };
    window.addEventListener("resize", changeOnMobile);
    return () => {
      window.removeEventListener("resize", changeOnMobile);
    }
  })

  return (
    <Drawer
      title="Create a new discussion"
      placement="left"
      width={`${mobile ? '100%' : '410px' }`}
      onClose={onCloseDrawer}
      visible={open}
      footer={
        <div style={{textAlign: 'right',}}>
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onCloseDrawer} type="primary">
            Submit
          </Button>
        </div>
      }>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={{ xs: 8, sm: 16}}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter discussion name' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="code"
              label="Code"
              rules={[{ required: true, message: 'Please enter discussion code' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter discussion password' }]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password_confirmation"
              label="Password Confirmation"
              rules={[{ required: true, message: 'Please enter password confirmation' }]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description">
              <Input.TextArea rows={2}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

const UserInformation = ({ onClickCreate, onClickJoin }) => {
  const { state } = useContext(StoreContext)

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
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faEllipsisV} className={style.menuButton}/>} />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}

const EmptyDiscussion = ({ onClickCreate, onClickJoin }) => (
  <div className={style.empty}>
    <Empty description="Discussion is not found" />
    <div>
      <Space>
        <Button
          size="small"
          type="primary"
          shape="round"
          style={{color: "#fff"}}
          onClick={onClickCreate}>
          Create
        </Button>
        <Button type="text">or</Button>
        <Button
          size="small"
          type="primary"
          shape="round"
          style={{color: "#fff"}}
          onClick={onClickJoin}>
            Join
        </Button>
      </Space>
    </div>
  </div>
)

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

const DiscussionList = ({ onSelect }) => {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openJoinDrawer, setOpenJoinDrawer] = useState(false)
  const [discussions] = useState([])

  return (
    <>
      <UserInformation
        onClickCreate={() => setOpenCreateDrawer(true)}
        onClickJoin={() => setOpenJoinDrawer(true)}/>
      {
        discussions.length > 0
        ? discussions.map((discussion) => (<Discussion discussion={discussion} onClick={onSelect} />))
        : <EmptyDiscussion
          onClickCreate={() => setOpenCreateDrawer(true)}
          onClickJoin={() => setOpenJoinDrawer(true)}/>
      }
      <CreateDrawer
        open={openCreateDrawer}
        onCloseDrawer={() => setOpenCreateDrawer(false)} />
      <JoinDrawer
        open={openJoinDrawer}
        onCloseDrawer={() => setOpenJoinDrawer(false)} />
    </>
  );
}

export default DiscussionList