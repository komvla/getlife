import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../atoms/graphic/Logo/Logo';
import { Container, Row, Col } from 'reactstrap';
import HeaderButtonsGroup from '../../molecules/menus/HeaderMenu/HeaderButtonsGroup/HeaderButtonsGroup';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Row>
          <Col lg={3}>
            <Logo />
          </Col>
          <Col lg={9}>
            <HeaderButtonsGroup />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
