import { Limiter } from './limiter';
import { ValueUnit } from './valueunit';

export interface Viewport {
  limiter: Limiter;

  from: ValueUnit | undefined;
  to: ValueUnit | undefined;
}
