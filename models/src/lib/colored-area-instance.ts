import { AreaInstance } from './area-instance';

export interface ColoredAreaInstance extends Omit<AreaInstance, 'areaId'> {
  color: string;
}
