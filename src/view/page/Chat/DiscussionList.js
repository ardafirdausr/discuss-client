import { useContext, useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';
import humps from 'humps';

import { StoreContext } from "../../../store";
import { getDiscussions } from "../../../store/discussion/selector";
import { populateDiscussion } from "../../../store/discussion/action";
import discussAPI from '../../../adapter/discussAPI';

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
        dummyData.map(dummy => (
          <Skeleton active avatar key={dummy} paragraph={{ rows: 1, size: 'small' }} />
        ))
      }
    </div>
  )
}

const DiscussionList = ({ onClickCreate, onClickJoin }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(StoreContext);

  const discussions = getDiscussions(state);

  const [ fetching, setFetching ] = useState(false)
  useEffect(() => {
    const fecthUserDiscussion = async () => {
      try {
        setFetching(true);
        const { data: payload } = await discussAPI.get('/discussions');
        const { data: discussionsData } = payload;
        const discussions = humps.camelizeKeys(discussionsData);
        dispatch(populateDiscussion(discussions));
      } catch(err) {
        console.log(err)
      } finally {
        setFetching(false);
      }
    }
    fecthUserDiscussion();
  }, [dispatch])


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

  const LastMessage = ({ discussion }) => {
    let message = discussion?.meta?.lastMessage || "";
    let sender = discussion?.meta?.lastMessageSender || '';
    let fSender = sender.split(' ')
    if (fSender.length > 1) {
      fSender = fSender[0];
    } else {
      fSender = sender;
    }

    return (
      <Text ellipsis className={style.secondary}><b>{fSender ? `${fSender}: ` : ''} </b>{message}</Text>
    )
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
            onClick={() => history.push(`/chat/${discussion.code}`)}>
            <List.Item.Meta
              className={style.discussionListMeta}
              avatar={
                discussion.imageUrl
                  ? <Avatar src={discussion.imageUrl} size={40} />
                  : <Avatar size={40}>{discussion.name.charAt(0)}</Avatar>
              }
              title={<Text ellipsis className={style.main}>{discussion.name}</Text>}
              description={<LastMessage discussion={discussion} /> }
            />
            <Badge count={0} style={{backgroundColor: '#52c41a'}} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default DiscussionList