import { Row, Col } from "antd";

import LoginButton from './LoginButton';

import style from './index.module.scss';

const Login = () => (
  <div className={style.container}>
    <Row
      justify="center"
      align="middle"
      gutter={{ xs: 8, sm: 16, md: 24}}
      className={style.wrapper}>
      <Col xs={{offset: 2, span: 20}} md={{offset: 0, span: 10}}>
        <img
          draggable={false}
          src="/assets/images/vector/chat.svg"
          alt="Chat"
          className={style.image}/>
      </Col>
      <Col xs={{offset: 2, span: 20}} md={{offset: 0, span: 8}}>
        <h1 className={style.title}>Discuss</h1>
        <h2>Make discussion with your friends easier</h2>
        <LoginButton />
      </Col>
    </Row>
  </div>
)

export default Login;