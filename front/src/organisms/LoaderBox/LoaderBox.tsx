import React from 'react';
import { Spinner } from 'reactstrap';
import styles from './LoaderBox.module.scss';

interface LoaderBoxProps {
  text?: string;
}

const LoaderBox: React.FC<LoaderBoxProps> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <Spinner color="success" />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default LoaderBox;
