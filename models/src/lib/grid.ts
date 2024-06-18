import { AreaInstance } from './area-instance';
import { Column } from './column';
import { Row } from './row';
import { ValueUnit } from './valueunit';
import { Viewport } from './viewport';

export interface Grid {
  id: string; // Primary ID
  name: string;

  rows: Row[];
  columns: Column[];
  items: AreaInstance[];
  vGap: ValueUnit | undefined;
  hGap: ValueUnit | undefined;
  viewport: Viewport;

  shouldUseWidth: boolean;
  width: ValueUnit | undefined;

  shouldUseHeight: boolean;
  height: ValueUnit | undefined;

  autoFlow: 'row' | 'column' | 'row dense' | 'column dense';
}

export type AddGrid = Omit<Grid, 'id'>;
