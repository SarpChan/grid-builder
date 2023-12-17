import { Unit } from './unit';

export interface Grid {
  id: string;

  name: string;
  mediaQuery: string;

  width: number;
  widthUnit: Unit;

  height: number;
  heightUnit: Unit;

  elements: string[];
}
