import React, { ReactNode } from 'react';
import { Button } from 'reactstrap';
import styles from './HeaderTransparentButton.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderTransparentButtonProps {
  children: ReactNode;
  text?: string;
  url: string;
  selected?: boolean;
}

const HeaderTransparentButton: React.FC<HeaderTransparentButtonProps> = ({
  children,
  text,
  url,
  selected = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <Button
      className={
        location === url
          ? styles.headerTransparentButtonSelected
          : styles.headerTransparentButton
      }
      color="transparent"
      onClick={() => navigate(url)}
    >
      {children}
      {text && <span>{text}</span>}
    </Button>
  );
};

export default HeaderTransparentButton;
