import { Unit } from './unit';

export interface Dimension {
  value: number;
  unit: Unit;
  complex?: boolean;
}
