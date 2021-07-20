import { Row, Col } from "antd";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import style from './index.module.scss';

const NotFound = () => (
	<Row
    justify="center"
    align="middle"
    className={style.container}>
		<Col
      xs={{span: 20}}
      md={{span: 10}}
      className={style.errorInfo}>
			<img
				src="/assets/images/vector/notfound.svg"
				alt="Not Found"
        className={style.image} />
			<h1>404</h1>
			<h2>Page Not Found</h2>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} className={style.icon} /> Back to home
      </Link>
		</Col>
	</Row>
);

export default NotFound;