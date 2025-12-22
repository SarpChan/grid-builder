import { ValueUnit } from './valueunit';

export interface Column {
  id: string;
  width: ValueUnit;
  useMinMax: boolean;
  max: ValueUnit;
}
