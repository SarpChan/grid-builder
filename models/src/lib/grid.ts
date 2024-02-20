import { Column } from './column';
import { Item } from './item';
import { Row } from './row';
import { ValueUnit } from './valueunit';
import { Viewport } from './viewport';

export interface Grid {
  id: string; // Primary ID
  name: string;

  rows: Row[];
  columns: Column[];
  items: Item[];
  vGap: ValueUnit | undefined;
  hGap: ValueUnit | undefined;
  viewport: Viewport;

  shouldUseWidth: boolean;
  width: ValueUnit | undefined;

  shouldUseHeight: boolean;
  height: ValueUnit | undefined;
}

export type AddGrid = Omit<Grid, 'id'>;
