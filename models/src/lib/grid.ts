import { AreaInstance } from './area-instance';
import { Column } from './column';
import { Row } from './row';
import { ValueUnit } from './valueunit';
import { Viewport } from './viewport';
import { AutoFlowOptions } from './auto-flow-options';
import { AlignmentItemsOptions } from './alignment-items';
import { AlignmentContentOptions } from './alignment-content';

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

  autoFlow: AutoFlowOptions;

  alignItems: AlignmentItemsOptions;
  justifyItems: AlignmentItemsOptions;
  alignContent: AlignmentContentOptions;
  justifyContent: AlignmentContentOptions;
}

export type AddGrid = Omit<Grid, 'id'>;
