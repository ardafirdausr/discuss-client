import {
  Layout,
  Row,
  Col,
  Avatar,
  Typography
} from 'antd';
import style from './DiscussionChat.module.scss';

const { Content } = Layout;
const { Text } = Typography;

const DiscussionChat = () => {
  const chats = [
    {
      type: 'event',
      content: 'create a discussion',
      sender: {
        id: 1,
        name: 'Arda',
        imageUrl: null,
      }
    },
    {
      type: 'text',
      content: 'hello Gan',
      sender: {
        id: 1,
        name: 'Arda',
        imageUrl: null,
      }
    }
  ]
  return (
    <Content className={style.container}>
      <Row
        justify="space-around"
        align="bottom">
        <Col span={2}>
          <Avatar>U</Avatar>
        </Col>
        <Col span={14} className={style.message}>
          <div className={style.sender}>Arda Firdaus Ramadhan</div>
          <div className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel rerum magnam possimus corrupti architecto accusamus officiis facere aliquam id ipsum, expedita consequuntur distinctio officia hic veritatis aperiam qui quidem harum sint dolor. Modi sequi itaque rerum assumenda asperiores praesentium, a saepe. Quasi esse saepe odit, dolore neque enim veritatis! Suscipit, nihil. Et dignissimos, consequatur odio repudiandae illo quis eum ullam commodi dicta, amet, porro natus! Veritatis exercitationem facere quam minus illum, animi vel sapiente nesciunt, esse nam dignissimos placeat nostrum aliquam alias eum maiores dicta beatae commodi blanditiis perferendis ratione quaerat reiciendis! Deleniti quos, dolor reiciendis eaque id cupiditate beatae. asdas da das das dasd </div>
          <div className={style.time}>14/07/2021 16:00</div>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row
        justify="space-around"
        align="bottom">
        <Col span={2}>
          <Avatar>U</Avatar>
        </Col>
        <Col span={14} className={style.message}>
          <div className={style.sender}>Arda Firdaus Ramadhan</div>
          <div className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel rerum magnam possimus corrupti architecto accusamus officiis facere aliquam id ipsum, expedita consequuntur distinctio officia hic veritatis aperiam qui quidem harum sint dolor. Modi sequi itaque rerum assumenda asperiores praesentium, a saepe. Quasi esse saepe odit, dolore neque enim veritatis! Suscipit, nihil. Et dignissimos, consequatur odio repudiandae illo quis eum ullam commodi dicta, amet, porro natus! Veritatis exercitationem facere quam minus illum, animi vel sapiente nesciunt, esse nam dignissimos placeat nostrum aliquam alias eum maiores dicta beatae commodi blanditiis perferendis ratione quaerat reiciendis! Deleniti quos, dolor reiciendis eaque id cupiditate beatae. asdas da das das dasd </div>
          <div className={style.time}>14/07/2021 16:00</div>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row
        justify="space-around"
        align="bottom">
        <Col span={2}>
          <Avatar>U</Avatar>
        </Col>
        <Col span={14} className={style.message}>
          <div className={style.sender}>Arda Firdaus Ramadhan</div>
          <div className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel rerum magnam possimus corrupti architecto accusamus officiis facere aliquam id ipsum, expedita consequuntur distinctio officia hic veritatis aperiam qui quidem harum sint dolor. Modi sequi itaque rerum assumenda asperiores praesentium, a saepe. Quasi esse saepe odit, dolore neque enim veritatis! Suscipit, nihil. Et dignissimos, consequatur odio repudiandae illo quis eum ullam commodi dicta, amet, porro natus! Veritatis exercitationem facere quam minus illum, animi vel sapiente nesciunt, esse nam dignissimos placeat nostrum aliquam alias eum maiores dicta beatae commodi blanditiis perferendis ratione quaerat reiciendis! Deleniti quos, dolor reiciendis eaque id cupiditate beatae. asdas da das das dasd </div>
          <div className={style.time}>14/07/2021 16:00</div>
        </Col>
        <Col span={8}></Col>
      </Row>
    </Content>
  );
}

export default DiscussionChat;