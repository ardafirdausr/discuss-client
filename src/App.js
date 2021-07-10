import { Typography } from 'antd';

import style from './App.module.scss'

const { Title } = Typography

function App() {
  return (
    <Title className={style.container}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo asperiores magnam, vel beatae qui nulla magni in sit vitae repellendus.
    </Title>
  );
}

export default App;
