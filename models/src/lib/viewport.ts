import { Limiter } from './limiter';
import { MediaType } from './mediaType';
import { ValueUnit } from './valueunit';

export interface Viewport {
  mediaType: MediaType;

  limiter: Limiter;

  from: ValueUnit;
  to: ValueUnit;
}
