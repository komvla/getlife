export interface SelectElementsToShowProps {
  value: number;
  maxValue: number;
  minValue?: number;
  onChange: (value: number) => void;
}
