import React from 'react';
import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <h1 className={styles.logo}>
      Get<span>life</span>
    </h1>
  );
};

export default Logo;
