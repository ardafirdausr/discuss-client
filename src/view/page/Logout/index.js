import { useContext, useEffect } from "react";
import { useGoogleLogout } from 'react-google-login';
import { Row, Col, Spin } from 'antd';

import { StoreContext } from '../../../store';
import { logout } from '../../../store/user/action';
import { clientId } from '../../../config/oauth';

import style from './index.module.scss'

const Logout = () => {
  const { dispatch } = useContext(StoreContext);

	let logoutHandler = () => {
		const logoutAction = logout()
    dispatch(logoutAction)
    localStorage.removeItem("user");
	}

  let { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess: logoutHandler,
		onFailure: logoutHandler,
	});

  useEffect(signOut)

	return (
    <div className={style.container}>
      <Row
        justify="center"
        align="middle"
        className={style.wrapper}>
        <Col >
          <Spin size="large" />
          <h3>Logging Out.... </h3>
        </Col>
      </Row>
    </div>
	)
}

export default Logout;
