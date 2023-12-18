import { Dimension } from './dimension';
import { Element } from './element';
import { Unit } from './unit';

export interface Grid {
  id: string;

  name: string;
  mediaQuery: string;

  width: number;
  widthUnit: Unit;

  height: number;
  heightUnit: Unit;

  cols: Dimension[];
  rows: Dimension[];
}
