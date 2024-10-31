import React from 'react';
import styles from './App.module.scss';
import List from './ui/components/list';
import {Flex} from 'antd';

const App = () => {
  return (
    <Flex className={styles.app} gap="large" vertical>
      <List type="students" />
      <List type="workers" />
    </Flex>
  );
};

export default App;
