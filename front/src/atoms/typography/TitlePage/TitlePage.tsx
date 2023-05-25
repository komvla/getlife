import React from 'react';
import styles from './TitlePage.module.scss';

interface TitlePageProps {
  text: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ text }) => {
  return <h2 className={styles.title}>{text}</h2>;
};

export default TitlePage;
