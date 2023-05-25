import React from 'react';
import styles from './HeaderButtonsGroup.module.scss';
import { Row, Col } from 'reactstrap';
import HeaderTransparentButton from '../../../../atoms/buttons/HeaderTransparentButton/HeaderTransparentButton';
//icons
import { RiStackFill, RiUser3Fill, RiImageFill } from 'react-icons/ri';

const HeaderButtonsGroup: React.FC = () => {
  return (
    <Row className={styles.wrapper}>
      <Col className={styles.col}>
        <HeaderTransparentButton text="Users" url="/">
          <RiUser3Fill />
        </HeaderTransparentButton>
      </Col>
      <Col className={styles.col}>
        <HeaderTransparentButton text="Posts" url="/posts">
          <RiImageFill />
        </HeaderTransparentButton>
      </Col>
      <Col className={styles.col}>
        <HeaderTransparentButton text="Albums" url="/albums">
          <RiStackFill />
        </HeaderTransparentButton>
      </Col>
    </Row>
  );
};

export default HeaderButtonsGroup;
