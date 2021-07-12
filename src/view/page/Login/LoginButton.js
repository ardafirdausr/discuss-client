import { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { message } from 'antd';

import discussApi from '../../../adapter/discussApi';
import { clientId } from '../../../config/oauth';

import { StoreContext } from '../../../store';
import { login } from '../../../store/user/actions';

const LoginButton = () => {
  const { dispatch } = useContext(StoreContext)

  const loginUser = (token, user) => {
    const loginAction = login(token, user.email, user.name, user.imageUrl)
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
			let response = await discussApi.post('/auth/login', {
				"token_id": googleAuth.tokenId
			});
			let { data, token } = response.data;
      const user = {
        name: data.name,
        email: data.email,
        imageUrl: data.image_url,
      }
      loginUser(token, user)
		} catch(err) {
			message.warn("Login failed")
			console.log(err)
		}
	}

	const failedHandler = function (resp) {
    message.error("Whoops. Something went wrong")
		console.log(resp)
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