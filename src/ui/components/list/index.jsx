import React from 'react';
import {Flex} from 'antd';

import useBirthday from './../../../hooks/useBirthday';
import Card from './../card';

import styles from './list.module.scss';

const List = ({type}) => {
  const {students, workers, error} = useBirthday();
  const data = type === 'students' ? students : workers;

  return (
    <Flex className={styles.list} gap="large" vertical>
      {data.length > 0 && (
        <h2>
          День народження {type === 'students' ? 'студентів' : 'співробітників'}
        </h2>
      )}

      {data.map((item) => (
        <Card key={item.id} entry={item} />
      ))}
    </Flex>
  );
};

export default List;
