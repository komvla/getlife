import React, { ReactNode } from 'react';
// components
import { Container } from 'reactstrap';
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import LoaderBox from '../../organisms/LoaderBox/LoaderBox';
import ErrorBox from '../../organisms/ErrorBox/ErrorBox';
// styles
import styles from './BasicLayout.module.scss';

interface BasicLayoutProps {
  children: ReactNode;
  isLoading?: boolean;
  error?: string;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  isLoading,
  error,
}) => {
  return (
    <>
      <Header />
      <Container className={styles.childrenWrapper}>
        {!error && !isLoading && children}
        {isLoading && <LoaderBox />}
        {error && <ErrorBox text={error} />}
      </Container>
      <Footer />
    </>
  );
};

export default BasicLayout;
