import { ValueUnit } from './valueunit';

export interface Row {
  id: string;
  height: ValueUnit;
  useMinMax: boolean;
  max: ValueUnit;
}
