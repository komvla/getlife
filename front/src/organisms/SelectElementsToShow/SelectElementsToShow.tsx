import React from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import styles from './SelectElementsToShow.module.scss';
import { SelectElementsToShowProps } from '../../models/select.model';

const SelectElementsToShow: React.FC<SelectElementsToShowProps> = ({
  value,
  maxValue,
  minValue = 1,
  onChange,
}) => {
  const handleAllButtonClick = () => {
    onChange(maxValue);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value !== '' ? parseInt(e.target.value, 10) : 0;

    const validValue = Math.min(Math.max(newValue, minValue), maxValue);

    onChange(validValue);
  };

  return (
    <FormGroup>
      <div className={styles.divWrapper}>
        <span>Results to show:</span>
        <Input
          className={styles.input}
          type="number"
          name="elementsToShow"
          id="elementsToShow"
          value={value}
          maxValue={maxValue + 1}
          minValue={1}
          onChange={handleSelectChange}
        ></Input>
        <Button
          className={styles.button}
          color="transparent"
          onClick={handleAllButtonClick}
        >
          All
        </Button>
      </div>
    </FormGroup>
  );
};

export default SelectElementsToShow;
