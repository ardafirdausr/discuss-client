import { Row, Col } from "antd";
import { GoogleLogin } from 'react-google-login';

import { clientId } from '../../../config/oauth';

import style from './index.module.scss';

const Login = () => {
  const successHandler = async function (response) {
		let { profileObj: profile, tokenObj: token } = response;
		let googleAuth = {
			name: profile.name,
			email: profile.email,
			imageUrl: profile.imageUrl,
			tokenId: token.id_token
		}
    console.log(googleAuth);
	}

	const failedHandler = function (resp) {
		console.log(resp)
	}

  return (
    <Row
      justify="center"
      align="middle"
      className={style.container}>
      <Col xs={{span: 24}} md={{span: 10}}>
        <img src="/assets/images/vector/chat.svg" alt="Chat" className={style.image}/>
      </Col>
      <Col xs={{span: 24}} md={{span: 8}}>
        <h1 className={style.title}>Discuss</h1>
        <h2>Make discussion with your friends easier</h2>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={successHandler}
          onFailure={failedHandler}
          cookiePolicy={'single_host_origin'}
        />,
      </Col>
    </Row>
  )
}

export default Login;