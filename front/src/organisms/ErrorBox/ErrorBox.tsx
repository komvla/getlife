import React from 'react';
import styles from './ErrorBox.module.scss';
import { MdOutlineErrorOutline } from 'react-icons/md';

interface ErrorBoxProps {
  text?: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <MdOutlineErrorOutline color="#198754" />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default ErrorBox;
