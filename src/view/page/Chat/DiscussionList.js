import { useContext } from 'react';
import {
  Row,
  Col,
  Avatar,
  Empty,
  Button,
  Space,
  Typography
} from 'antd';

import { StoreContext } from "../../../store";
import { getDiscussions } from "../../../store/discussion/selector";

import style from './DiscussionList.module.scss'

const { Title, Text } = Typography;

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

const Discussion = ({ discussion, onClick }) => (
  <div className={style.dicussionContainer} onClick={onClick}>
    <Row
      justify="space-around"
      align="middle"
      gutter={{ xs: 8, sm: 16}}
      className={style.discussionWrapper}>
      <Col className={style.imageWrapper}>
        {
          discussion.imageUrl
          ? <Avatar src={discussion.imageUrl} size={40} />
          : <Avatar size={40}>{discussion.name.charAt(0)}</Avatar>
        }
      </Col>
      <Col flex="auto">
        <div className={style.main}>{discussion.name}</div>
        {/* <div className={style.secondary}>{discussion.lastMessage}</div> */}
        <div className={style.secondary} ellipsis>message drom other usersa das dasd</div>
        {/* <div className={style.secondary}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, assumenda ipsam! Error harum iure facere assumenda consequatur, labore quod illo a eligendi, accusantium sequi beatae reprehenderit dolorem delectus iste cum veniam deleniti? Voluptates obcaecati, necessitatibus ad reiciendis, numquam quis non ut sint nemo voluptas dolore aliquid corrupti, voluptatem saepe? A?</div> */}
      </Col>
      <Col>
        <div className={style.secondary}>08:00</div>
        {/* <div className={style.email}>{discussion.lastMessage}</div> */}
      </Col>
    </Row>
  </div>
)

const DiscussionList = ({ onClickCreate, onClickJoin, onSelect }) => {
  const { state } = useContext(StoreContext);
  const discussions = getDiscussions(state);
  console.log(state)
  console.log(discussions)
  if (discussions.length < 1) {
    return (
      <EmptyDiscussion
        onClickCreate={onClickCreate}
        onClickJoin={onClickJoin}/>
    );
  }

  return (
    <>
      {
        discussions.map((discussion) =>
          <Discussion key={discussion.id} discussion={discussion} onClick={onSelect} />
        )
      }
    </>
  );
}

export default DiscussionList