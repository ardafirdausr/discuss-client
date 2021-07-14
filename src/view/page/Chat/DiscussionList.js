import { useContext, useState } from 'react';
import {
  Avatar,
  Empty,
  Button,
  Space,
  Typography,
  List,
  Badge,
  Skeleton
} from 'antd';

import { StoreContext } from "../../../store";
import { getDiscussions } from "../../../store/discussion/selector";

import style from './DiscussionList.module.scss'

const { Text } = Typography;

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

const DiscussionSkeleton = () => {
  const dummyData = [1, 2, 3, 4, 5, 7, 8, 9, 10];
  return (
    <div className={style.discussionSkeletonContainer}>
      {
        dummyData.map(() => (
          <Skeleton active avatar paragraph={{ rows: 1, size: 'small' }} />
        ))
      }
    </div>
  )
}

const DiscussionList = ({ onClickCreate, onClickJoin, onSelect }) => {
  const { state } = useContext(StoreContext);
  const discussions = getDiscussions(state);
  const [ fetching ] = useState(false)

  if (fetching) {
    return <DiscussionSkeleton />
  }

  if (discussions.length < 1) {
    return (
      <EmptyDiscussion
        onClickCreate={onClickCreate}
        onClickJoin={onClickJoin}/>
    );
  }

  return (
    <div className={style.discussionListContainer}>
      <List
        itemLayout="horizontal"
        dataSource={discussions}
        renderItem={discussion => (
          <List.Item
            key={discussion.id}
            className={style.discussionListWrapper}
            onClick={() => alert(discussion.name)}>
            <List.Item.Meta
              className={style.discussionListMeta}
              avatar={
                discussion.imageUrl
                  ? <Avatar src={discussion.imageUrl} size={40} />
                  : <Avatar size={40}>{discussion.name.charAt(0)}</Avatar>
              }
              title={<Text ellipsis className={style.main}>lorem20asdkasld laksd lkasmdl kasmdlkaksldmakmdlkasldkasm ldkasm ldkasmd laksmd laksmdlak skld</Text>}
              description={<Text ellipsis className={style.secondary}>Ant Design, a design language for background applications, is refined by Ant UED asdasdas asd asd asdTeam</Text>}
            />
            <Badge count={10} style={{backgroundColor: '#52c41a'}} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default DiscussionList