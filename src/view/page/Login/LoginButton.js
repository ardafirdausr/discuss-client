import { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { message } from 'antd';

import discussAPI from '../../../adapter/discussAPI';
import { clientId } from '../../../config/oauth';

import { StoreContext } from '../../../store';
import * as userAction from '../../../store/user/action';

const LoginButton = () => {
  const { dispatch } = useContext(StoreContext);

  const loginUser = (user) => {
    const loginAction = userAction.login(user)
    dispatch(loginAction)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const successHandler = async function (response) {
		let { profileObj: profile, tokenObj: token } = response;
		let googleAuth = {
			name: profile.name,
			email: profile.email,
			imageUrl: profile.imageUrl,
			tokenId: token.id_token
		}

    try {
			let response = await discussAPI.post('/auth/login', {
				"token_id": googleAuth.tokenId
			});
			let { data, token } = response.data;
      const user = {
        token,
        id: data.id,
        name: data.name,
        email: data.email,
        imageUrl: data.image_url,
      }
      loginUser(user)
		} catch(err) {
			message.warn("Login failed")
			console.log(err)
		}
	}

	const failedHandler = function (resp) {
    message.error("Whoops. Something went wrong")
	}

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={successHandler}
      onFailure={failedHandler}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default LoginButton;